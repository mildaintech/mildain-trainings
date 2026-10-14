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