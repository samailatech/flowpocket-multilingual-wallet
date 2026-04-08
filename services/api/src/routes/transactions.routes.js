import { Router } from 'express';

import { query, withTransaction } from '../lib/db.js';
import { generateReference, verifyValue } from '../lib/security.js';
import { requireAuth } from '../middleware/auth.middleware.js';

export const transactionsRouter = Router();

transactionsRouter.use(requireAuth);

transactionsRouter.get('/', async (req, res) => {
  const result = await query(
    `
      SELECT id, sender_id, receiver_id, amount, type, status, reference, narration, created_at
      FROM transactions
      WHERE sender_id = $1 OR receiver_id = $1
      ORDER BY created_at DESC
      LIMIT 50
    `,
    [req.user.id]
  );

  res.json(
    result.rows.map((row) => ({
      ...row,
      amount: Number(row.amount),
    }))
  );
});

transactionsRouter.post('/transfer', async (req, res) => {
  const { receiver, amount: rawAmount, pin, narration } = req.body;
  const amount = Number(rawAmount || 0);

  if (!receiver || amount <= 0 || !pin) {
    return res.status(400).json({ error: 'Receiver, amount, and transaction PIN are required.' });
  }

  const pinResult = await query('SELECT pin_hash FROM users WHERE id = $1', [req.user.id]);
  const pinHash = pinResult.rows[0]?.pin_hash;

  if (!(await verifyValue(pin, pinHash))) {
    return res.status(401).json({ error: 'Invalid transaction PIN.' });
  }

  const receiverResult = await query(
    `
      SELECT id, email, phone
      FROM users
      WHERE email = $1 OR phone = $1
      LIMIT 1
    `,
    [String(receiver).toLowerCase()]
  );

  const destinationUser = receiverResult.rows[0];

  if (!destinationUser) {
    return res.status(404).json({ error: 'Receiver account not found.' });
  }

  if (destinationUser.id === req.user.id) {
    return res.status(400).json({ error: 'You cannot transfer to your own wallet.' });
  }

  if (req.user.wallet_balance < amount) {
    return res.status(400).json({ error: 'Insufficient wallet balance.' });
  }

  const reference = generateReference('P2P');

  await withTransaction(async (client) => {
    await client.query('UPDATE users SET wallet_balance = wallet_balance - $2, updated_at = NOW() WHERE id = $1', [req.user.id, amount]);
    await client.query('UPDATE users SET wallet_balance = wallet_balance + $2, updated_at = NOW() WHERE id = $1', [destinationUser.id, amount]);
    await client.query(
      `
        INSERT INTO transactions (sender_id, receiver_id, amount, type, status, reference, narration)
        VALUES ($1, $2, $3, 'p2p_transfer', 'successful', $4, $5)
      `,
      [req.user.id, destinationUser.id, amount, reference, narration || 'P2P wallet transfer']
    );
  });

  res.status(201).json({
    message: 'Transfer completed successfully.',
    reference,
    receiverId: destinationUser.id,
    amount,
  });
});

transactionsRouter.post('/request-payment', async (req, res) => {
  const { contact, amount: rawAmount, note } = req.body;
  const amount = Number(rawAmount || 0);

  if (!contact || amount <= 0) {
    return res.status(400).json({ error: 'Contact and amount are required.' });
  }

  const recipientResult = await query(
    `
      SELECT id
      FROM users
      WHERE email = $1 OR phone = $1
      LIMIT 1
    `,
    [String(contact).toLowerCase()]
  );

  const result = await query(
    `
      INSERT INTO payment_requests (requester_id, recipient_id, amount, note)
      VALUES ($1, $2, $3, $4)
      RETURNING id, requester_id, recipient_id, amount, note, status, created_at
    `,
    [req.user.id, recipientResult.rows[0]?.id || null, amount, note || null]
  );

  res.status(201).json({
    ...result.rows[0],
    amount: Number(result.rows[0].amount),
  });
});

