import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendAdminPurchaseAlert(studentName: string, studentEmail: string, courseTitle: string, transactionId: string, amount: string) {
  try {
    const adminEmail = process.env.SMTP_USER || "info@mildaintrainings.com";

    const mailOptions = {
      from: `"Mildain Payments" <${process.env.SMTP_USER}>`,
      to: adminEmail,
      subject: `New Course Enrollment - ${courseTitle}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 10px; overflow: hidden;">
          <div style="background-color: #10b981; padding: 20px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 22px;">New Course Sale!</h1>
          </div>
          <div style="padding: 30px;">
            <p style="color: #334155; font-size: 16px;">Hello Admin,</p>
            <p style="color: #334155; font-size: 16px;">A student has successfully purchased a course on Mildain Trainings.</p>
            
            <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 25px 0; border: 1px solid #e2e8f0;">
              <p style="margin: 0 0 10px 0; color: #0f172a; font-weight: bold; font-size: 16px;">Student Details:</p>
              <p style="margin: 5px 0; color: #475569;"><strong>Name:</strong> ${studentName}</p>
              <p style="margin: 5px 0; color: #475569;"><strong>Email:</strong> ${studentEmail}</p>
              <p style="margin: 5px 0; color: #475569;"><strong>Course:</strong> ${courseTitle}</p>
              <p style="margin: 5px 0; color: #475569;"><strong>Transaction ID:</strong> ${transactionId}</p>
              <p style="margin: 5px 0; color: #475569;"><strong>Amount Paid:</strong> ${amount}</p>
            </div>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("ADMIN MAIL ERROR:", error);
  }
}

export async function sendWelcomeLoginEmail(toEmail: string, studentName: string) {
  try {
    const formattedDate = new Date().toLocaleString("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    });

    const mailOptions = {
      from: `"Mildain Trainings" <${process.env.SMTP_USER}>`,
      to: toEmail,
      subject: "Welcome to Mildain Trainings - Account Activated",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 8px;">
          <h2 style="color: #0f172a; margin-top: 0;">Welcome to Mildain Trainings!</h2>
          <p style="color: #334155; font-size: 15px;">Hello ${studentName},</p>
          <p style="color: #334155; font-size: 15px;">Thank you for joining our platform. Your account has been verified and this is your first successful login.</p>
          <div style="background-color: #f8fafc; padding: 16px; border-radius: 6px; margin: 20px 0; border: 1px solid #f1f5f9;">
            <p style="margin: 0 0 8px 0; color: #475569; font-size: 14px;"><strong>Account Email:</strong> ${toEmail}</p>
            <p style="margin: 0; color: #475569; font-size: 14px;"><strong>Activated On:</strong> ${formattedDate}</p>
          </div>
          <p style="color: #64748b; font-size: 13px; line-height: 1.5;">You now have full access to your student dashboard, registered courses, and learning resources.</p>
          <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
          <p style="color: #94a3b8; font-size: 12px; margin: 0;">Mildain Trainings Team | ${process.env.SMTP_USER}</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("MAIL ERROR:", error);
  }
}

export async function sendCoursePurchaseEmail(toEmail: string, studentName: string, courseTitle: string, transactionId: string, amount: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://mildaintrainings.com';

    const mailOptions = {
      from: `"Mildain Trainings" <${process.env.SMTP_USER}>`,
      to: toEmail,
      subject: `Welcome to Mildain Trainings - ${courseTitle}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 10px; overflow: hidden;">
          <div style="background-color: #0f172a; padding: 20px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 24px;">Mildain Trainings</h1>
          </div>
          <div style="padding: 30px;">
            <h2 style="color: #0f172a; margin-top: 0;">Payment Successful!</h2>
            <p style="color: #475569; font-size: 16px;">Hi ${studentName},</p>
            <p style="color: #475569; font-size: 16px;">Thank you for enrolling in <strong>${courseTitle}</strong>.</p>
            
            <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 25px 0; border: 1px solid #e2e8f0;">
              <p style="margin: 0 0 10px 0; color: #0f172a; font-weight: bold; font-size: 16px;">Order Details:</p>
              <p style="margin: 5px 0; color: #475569;"><strong>Course:</strong> ${courseTitle}</p>
              <p style="margin: 5px 0; color: #475569;"><strong>Transaction ID:</strong> ${transactionId}</p>
              <p style="margin: 5px 0; color: #475569;"><strong>Amount Paid:</strong> ${amount}</p>
            </div>

            <p style="color: #475569; font-size: 16px;">You can now log in to your dashboard and start learning.</p>
            
            <div style="text-align: center; margin-top: 30px;">
              <a href="${baseUrl}/login" style="background-color: #10b981; color: #ffffff; padding: 14px 28px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">Go to Dashboard</a>
            </div>
          </div>
          <div style="background-color: #f8fafc; padding: 20px; text-align: center; border-top: 1px solid #e2e8f0;">
            <p style="color: #94a3b8; font-size: 13px; margin: 0;">If you have any questions, contact us at info@mildaintrainings.com</p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("COURSE MAIL ERROR:", error);
  }
}