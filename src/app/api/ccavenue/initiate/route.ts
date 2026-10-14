// import { NextResponse } from "next/server";
// import { encrypt } from "@/lib/ccavenue";

// export async function POST(req: Request) {
//   try {
//     const body = await req.json();
//     const { amount, studentName, email, contactNumber } = body;

//     const merchant_id = process.env.CCAVENUE_MERCHANT_ID || "TEST_MERCHANT_ID";
//     const working_key = process.env.CCAVENUE_WORKING_KEY || "TEST_WORKING_KEY";
//     const access_code = process.env.CCAVENUE_ACCESS_CODE || "TEST_ACCESS_CODE";
    
//     const order_id = `ORD_${Date.now()}`;
    
//     const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:9002";
//     const redirect_url = `${baseUrl}/api/ccavenue/callback`;
//     const cancel_url = `${baseUrl}/api/ccavenue/callback`;

//     const paymentData = `merchant_id=${merchant_id}&order_id=${order_id}&currency=INR&amount=${amount}&redirect_url=${redirect_url}&cancel_url=${cancel_url}&billing_name=${studentName}&billing_email=${email}&billing_tel=${contactNumber}&language=EN`;

//     const encrypted_data = encrypt(paymentData, working_key);

//     const htmlForm = `
//       <html>
//         <head>
//           <title>Redirecting to Payment...</title>
//         </head>
//         <body onload="document.getElementById('ccavenueForm').submit();" style="display: flex; justify-content: center; align-items: center; height: 100vh; font-family: Arial, sans-serif; background-color: #f8fafc;">
//           <div style="text-align: center;">
//             <h2 style="color: #334155;">Please wait...</h2>
//             <p style="color: #64748b;">Redirecting to secure payment gateway.</p>
//           </div>
//           <form id="ccavenueForm" method="post" action="https://test.ccavenue.com/transaction/transaction.do?command=initiateTransaction">
//             <input type="hidden" name="encRequest" value="${encrypted_data}">
//             <input type="hidden" name="access_code" value="${access_code}">
//           </form>
//         </body>
//       </html>
//     `;

//     return new NextResponse(htmlForm, {
//       headers: { "Content-Type": "text/html" },
//     });

//   } catch (error) {
//     return NextResponse.json({ error: "Failed to initiate payment" }, { status: 500 });
//   }
// }

import { NextResponse } from "next/server";
import { encrypt } from "@/lib/ccavenue";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { amount, studentName, email, contactNumber } = body;

    const merchant_id = process.env.CCAVENUE_MERCHANT_ID;
    const working_key = process.env.CCAVENUE_WORKING_KEY;
    const access_code = process.env.CCAVENUE_ACCESS_CODE;
    
    const order_id = `ORD_${Date.now()}`;
    
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:9002";
    const redirect_url = `${baseUrl}/api/ccavenue/callback`;
    const cancel_url = `${baseUrl}/api/ccavenue/callback`;
    const ccavenue_url = "https://test.ccavenue.com/transaction/transaction.do?command=initiateTransaction";

    const paymentData = `merchant_id=${merchant_id}&order_id=${order_id}&currency=INR&amount=${amount}&redirect_url=${redirect_url}&cancel_url=${cancel_url}&billing_name=${studentName}&billing_email=${email}&billing_tel=${contactNumber}&language=EN`;

    const encrypted_data = encrypt(paymentData, working_key as string);

    const htmlForm = `
      <html>
        <head>
          <title>Redirecting to CCAvenue...</title>
        </head>
        <body onload="document.getElementById('ccavenueForm').submit();" style="display: flex; justify-content: center; align-items: center; height: 100vh; font-family: Arial, sans-serif; background-color: #f8fafc;">
          <div style="text-align: center;">
            <h2 style="color: #334155;">Please wait...</h2>
            <p style="color: #64748b;">Redirecting to CCAvenue Secure Payment Gateway.</p>
          </div>
          <form id="ccavenueForm" method="post" action="${ccavenue_url}">
            <input type="hidden" name="encRequest" value="${encrypted_data}">
            <input type="hidden" name="access_code" value="${access_code}">
          </form>
        </body>
      </html>
    `;

    return new NextResponse(htmlForm, {
      headers: { "Content-Type": "text/html" },
    });

  } catch (error) {
    return NextResponse.json({ error: "Failed to initiate payment" }, { status: 500 });
  }
}