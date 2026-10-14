import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value || cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: string;
      role: string;
      name?: string;
    };

    return NextResponse.json({
      user: {
        name: decoded.name || "Sumit Thakur",
        role: decoded.role,
      }
    }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}