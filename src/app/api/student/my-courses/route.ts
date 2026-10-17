import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { connectToDatabase } from "@/lib/db";
import User from "@/models/User";
import Course from "@/models/Course";

export async function GET() {
  try {
    await connectToDatabase();
    
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as any;
    const userId = decoded.id || decoded._id;

    const user = await User.findById(userId).populate({
      path: 'purchasedCourses',
      model: Course,
      select: 'title slug bannerImage overviewImage duration provider category'
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ courses: user.purchasedCourses || [] });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}