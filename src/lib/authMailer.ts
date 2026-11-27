import nodemailer from 'nodemailer';

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

export async function sendAdminRegistrationAlert(data: {
  name: string;
  email: string;
  contactNumber: string;
  ip?: string;
}): Promise<void> {
  const transporter = createTransporter();
  if (!transporter) return;

  const fromAddress = `"Mildain Trainings" <${process.env.SMTP_USER}>`;
  const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL || process.env.SMTP_USER;
  if (!adminEmail) return;

  const safeName = escapeHtml(data.name);
  const safeEmail = escapeHtml(data.email);
  const safePhone = escapeHtml(data.contactNumber);
  const safeIp = escapeHtml(data.ip || 'N/A');
  const registeredAt = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

  const adminHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 620px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 10px; overflow: hidden;">
      <div style="background: #1f4e46; padding: 20px 24px; color: #ffffff;">
        <h2 style="margin: 0; font-size: 20px;">New Student Registration</h2>
        <p style="margin: 4px 0 0 0; font-size: 13px; color: #d1fae5;">${registeredAt} IST</p>
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
            <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; font-weight: bold;">Contact Number</td>
            <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;"><a href="tel:${safePhone}">${safePhone}</a></td>
          </tr>
          <tr>
            <td style="padding: 10px; font-weight: bold;">IP Address</td>
            <td style="padding: 10px;">${safeIp}</td>
          </tr>
        </table>
      </div>
    </div>
  `;

  await transporter.sendMail({
    from: fromAddress,
    to: adminEmail,
    replyTo: data.email,
    subject: `New User Registered: ${data.name}`,
    html: adminHtml,
  });
}

export async function sendAdminLoginAlert(data: {
  name: string;
  email: string;
  role: string;
  ip?: string;
}): Promise<void> {
  const transporter = createTransporter();
  if (!transporter) return;

  const fromAddress = `"Mildain Trainings Security" <${process.env.SMTP_USER}>`;
  const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL || process.env.SMTP_USER;
  if (!adminEmail) return;

  const safeName = escapeHtml(data.name || 'User');
  const safeEmail = escapeHtml(data.email);
  const safeRole = escapeHtml(data.role);
  const safeIp = escapeHtml(data.ip || 'N/A');
  const loggedInAt = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

  const adminHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 10px; overflow: hidden;">
      <div style="background: #111827; padding: 20px 24px; color: #ffffff;">
        <h2 style="margin: 0; font-size: 19px;">Admin Panel Login Alert</h2>
        <p style="margin: 4px 0 0 0; font-size: 13px; color: #d1d5db;">${loggedInAt} IST</p>
      </div>
      <div style="padding: 24px; color: #1f2937;">
        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; font-weight: bold; width: 140px;">Account Name</td>
            <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">${safeName}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; font-weight: bold;">Email</td>
            <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">${safeEmail}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; font-weight: bold;">Role</td>
            <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">${safeRole}</td>
          </tr>
          <tr>
            <td style="padding: 10px; font-weight: bold;">IP Address</td>
            <td style="padding: 10px;">${safeIp}</td>
          </tr>
        </table>
      </div>
    </div>
  `;

  await transporter.sendMail({
    from: fromAddress,
    to: adminEmail,
    subject: `Login Alert (${safeRole}): ${data.email}`,
    html: adminHtml,
  });
}