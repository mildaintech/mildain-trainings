import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import Inquiry from '@/models/Inquiry';
import { verifyLeadRequest } from '@/lib/leadGuard';
import { pushLeadToZoho } from '@/lib/zohoLead';
import { sendLeadEmails } from '@/lib/leadMailer';

export async function GET() {
  try {
    await connectToDatabase();
    const inquiries = await Inquiry.find().sort({ createdAt: -1 });
    return NextResponse.json(inquiries, { status: 200 });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch inquiries' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const guard = await verifyLeadRequest(req, body);
    if (!guard.ok) {
      if (guard.silentBlock) {
        return NextResponse.json({ success: true }, { status: 200 });
      }
      return NextResponse.json(
        { success: false, message: guard.message || 'Invalid request' },
        { status: guard.status || 400 }
      );
    }

    await connectToDatabase();

    const newInquiry = await Inquiry.create({
      fullName: body.fullName,
      email: body.email,
      phone: body.phone,
      country: body.country,
      message: body.message,
    });

    await Promise.allSettled([
      pushLeadToZoho({
        fullName: body.fullName,
        email: body.email,
        phone: body.phone,
        country: body.country,
        message: body.message,
        inquiryType: body.inquiryType || 'Course Inquiry',
        source: body.source || 'Website',
      }),
      sendLeadEmails({
        fullName: body.fullName,
        email: body.email,
        phone: body.phone,
        country: body.country,
        inquiryType: body.inquiryType || 'Course Inquiry',
        source: body.source || 'Website',
        message: body.message,
        ip: guard.ip,
      }),
    ]);

    return NextResponse.json(
      { success: true, data: newInquiry },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { success: false, message: 'Failed to save inquiry to database' },
      { status: 500 }
    );
  }
}