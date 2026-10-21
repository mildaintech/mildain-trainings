import { NextResponse } from 'next/server';
import { encrypt } from '@/lib/ccavenue';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { amount, courseId, email, name, phone } = body;

    const merchant_id = process.env.CCAVENUE_MERCHANT_ID;
    const access_code = process.env.CCAVENUE_ACCESS_CODE;
    const working_key = process.env.CCAVENUE_WORKING_KEY;
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://mildaintrainings.com';

    if (!merchant_id || !access_code || !working_key) {
      return NextResponse.json({ error: 'CCAvenue credentials missing' }, { status: 500 });
    }

    const order_id = `ORD_${Date.now()}`;
    const redirect_url = `${baseUrl}/api/ccavenue/callback`;
    const cancel_url = `${baseUrl}/api/ccavenue/callback`;

    let merchantData = `merchant_id=${merchant_id}&order_id=${order_id}&currency=INR&amount=${amount}&redirect_url=${redirect_url}&cancel_url=${cancel_url}&language=EN`;
    merchantData += `&merchant_param1=${courseId || ''}&merchant_param2=${email || ''}&merchant_param3=${name || ''}`;

    const encryptedData = encrypt(merchantData, working_key);

    const htmlForm = `
      <html>
        <head><title>Redirecting to Payment...</title></head>
        <body>
          <center><h2>Please wait, redirecting to secure payment gateway...</h2></center>
          <form id="nonseamless" method="post" name="redirect" action="https://secure.ccavenue.com/transaction/transaction.do?command=initiateTransaction">
            <input type="hidden" id="encRequest" name="encRequest" value="${encryptedData}">
            <input type="hidden" name="access_code" id="access_code" value="${access_code}">
          </form>
          <script language="javascript">document.redirect.submit();</script>
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