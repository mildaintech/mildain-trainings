import nodemailer from 'nodemailer';

export interface LeadEmailPayload {
  fullName: string;
  email: string;
  phone: string;
  country?: string;
  subject?: string;
  inquiryType?: string;
  source?: string;
  message?: string;
  ip?: string;
}

function escapeHtml(value: string): string {
  return (value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function createTransporter() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 465);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) return null;

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });
}

export async function sendLeadEmails(lead: LeadEmailPayload): Promise<void> {
  const transporter = createTransporter();
  if (!transporter) return;

  const fromAddress = `"Mildain Trainings" <${process.env.SMTP_USER}>`;
  const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL || process.env.SMTP_USER;
  const safeName = escapeHtml(lead.fullName);
  const safeEmail = escapeHtml(lead.email);
  const safePhone = escapeHtml(lead.phone);
  const safeCountry = escapeHtml(lead.country || 'Not Specified');
  const safeType = escapeHtml(lead.subject || lead.inquiryType || 'General Inquiry');
  const safeSource = escapeHtml(lead.source || 'Website Form');
  const safeMessage = escapeHtml(lead.message?.trim() || 'No message provided');
  const safeIp = escapeHtml(lead.ip || 'N/A');
  const submittedAt = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

  const userHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 10px; overflow: hidden;">
      <div style="background: #1f4e46; padding: 24px; text-align: center; color: #ffffff;">
        <h2 style="margin: 0; font-size: 22px;">Thank You for Contacting Mildain Trainings</h2>
      </div>
      <div style="padding: 24px; color: #1f2937; line-height: 1.6;">
        <p style="margin-top: 0;">Hi <strong>${safeName}</strong>,</p>
        <p>We have received your inquiry. Our training advisor will review your details and get back to you shortly.</p>
        <div style="background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px; margin: 20px 0;">
          <p style="margin: 0 0 8px 0; font-weight: bold; color: #111827;">Your Submitted Details:</p>
          <p style="margin: 4px 0;"><strong>Name:</strong> ${safeName}</p>
          <p style="margin: 4px 0;"><strong>Email:</strong> ${safeEmail}</p>
          <p style="margin: 4px 0;"><strong>Phone:</strong> ${safePhone}</p>
          <p style="margin: 4px 0;"><strong>Inquiry Type:</strong> ${safeType}</p>
          <p style="margin: 4px 0;"><strong>Message:</strong> ${safeMessage}</p>
        </div>
        <p style="margin-bottom: 0;">For immediate assistance, reach us at <strong>+91 892-919-9704</strong> or reply to this email.</p>
        <p style="margin-top: 20px; margin-bottom: 0;">Best Regards,<br/><strong>Team Mildain Trainings</strong></p>
      </div>
    </div>
  `;

  const adminHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 640px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 10px; overflow: hidden;">
      <div style="background: #111827; padding: 20px 24px; color: #ffffff;">
        <h2 style="margin: 0; font-size: 20px;">New Website Lead Received</h2>
        <p style="margin: 4px 0 0 0; font-size: 13px; color: #d1d5db;">${safeSource} • ${submittedAt} IST</p>
      </div>
      <div style="padding: 24px; color: #1f2937;">
        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; font-weight: bold; width: 150px;">Full Name</td>
            <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">${safeName}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; font-weight: bold;">Email</td>
            <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;"><a href="mailto:${safeEmail}">${safeEmail}</a></td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; font-weight: bold;">Phone</td>
            <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;"><a href="tel:${safePhone}">${safePhone}</a></td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; font-weight: bold;">Country</td>
            <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">${safeCountry}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; font-weight: bold;">Inquiry Type</td>
            <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">${safeType}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; font-weight: bold;">Source</td>
            <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">${safeSource}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; font-weight: bold;">IP Address</td>
            <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">${safeIp}</td>
          </tr>
          <tr>
            <td style="padding: 10px; font-weight: bold; vertical-align: top;">Message</td>
            <td style="padding: 10px; white-space: pre-wrap;">${safeMessage}</td>
          </tr>
        </table>
      </div>
    </div>
  `;

  await Promise.allSettled([
    transporter.sendMail({
      from: fromAddress,
      to: lead.email,
      replyTo: adminEmail,
      subject: 'We received your inquiry - Mildain Trainings',
      html: userHtml,
    }),
    adminEmail
      ? transporter.sendMail({
          from: fromAddress,
          to: adminEmail,
          replyTo: lead.email,
          subject: `New Lead (${safeType}): ${lead.fullName}`,
          html: adminHtml,
        })
      : Promise.resolve(),
  ]);
}