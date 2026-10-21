import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import CorporateInquiry from "@/models/CorporateInquiry";

export async function GET() {
  try {
    await connectToDatabase();
    const inquiries = await CorporateInquiry.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: inquiries }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Server Error" }, { status: 500 });
  }
}