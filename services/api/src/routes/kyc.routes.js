import { Router } from 'express';

import { query } from '../lib/db.js';
import { requireAuth } from '../middleware/auth.middleware.js';

export const kycRouter = Router();

kycRouter.use(requireAuth);

kycRouter.post('/verify', async (req, res) => {
  const { bvn, nin } = req.body;

  if (!bvn && !nin) {
    return res.status(400).json({ error: 'BVN or NIN is required for verification.' });
  }

  const result = await query(
    `
      UPDATE users
      SET bvn = COALESCE($2, bvn),
          nin = COALESCE($3, nin),
          verification_level = 'verified',
          updated_at = NOW()
      WHERE id = $1
      RETURNING id, bvn, nin, verification_level
    `,
    [req.user.id, bvn || null, nin || null]
  );

  res.json({
    message: 'Identity details submitted successfully.',
    user: result.rows[0],
  });
});

