import { NextResponse } from 'next/server';
import { generatePayUHash } from '@/lib/payu';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { amount, courseId, email, name, phone } = body;

    const merchantKey = process.env.PAYU_MERCHANT_KEY;
    const merchantSalt = process.env.PAYU_MERCHANT_SALT;
    const payuEnv = process.env.PAYU_ENV || 'test';
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:9002';

    if (!merchantKey || !merchantSalt) {
      return NextResponse.json({ error: 'Missing credentials' }, { status: 500 });
    }

    const txnid = `TXN_${Date.now()}`;
    const surl = `${baseUrl}/api/payu/callback`;
    const furl = `${baseUrl}/api/payu/callback`;
    const productinfo = courseId || 'Course';

    const hashPayload = {
      key: merchantKey,
      txnid,
      amount: String(amount),
      productinfo,
      firstname: name || 'Student',
      email: email || 'student@email.com',
    };

    const hash = generatePayUHash(hashPayload, merchantSalt);
    const actionUrl = payuEnv === 'secure' ? 'https://secure.payu.in/_payment' : 'https://test.payu.in/_payment';

    const htmlForm = `
      <html>
        <head><title>Redirecting to Payment...</title></head>
        <body onload="document.payuForm.submit()">
          <center><h2>Please wait, redirecting to secure payment gateway...</h2></center>
          <form action="${actionUrl}" method="post" name="payuForm">
            <input type="hidden" name="key" value="${merchantKey}" />
            <input type="hidden" name="txnid" value="${txnid}" />
            <input type="hidden" name="productinfo" value="${productinfo}" />
            <input type="hidden" name="amount" value="${amount}" />
            <input type="hidden" name="email" value="${hashPayload.email}" />
            <input type="hidden" name="firstname" value="${hashPayload.firstname}" />
            <input type="hidden" name="phone" value="${phone || ''}" />
            <input type="hidden" name="surl" value="${surl}" />
            <input type="hidden" name="furl" value="${furl}" />
            <input type="hidden" name="hash" value="${hash}" />
          </form>
        </body>
      </html>
    `;

    return new NextResponse(htmlForm, {
      headers: { 'Content-Type': 'text/html' },
    });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}