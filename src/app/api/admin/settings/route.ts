import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import Setting from "@/models/Setting";

export async function GET() {
  try {
    await connectToDatabase();
    let settings = await Setting.findOne();
    
    if (!settings) {
      settings = await Setting.create({ exchangeRate: 90 });
    }
    
    return NextResponse.json(settings, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    await connectToDatabase();
    const body = await request.json();
    
    const updatedSettings = await Setting.findOneAndUpdate(
      {}, 
      { exchangeRate: Number(body.exchangeRate) }, 
      { new: true, upsert: true }
    );
    
    return NextResponse.json(updatedSettings, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}