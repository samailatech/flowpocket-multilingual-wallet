import jwt from 'jsonwebtoken';

const expiresIn = '7d';

function getSecret() {
  return process.env.JWT_SECRET || process.env.NEXTAUTH_SECRET || 'flowpocket-dev-secret';
}

export function signToken(payload) {
  return jwt.sign(payload, getSecret(), { expiresIn });
}

export function verifyToken(token) {
  return jwt.verify(token, getSecret());
}

