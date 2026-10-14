import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import Course from "@/models/Course";

export async function GET() {
  try {
    await connectToDatabase();
    const courses = await Course.find({}).sort({ createdAt: -1 });
    return NextResponse.json(courses, { status: 200 });
  } catch (error) {
    console.error("DB Connection Error: ", error);
    return NextResponse.json({ error: "Failed to fetch courses" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const body = await request.json();
    const newCourse = await Course.create(body);
    return NextResponse.json(newCourse, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
