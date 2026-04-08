import { Router } from 'express';

import { query } from '../lib/db.js';
import { requireAuth } from '../middleware/auth.middleware.js';

export const bankAccountsRouter = Router();

bankAccountsRouter.use(requireAuth);

bankAccountsRouter.get('/', async (req, res) => {
  const result = await query(
    `
      SELECT id, bank_name, account_number, account_name, created_at
      FROM bank_accounts
      WHERE user_id = $1
      ORDER BY created_at DESC
    `,
    [req.user.id]
  );

  res.json(result.rows);
});

bankAccountsRouter.post('/', async (req, res) => {
  const { bankName, accountNumber, accountName } = req.body;

  if (!bankName || !accountNumber || !accountName) {
    return res.status(400).json({ error: 'Bank name, account number, and account name are required.' });
  }

  const result = await query(
    `
      INSERT INTO bank_accounts (user_id, bank_name, account_number, account_name)
      VALUES ($1, $2, $3, $4)
      RETURNING id, bank_name, account_number, account_name, created_at
    `,
    [req.user.id, bankName, accountNumber, accountName]
  );

  res.status(201).json(result.rows[0]);
});

