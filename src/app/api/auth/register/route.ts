import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { sendWelcomeLoginEmail } from "@/lib/mailer";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, password, contactNumber } = body;

    if (!name || name.trim() === "") {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    if (!email || email.trim() === "") {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    if (!contactNumber || contactNumber.trim() === "") {
      return NextResponse.json({ error: "Contact number is required" }, { status: 400 });
    }

    if (!password || password.trim() === "") {
      return NextResponse.json({ error: "Password is required" }, { status: 400 });
    }

    await connectToDatabase();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: "Email is already registered" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      contactNumber,
      role: "student"
    });

    await newUser.save();

    await sendWelcomeLoginEmail(email, name);

    return NextResponse.json(
      { message: "Registration successful" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json({ error: "Failed to register user. Please try again." }, { status: 500 });
  }
}