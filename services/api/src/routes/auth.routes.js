import { Router } from 'express';

import { query } from '../lib/db.js';
import { signToken } from '../lib/jwt.js';
import { hashValue, verifyValue } from '../lib/security.js';
import { requireAuth } from '../middleware/auth.middleware.js';

export const authRouter = Router();

authRouter.post('/register', async (req, res) => {
  try {
    const { name, email, phone, password, bvn, nin, pin } = req.body;

    if (!name || !email || !phone || !password || !pin) {
      return res.status(400).json({ error: 'Name, email, phone, password, and transaction PIN are required.' });
    }

    const passwordHash = await hashValue(password);
    const pinHash = await hashValue(pin);

    const result = await query(
      `
        INSERT INTO users (name, email, phone, password_hash, bvn, nin, pin_hash, verification_level)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING id, name, email, phone, bvn, nin, wallet_balance, verification_level
      `,
      [name, email.toLowerCase(), phone, passwordHash, bvn || null, nin || null, pinHash, bvn || nin ? 'basic' : 'unverified']
    );

    const user = result.rows[0];
    const token = signToken({ userId: user.id, email: user.email });

    return res.status(201).json({
      token,
      user: {
        ...user,
        wallet_balance: Number(user.wallet_balance || 0),
      },
    });
  } catch (error) {
    console.error('Register error:', error);

    if (error.code === '23505') {
      return res.status(409).json({ error: 'A user with that email or phone already exists.' });
    }

    return res.status(500).json({ error: 'Unable to register user.' });
  }
});

authRouter.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }

    const result = await query(
      `
        SELECT id, name, email, phone, bvn, nin, wallet_balance, password_hash, verification_level, two_factor_enabled
        FROM users
        WHERE email = $1
      `,
      [email.toLowerCase()]
    );

    const user = result.rows[0];

    if (!user || !(await verifyValue(password, user.password_hash))) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    const token = signToken({ userId: user.id, email: user.email });

    return res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        bvn: user.bvn,
        nin: user.nin,
        wallet_balance: Number(user.wallet_balance || 0),
        verification_level: user.verification_level,
        two_factor_enabled: Boolean(user.two_factor_enabled),
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ error: 'Unable to sign in.' });
  }
});

authRouter.get('/me', requireAuth, async (req, res) => {
  return res.json({ user: req.user });
});
console.error('Register error:', error)