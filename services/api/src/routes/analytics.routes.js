import { Router } from 'express';

import { query } from '../lib/db.js';
import { requireAuth } from '../middleware/auth.middleware.js';

export const analyticsRouter = Router();

analyticsRouter.use(requireAuth);

analyticsRouter.get('/', async (req, res) => {
  const spendResult = await query(
    `
      SELECT
        COALESCE(SUM(amount), 0) AS total_spend,
        type,
        COUNT(*)::integer AS count
      FROM transactions
      WHERE sender_id = $1
      GROUP BY type
      ORDER BY total_spend DESC
    `,
    [req.user.id]
  );

  const goalsResult = await query(
    `
      SELECT id, title, target_amount, current_amount, deadline
      FROM savings_goals
      WHERE user_id = $1
      ORDER BY created_at DESC
      LIMIT 5
    `,
    [req.user.id]
  );

  const totalSpend = spendResult.rows.reduce((sum, row) => sum + Number(row.total_spend), 0);

  res.json({
    monthlySpend: totalSpend,
    topCategory: spendResult.rows[0]?.type || null,
    breakdown: spendResult.rows.map((row) => ({
      type: row.type,
      total: Number(row.total_spend),
      count: row.count,
    })),
    savingsGoals: goalsResult.rows.map((row) => ({
      ...row,
      target_amount: Number(row.target_amount),
      current_amount: Number(row.current_amount),
    })),
  });
});

