import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import CorporateInquiry from "@/models/CorporateInquiry";

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const body = await req.json();
    const newInquiry = await CorporateInquiry.create(body);
    return NextResponse.json({ success: true, data: newInquiry }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Server Error" }, { status: 500 });
  }
}