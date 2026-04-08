import { Router } from 'express';

import { query } from '../lib/db.js';
import { generateReference, verifyValue } from '../lib/security.js';
import { requireAuth } from '../middleware/auth.middleware.js';

export const billsRouter = Router();

const billCatalog = {
  electricity: ['IKEDC', 'EKEDC', 'AEDC'],
  cable: ['DSTV', 'GOtv', 'Startimes'],
  internet: ['Spectranet', 'Smile', 'MTN Fibre'],
};

billsRouter.use(requireAuth);

billsRouter.get('/catalog', (_req, res) => {
  res.json(billCatalog);
});

billsRouter.post('/pay', async (req, res) => {
  const { billType, billerId, amount: rawAmount, pin } = req.body;
  const amount = Number(rawAmount || 0);

  if (!billType || !billerId || amount <= 0 || !pin) {
    return res.status(400).json({ error: 'Bill type, biller, amount, and PIN are required.' });
  }

  const pinResult = await query('SELECT pin_hash FROM users WHERE id = $1', [req.user.id]);
  if (!(await verifyValue(pin, pinResult.rows[0]?.pin_hash))) {
    return res.status(401).json({ error: 'Invalid transaction PIN.' });
  }

  if (req.user.wallet_balance < amount) {
    return res.status(400).json({ error: 'Insufficient wallet balance.' });
  }

  const reference = generateReference('BILL');

  await query('UPDATE users SET wallet_balance = wallet_balance - $2, updated_at = NOW() WHERE id = $1', [req.user.id, amount]);
  await query(
    `
      INSERT INTO bills (user_id, bill_type, biller_id, amount, status)
      VALUES ($1, $2, $3, $4, 'successful')
    `,
    [req.user.id, billType, billerId, amount]
  );
  await query(
    `
      INSERT INTO transactions (sender_id, amount, type, status, reference, narration)
      VALUES ($1, $2, 'bill_payment', 'successful', $3, $4)
    `,
    [req.user.id, amount, reference, `${billType} payment to ${billerId}`]
  );

  res.status(201).json({
    message: 'Bill paid successfully.',
    reference,
    amount,
  });
});

