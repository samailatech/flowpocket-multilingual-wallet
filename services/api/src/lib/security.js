import crypto from 'crypto';

export async function hashValue(value) {
  const salt = crypto.randomBytes(16).toString('hex');
  const derivedKey = await new Promise((resolve, reject) => {
    crypto.scrypt(value, salt, 64, (error, result) => {
      if (error) reject(error);
      else resolve(result);
    });
  });

  return `${salt}:${derivedKey.toString('hex')}`;
}

export async function verifyValue(value, storedHash) {
  if (!storedHash) return false;

  const [salt, hash] = storedHash.split(':');
  if (!salt || !hash) return false;

  const derivedKey = await new Promise((resolve, reject) => {
    crypto.scrypt(value, salt, 64, (error, result) => {
      if (error) reject(error);
      else resolve(result);
    });
  });

  return crypto.timingSafeEqual(Buffer.from(hash, 'hex'), Buffer.from(derivedKey.toString('hex'), 'hex'));
}

export function generateReference(prefix = 'TXN') {
  return `${prefix}-${Date.now()}-${crypto.randomBytes(4).toString('hex')}`;
}

