import { connectToDatabase } from '@/lib/db';
import RateLimit from '@/models/RateLimit';

export interface LeadGuardResult {
  ok: boolean;
  silentBlock?: boolean;
  status?: number;
  message?: string;
  ip?: string;
}

export function getClientIp(req: Request): string {
  const forwardedFor = req.headers.get('x-forwarded-for');
  if (forwardedFor) {
    const firstIp = forwardedFor.split(',')[0]?.trim();
    if (firstIp) return firstIp;
  }
  const realIp = req.headers.get('x-real-ip');
  if (realIp) return realIp.trim();
  return 'unknown';
}

function isFakePhonePattern(phone: string): boolean {
  const digits = (phone || '').replace(/\D/g, '');
  if (digits.length < 7 || digits.length > 15) return true;

  const localTen = digits.length >= 10 ? digits.slice(-10) : digits;

  if (/^(\d)\1+$/.test(localTen)) return true;

  const sequentialPatterns = [
    '0123456789',
    '1234567890',
    '9876543210',
    '0987654321',
    '1234512345',
    '1122334455',
    '9988776655',
  ];
  if (sequentialPatterns.includes(localTen)) return true;

  if (digits.startsWith('91') && digits.length === 12) {
    const indianMobile = digits.slice(2);
    if (!/^[6-9]\d{9}$/.test(indianMobile)) return true;
  }

  return false;
}

function isFakeTextPattern(fullName: string, email: string): boolean {
  const cleanName = (fullName || '').trim().toLowerCase();
  const cleanEmail = (email || '').trim().toLowerCase();

  if (cleanName.length < 3 || cleanName.length > 60) return true;
  if (/^(.)\1{2,}$/.test(cleanName.replace(/\s/g, ''))) return true;

  const blockedNames = ['test', 'testing', 'asdf', 'qwerty', 'admin', 'demo', 'user', 'abc', 'xyz'];
  if (blockedNames.includes(cleanName)) return true;

  const blockedEmails = [
    'test@test.com',
    'test@gmail.com',
    'abc@gmail.com',
    'xyz@gmail.com',
    'admin@admin.com',
    'demo@demo.com',
    'example@example.com',
    'asdf@gmail.com',
  ];
  if (blockedEmails.includes(cleanEmail)) return true;

  const localPart = cleanEmail.split('@')[0] || '';
  if (/^(.)\1{3,}$/.test(localPart)) return true;

  return false;
}

async function verifyRecaptchaToken(token: string, ip: string): Promise<boolean> {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  if (!secretKey) return true;
  if (!token || typeof token !== 'string') return false;

  try {
    const params = new URLSearchParams();
    params.append('secret', secretKey);
    params.append('response', token);
    if (ip && ip !== 'unknown') {
      params.append('remoteip', ip);
    }

    const res = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString(),
    });

    if (!res.ok) return false;
    const data = await res.json();
    return Boolean(data.success);
  } catch {
    return false;
  }
}

export async function verifyLeadRequest(req: Request, body: any): Promise<LeadGuardResult> {
  const ip = getClientIp(req);

  const honeypotValue =
    body?.website || body?.companyWebsite || body?.faxNumber || body?.honeypot || '';
  if (typeof honeypotValue === 'string' && honeypotValue.trim().length > 0) {
    return { ok: false, silentBlock: true, ip };
  }

  const formLoadedAt = Number(body?.formLoadedAt || 0);
  if (!formLoadedAt || Number.isNaN(formLoadedAt)) {
    return { ok: false, silentBlock: true, ip };
  }
  const elapsedMs = Date.now() - formLoadedAt;
  if (elapsedMs < 3000) {
    return { ok: false, silentBlock: true, ip };
  }

  if (isFakeTextPattern(body?.fullName, body?.email)) {
    return {
      ok: false,
      status: 400,
      message: 'Please enter a valid name and email address.',
      ip,
    };
  }

  if (isFakePhonePattern(body?.phone)) {
    return {
      ok: false,
      status: 400,
      message: 'Please enter a valid active phone number.',
      ip,
    };
  }

  const captchaValid = await verifyRecaptchaToken(body?.recaptchaToken, ip);
  if (!captchaValid) {
    return {
      ok: false,
      status: 400,
      message: 'Security verification failed. Please refresh and try again.',
      ip,
    };
  }

  if (ip !== 'unknown') {
    await connectToDatabase();
    const record = await RateLimit.findOneAndUpdate(
      { ip },
      { $inc: { count: 1 }, $setOnInsert: { createdAt: new Date() } },
      { upsert: true, new: true }
    );

    if (record && record.count > 3) {
      return {
        ok: false,
        status: 429,
        message: 'Too many submissions from your network. Please try again after 1 hour.',
        ip,
      };
    }
  }

  return { ok: true, ip };
}