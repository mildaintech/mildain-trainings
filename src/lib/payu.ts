import crypto from 'crypto';

export function generatePayUHash(payload: Record<string, string>, salt: string): string {
  const hashString = `${payload.key}|${payload.txnid}|${payload.amount}|${payload.productinfo}|${payload.firstname}|${payload.email}|||||||||||${salt}`;
  const hash = crypto.createHash('sha512').update(hashString).digest('hex');
  return hash;
}

export function verifyPayUHash(payload: Record<string, string>, salt: string): boolean {
  const hashString = `${salt}|${payload.status}|||||||||||${payload.email}|${payload.firstname}|${payload.productinfo}|${payload.amount}|${payload.txnid}|${payload.key}`;
  const generatedHash = crypto.createHash('sha512').update(hashString).digest('hex');
  return generatedHash === payload.hash;
}