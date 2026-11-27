import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import CorporateInquiry from '@/models/CorporateInquiry';
import { verifyLeadRequest } from '@/lib/leadGuard';
import { pushLeadToZoho } from '@/lib/zohoLead';
import { sendLeadEmails } from '@/lib/leadMailer';

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

    const newInquiry = await CorporateInquiry.create({
      fullName: body.fullName,
      email: body.email,
      phone: body.phone,
      country: body.country,
      message: body.message,
      inquiryType: body.inquiryType || 'Corporate',
      source: body.source || 'Corporate Page',
    });

    await Promise.allSettled([
      pushLeadToZoho({
        fullName: body.fullName,
        email: body.email,
        phone: body.phone,
        country: body.country,
        message: body.message,
        inquiryType: body.inquiryType || 'Corporate',
        source: body.source || 'Corporate Page',
      }),
      sendLeadEmails({
        fullName: body.fullName,
        email: body.email,
        phone: body.phone,
        country: body.country,
        inquiryType: body.inquiryType || 'Corporate',
        source: body.source || 'Corporate Page',
        message: body.message,
        ip: guard.ip,
      }),
    ]);

    return NextResponse.json({ success: true, data: newInquiry }, { status: 201 });
  } catch {
    return NextResponse.json({ success: false, message: 'Server Error' }, { status: 500 });
  }
}