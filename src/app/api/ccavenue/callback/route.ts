import { NextResponse } from 'next/server';
import { decrypt } from '@/lib/ccavenue';
import { connectToDatabase } from '@/lib/db';
import User from '@/models/User';
import Course from '@/models/Course';
import { sendCoursePurchaseEmail, sendAdminPurchaseAlert } from '@/lib/mailer';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const encResp = formData.get('encResp') as string;
    const working_key = process.env.CCAVENUE_WORKING_KEY;

    if (!encResp || !working_key) {
      return NextResponse.redirect(new URL('/payment-failure', req.url));
    }

    const decryptedData = decrypt(encResp, working_key);
    
    const dataObj: Record<string, string> = {};
    decryptedData.split('&').forEach(pair => {
      const [key, value] = pair.split('=');
      if (key) dataObj[key] = value;
    });

    const orderStatus = dataObj['order_status'];
    const courseId = dataObj['merchant_param1'];
    const email = dataObj['merchant_param2'];
    const name = dataObj['merchant_param3'];
    const amount = dataObj['amount'];
    const transactionId = dataObj['tracking_id'];

    await connectToDatabase();
    const course = await Course.findById(courseId);
    const courseSlug = course ? course.slug : '';

    if (orderStatus === 'Success') {
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
          await sendCoursePurchaseEmail(email, name || "Student", course.title, transactionId, amountString);
          await sendAdminPurchaseAlert(name || "Student", email, course.title, transactionId, amountString);
        }
      }
      
      return NextResponse.redirect(new URL(`/payment-success?course=${courseSlug}`, req.url));
      
    } else {
      return NextResponse.redirect(new URL('/payment-failure', req.url));
    }

  } catch (error) {
    return NextResponse.redirect(new URL('/payment-failure', req.url));
  }
}