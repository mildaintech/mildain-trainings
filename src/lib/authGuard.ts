import { connectToDatabase } from '@/lib/db';
import AuthRateLimit from '@/models/AuthRateLimit';

export interface AuthGuardResult {
  ok: boolean;
  status?: number;
  message?: string;
  ip: string;
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

function isFakeRegisterTextPattern(name: string, email: string): boolean {
  const cleanName = (name || '').trim().toLowerCase();
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

export async function verifyLoginRequest(req: Request, body: any): Promise<AuthGuardResult> {
  const ip = getClientIp(req);

  if (ip !== 'unknown') {
    await connectToDatabase();
    const record = await AuthRateLimit.findOne({ key: `login:${ip}` });
    if (record && record.expiresAt > new Date() && record.count >= 8) {
      return {
        ok: false,
        status: 429,
        message: 'Too many failed login attempts. Please try again after 15 minutes.',
        ip,
      };
    }
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

  return { ok: true, ip };
}

export async function recordFailedLogin(ip: string): Promise<void> {
  if (!ip || ip === 'unknown') return;
  await connectToDatabase();
  const key = `login:${ip}`;
  const now = new Date();
  const existing = await AuthRateLimit.findOne({ key });

  if (!existing || existing.expiresAt <= now) {
    await AuthRateLimit.findOneAndUpdate(
      { key },
      { count: 1, expiresAt: new Date(now.getTime() + 15 * 60 * 1000) },
      { upsert: true }
    );
  } else {
    await AuthRateLimit.updateOne({ key }, { $inc: { count: 1 } });
  }
}

export async function clearLoginRateLimit(ip: string): Promise<void> {
  if (!ip || ip === 'unknown') return;
  await connectToDatabase();
  await AuthRateLimit.deleteOne({ key: `login:${ip}` });
}

export async function verifyRegisterRequest(req: Request, body: any): Promise<AuthGuardResult> {
  const ip = getClientIp(req);

  const honeypotValue =
    body?.website || body?.companyWebsite || body?.faxNumber || body?.honeypot || '';
  if (typeof honeypotValue === 'string' && honeypotValue.trim().length > 0) {
    return {
      ok: false,
      status: 400,
      message: 'Invalid registration submission.',
      ip,
    };
  }

  const formLoadedAt = Number(body?.formLoadedAt || 0);
  if (!formLoadedAt || Number.isNaN(formLoadedAt) || Date.now() - formLoadedAt < 1500) {
    return {
      ok: false,
      status: 400,
      message: 'Please wait a moment and try creating your account again.',
      ip,
    };
  }

  if (isFakeRegisterTextPattern(body?.name, body?.email)) {
    return {
      ok: false,
      status: 400,
      message: 'Please enter a valid full name and email address.',
      ip,
    };
  }

  if (isFakePhonePattern(body?.contactNumber)) {
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
    const key = `register:${ip}`;
    const now = new Date();
    const existing = await AuthRateLimit.findOne({ key });

    if (!existing || existing.expiresAt <= now) {
      await AuthRateLimit.findOneAndUpdate(
        { key },
        { count: 1, expiresAt: new Date(now.getTime() + 60 * 60 * 1000) },
        { upsert: true }
      );
    } else if (existing.count >= 5) {
      return {
        ok: false,
        status: 429,
        message: 'Too many registration attempts from your network. Please try again after 1 hour.',
        ip,
      };
    } else {
      await AuthRateLimit.updateOne({ key }, { $inc: { count: 1 } });
    }
  }

  return { ok: true, ip };
}