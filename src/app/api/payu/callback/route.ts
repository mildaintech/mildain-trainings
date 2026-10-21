import { NextResponse } from 'next/server';
import { verifyPayUHash } from '@/lib/payu';
import { connectToDatabase } from '@/lib/db';
import User from '@/models/User';
import Course from '@/models/Course';
import { sendCoursePurchaseEmail, sendAdminPurchaseAlert } from '@/lib/mailer';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const dataObj: Record<string, string> = {};

    formData.forEach((value, key) => {
      dataObj[key] = value.toString();
    });

    console.log("PayU Callback Data:", dataObj);

    const merchantSalt = process.env.PAYU_MERCHANT_SALT;

    if (!merchantSalt) {
      console.error("Missing PAYU_MERCHANT_SALT");
      return NextResponse.redirect(new URL('/payment-failure?reason=missing_salt', req.url));
    }

    const isValidHash = verifyPayUHash(dataObj, merchantSalt);
    const orderStatus = dataObj['status'];
    const courseId = dataObj['productinfo'];
    const email = dataObj['email'];
    const name = dataObj['firstname'];
    const amount = dataObj['amount'];
    const transactionId = dataObj['txnid'];

    if (orderStatus === 'success') {
      try {
        await connectToDatabase();
        const course = await Course.findById(courseId);
        const courseSlug = course ? course.slug : '';

        if (email && courseId) {
          let user = await User.findOne({ email });

          if (!user) {
            user = await User.create({
              name: name || "Student",
              email: email,
              purchasedCourses: [courseId]
            });
          } else {
            await User.findByIdAndUpdate(user._id, {
              $addToSet: { purchasedCourses: courseId }
            });
          }

          if (course) {
            const amountString = `INR ${amount}`;
            try {
              await sendCoursePurchaseEmail(email, name || "Student", course.title, transactionId, amountString);
              await sendAdminPurchaseAlert(name || "Student", email, course.title, transactionId, amountString);
            } catch (mailErr) {
              console.error("Mail sending failed:", mailErr);
            }
          }
        }

        return NextResponse.redirect(new URL(`/payment-success?course=${courseSlug}`, req.url));
        
      } catch (dbError) {
        console.error("Database error:", dbError);
        return NextResponse.redirect(new URL('/payment-failure?reason=db_error', req.url));
      }
    } else {
      return NextResponse.redirect(new URL('/payment-failure?reason=status_failed', req.url));
    }
  } catch (error) {
    console.error("Critical Error:", error);
    return NextResponse.redirect(new URL('/payment-failure?reason=critical_error', req.url));
  }
}