import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import Coupon from '@/models/Coupon';

export async function POST(req: Request) {
  try {
    const { code } = await req.json();
    await connectToDatabase();
    
    const coupon = await Coupon.findOne({ code: code.toUpperCase(), isActive: true });
    
    if (!coupon) {
      return NextResponse.json({ valid: false, message: "Invalid or expired coupon" });
    }

    return NextResponse.json({ 
      valid: true, 
      discountPercent: coupon.discountPercent,
      code: coupon.code
    });
  } catch (error) {
    return NextResponse.json({ valid: false, error: "Verification failed" });
  }
}