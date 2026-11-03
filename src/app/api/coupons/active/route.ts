import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import Coupon from '@/models/Coupon';

export async function GET() {
  try {
    await connectToDatabase();
    const activeCoupon = await Coupon.findOne({ isActive: true });
    return NextResponse.json(activeCoupon || { error: "No active offer" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch coupon" }, { status: 500 });
  }
}