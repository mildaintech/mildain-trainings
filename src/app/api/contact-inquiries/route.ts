import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import ContactInquiry from '@/models/ContactInquiry';
import { verifyLeadRequest } from '@/lib/leadGuard';
import { pushLeadToZoho } from '@/lib/zohoLead';
import { sendLeadEmails } from '@/lib/leadMailer';

export async function GET() {
  try {
    await connectToDatabase();
    const inquiries = await ContactInquiry.find().sort({ createdAt: -1 }).lean();
    return NextResponse.json(inquiries, { status: 200 });
  } catch {
    return NextResponse.json(
      { success: false, message: 'Failed to fetch contact inquiries' },
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

    const newInquiry = await ContactInquiry.create({
      fullName: body.fullName,
      email: body.email,
      phone: body.phone,
      country: body.country,
      subject: body.subject,
      message: body.message,
      inquiryType: body.inquiryType || body.subject,
      source: body.source || 'Contact Us Page',
    });

    await Promise.allSettled([
      pushLeadToZoho({
        fullName: body.fullName,
        email: body.email,
        phone: body.phone,
        country: body.country,
        message: body.message,
        inquiryType: body.subject || body.inquiryType || 'Contact Inquiry',
        source: body.source || 'Contact Us Page',
      }),
      sendLeadEmails({
        fullName: body.fullName,
        email: body.email,
        phone: body.phone,
        country: body.country,
        subject: body.subject,
        inquiryType: body.inquiryType || body.subject,
        source: body.source || 'Contact Us Page',
        message: body.message,
        ip: guard.ip,
      }),
    ]);

    return NextResponse.json({ success: true, data: newInquiry }, { status: 201 });
  } catch {
    return NextResponse.json({ success: false, message: 'Server Error' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, message: 'Inquiry ID is required' },
        { status: 400 }
      );
    }

    await connectToDatabase();
    await ContactInquiry.findByIdAndDelete(id);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch {
    return NextResponse.json(
      { success: false, message: 'Failed to delete inquiry' },
      { status: 500 }
    );
  }
}