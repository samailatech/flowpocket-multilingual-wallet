import { Router } from 'express';

import { query } from '../lib/db.js';
import { requireAuth } from '../middleware/auth.middleware.js';

export const savingsRouter = Router();

savingsRouter.use(requireAuth);

savingsRouter.get('/', async (req, res) => {
  const result = await query(
    `
      SELECT id, title, target_amount, current_amount, deadline, created_at
      FROM savings_goals
      WHERE user_id = $1
      ORDER BY created_at DESC
    `,
    [req.user.id]
  );

  res.json(
    result.rows.map((row) => ({
      ...row,
      target_amount: Number(row.target_amount),
      current_amount: Number(row.current_amount),
    }))
  );
});

savingsRouter.post('/', async (req, res) => {
  const { title, targetAmount, deadline } = req.body;
  const amount = Number(targetAmount || 0);

  if (!title || amount <= 0) {
    return res.status(400).json({ error: 'Savings goal title and target amount are required.' });
  }

  const result = await query(
    `
      INSERT INTO savings_goals (user_id, title, target_amount, deadline)
      VALUES ($1, $2, $3, $4)
      RETURNING id, title, target_amount, current_amount, deadline, created_at
    `,
    [req.user.id, title, amount, deadline || null]
  );

  res.status(201).json({
    ...result.rows[0],
    target_amount: Number(result.rows[0].target_amount),
    current_amount: Number(result.rows[0].current_amount),
  });
});
