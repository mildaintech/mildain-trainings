import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import Course from "@/models/Course";
import { sendCoursePurchaseEmail, sendAdminPurchaseAlert } from "@/lib/mailer";

export async function POST(req: Request) {
  try {
    const bodyText = await req.text();
    const headers = req.headers;
    
    const transmissionId = headers.get("paypal-transmission-id");
    const transmissionTime = headers.get("paypal-transmission-time");
    const certUrl = headers.get("paypal-cert-url");
    const authAlgo = headers.get("paypal-auth-algo");
    const transmissionSig = headers.get("paypal-transmission-sig");

    if (!transmissionId || !transmissionTime || !certUrl || !authAlgo || !transmissionSig) {
      return NextResponse.json({ error: "Missing headers" }, { status: 400 });
    }
    
    const data = JSON.parse(bodyText);

    if (data.event_type === "PAYMENT.CAPTURE.COMPLETED") {
      const resource = data.resource;
      const customId = resource.custom_id; 

      await connectToDatabase();

      if (customId && customId.includes("___")) {
        const [email, courseId] = customId.split("___");
        const payerName = resource?.payer?.name?.given_name || "Student";
        
        const course = await Course.findById(courseId);

        if (course && email) {
          const amountString = `${resource.amount.value} ${resource.amount.currency_code}`;
          
          await sendCoursePurchaseEmail(
            email,
            payerName,
            course.title,
            resource.id,
            amountString
          );

          await sendAdminPurchaseAlert(
            payerName,
            email,
            course.title,
            resource.id,
            amountString
          );
        }
      }
    }

    return NextResponse.json({ received: true }, { status: 200 });

  } catch (error: any) {
    return NextResponse.json({ error: "Webhook Error" }, { status: 500 });
  }
}