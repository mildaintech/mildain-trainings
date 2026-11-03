import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import Coupon from '@/models/Coupon';

export async function GET() {
  try {
    await connectToDatabase();
    const coupons = await Coupon.find().sort({ createdAt: -1 });
    return NextResponse.json(coupons);
  } catch (error) {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    await connectToDatabase();

    const newCoupon = await Coupon.create({
      code: body.code.toUpperCase(),
      discountPercent: body.discountPercent,
      bannerTitle: body.bannerTitle,
      bannerSubtext: body.bannerSubtext,
      themeType: body.themeType || 'default',
      isActive: false
    });

    return NextResponse.json({ success: true, coupon: newCoupon });
  } catch (error) {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const { id, isActive } = await req.json();
    await connectToDatabase();
    
    if (isActive) {
      await Coupon.updateMany({}, { isActive: false });
    }
    
    await Coupon.findByIdAndUpdate(id, { isActive });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();
    await connectToDatabase();
    await Coupon.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}