// import { NextResponse } from "next/server";
// import { connectToDatabase } from "@/lib/db";
// import User from "@/models/User";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import { cookies } from "next/headers";

// export async function POST(req: Request) {
//   try {
//     const { email, password } = await req.json();

//     if (!email || !password) {
//       return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
//     }

//     await connectToDatabase();

//     const user = await User.findOne({ email });
//     if (!user) {
//       return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
//     }

//     const isPasswordMatch = await bcrypt.compare(password, user.password);
//     if (!isPasswordMatch) {
//       return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
//     }

//     const userRole = user.role || "student";
//     if (userRole !== "admin") {
//       return NextResponse.json({ error: "We're Working to Serve You Better – Please Try Again Later." }, { status: 403 });
//     }

//     const token = jwt.sign(
//       { userId: user._id, role: userRole, name: user.name || user.firstName },
//       process.env.JWT_SECRET!,
//       { expiresIn: "7d" }
//     );

//     const isHttps = req.headers.get("x-forwarded-proto") === "https" || req.url.startsWith("https://");
//     const cookieStore = await cookies();

//     cookieStore.set("auth_token", token, {
//       httpOnly: true,
//       secure: isHttps,
//       sameSite: "strict",
//       maxAge: 7 * 24 * 60 * 60,
//       path: "/",
//     });

//     cookieStore.set("token", token, {
//       httpOnly: true,
//       secure: isHttps,
//       sameSite: "lax",
//       maxAge: 7 * 24 * 60 * 60,
//       path: "/",
//     });

//     cookieStore.set("role", userRole, {
//       secure: isHttps,
//       sameSite: "lax",
//       maxAge: 7 * 24 * 60 * 60,
//       path: "/",
//     });

//     return NextResponse.json(
//       { message: "Login successful", role: userRole },
//       { status: 200 }
//     );
//   } catch (error) {
//     return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
//   }
// }


import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import {
  verifyLoginRequest,
  recordFailedLogin,
  clearLoginRateLimit,
} from '@/lib/authGuard';
import { sendAdminLoginAlert } from '@/lib/authMailer';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body;

    const guard = await verifyLoginRequest(req, body);
    if (!guard.ok) {
      return NextResponse.json(
        { error: guard.message || 'Security verification failed' },
        { status: guard.status || 400 }
      );
    }

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    await connectToDatabase();

    const user = await User.findOne({ email });
    if (!user) {
      await recordFailedLogin(guard.ip);
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      await recordFailedLogin(guard.ip);
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const userRole = user.role || 'student';
    if (userRole !== 'admin') {
      await recordFailedLogin(guard.ip);
      return NextResponse.json(
        { error: "We're Working to Serve You Better – Please Try Again Later." },
        { status: 403 }
      );
    }

    await clearLoginRateLimit(guard.ip);

    const token = jwt.sign(
      { userId: user._id, role: userRole, name: user.name || user.firstName },
      process.env.JWT_SECRET!,
      { expiresIn: '7d' }
    );

    const isHttps =
      req.headers.get('x-forwarded-proto') === 'https' || req.url.startsWith('https://');
    const cookieStore = await cookies();

    cookieStore.set('auth_token', token, {
      httpOnly: true,
      secure: isHttps,
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60,
      path: '/',
    });

    cookieStore.set('token', token, {
      httpOnly: true,
      secure: isHttps,
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60,
      path: '/',
    });

    cookieStore.set('role', userRole, {
      secure: isHttps,
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60,
      path: '/',
    });

    await Promise.allSettled([
      sendAdminLoginAlert({
        name: user.name || user.firstName || 'Admin',
        email: user.email,
        role: userRole,
        ip: guard.ip,
      }),
    ]);

    return NextResponse.json({ message: 'Login successful', role: userRole }, { status: 200 });
  } catch {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}