import { verifyToken } from '../lib/jwt.js';
import { query } from '../lib/db.js';

export async function requireAuth(req, res, next) {
  try {
    const authHeader = req.headers.authorization || '';
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;

    if (!token) {
      return res.status(401).json({ error: 'Authorization token is required.' });
    }

    const payload = verifyToken(token);
    const result = await query(
      `
        SELECT id, name, email, phone, bvn, nin, wallet_balance, two_factor_enabled, verification_level
        FROM users
        WHERE id = $1
      `,
      [payload.userId]
    );

    const user = result.rows[0];

    if (!user) {
      return res.status(401).json({ error: 'User session is no longer valid.' });
    }

    req.user = {
      ...user,
      wallet_balance: Number(user.wallet_balance || 0),
      two_factor_enabled: Boolean(user.two_factor_enabled),
    };

    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid or expired token.' });
  }
}

