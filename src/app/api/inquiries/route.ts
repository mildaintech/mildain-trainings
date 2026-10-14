import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import Inquiry from "@/models/Inquiry";

export async function GET() {
  try {
    await connectToDatabase();
    
    const inquiries = await Inquiry.find().sort({ createdAt: -1 });

    return NextResponse.json(inquiries, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch inquiries" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    await connectToDatabase();
    
    const newInquiry = await Inquiry.create({
      fullName: body.fullName,
      email: body.email,
      phone: body.phone,
      country: body.country,
      message: body.message,
    });

    return NextResponse.json(
      { success: true, data: newInquiry },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to save inquiry to database" },
      { status: 500 }
    );
  }
}