import { Router } from 'express';

import { query } from '../lib/db.js';
import { generateReference } from '../lib/security.js';
import { requireAuth } from '../middleware/auth.middleware.js';

export const walletRouter = Router();

walletRouter.use(requireAuth);

walletRouter.get('/summary', async (req, res) => {
  const linkedBanks = await query('SELECT COUNT(*)::integer AS total FROM bank_accounts WHERE user_id = $1', [req.user.id]);

  res.json({
    balance: req.user.wallet_balance,
    currency: 'NGN',
    linkedBanks: linkedBanks.rows[0]?.total || 0,
    verificationLevel: req.user.verification_level,
    transactionPinEnabled: true,
  });
});

walletRouter.post('/fund', async (req, res) => {
  const amount = Number(req.body.amount || 0);
  if (amount <= 0) {
    return res.status(400).json({ error: 'Funding amount must be greater than zero.' });
  }

  const reference = generateReference('FUND');

  await query('UPDATE users SET wallet_balance = wallet_balance + $2, updated_at = NOW() WHERE id = $1', [req.user.id, amount]);
  await query(
    `
      INSERT INTO transactions (sender_id, receiver_id, amount, type, status, reference, narration)
      VALUES ($1, $1, $2, 'wallet_funding', 'successful', $3, $4)
    `,
    [req.user.id, amount, reference, 'Wallet funded via test payment rail']
  );

  res.status(201).json({
    message: 'Wallet funded successfully.',
    reference,
    amount,
  });
});

walletRouter.post('/withdraw', async (req, res) => {
  const amount = Number(req.body.amount || 0);
  const bankAccountId = req.body.bankAccountId;

  if (amount <= 0 || !bankAccountId) {
    return res.status(400).json({ error: 'Withdrawal amount and bank account are required.' });
  }

  const bankAccount = await query(
    'SELECT id FROM bank_accounts WHERE id = $1 AND user_id = $2',
    [bankAccountId, req.user.id]
  );

  if (!bankAccount.rows[0]) {
    return res.status(404).json({ error: 'Bank account not found.' });
  }

  if (req.user.wallet_balance < amount) {
    return res.status(400).json({ error: 'Insufficient wallet balance.' });
  }

  const reference = generateReference('WD');

  await query('UPDATE users SET wallet_balance = wallet_balance - $2, updated_at = NOW() WHERE id = $1', [req.user.id, amount]);
  await query(
    `
      INSERT INTO transactions (sender_id, amount, type, status, reference, narration)
      VALUES ($1, $2, 'withdrawal', 'processing', $3, $4)
    `,
    [req.user.id, amount, reference, 'Withdrawal to linked bank account']
  );

  res.status(202).json({
    message: 'Withdrawal request queued.',
    reference,
    amount,
  });
});

