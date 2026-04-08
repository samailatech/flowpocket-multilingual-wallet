import cors from 'cors';
import express from 'express';

import { analyticsRouter } from './routes/analytics.routes.js';
import { authRouter } from './routes/auth.routes.js';
import { bankAccountsRouter } from './routes/bank-accounts.routes.js';
import { billsRouter } from './routes/bills.routes.js';
import { kycRouter } from './routes/kyc.routes.js';
import { savingsRouter } from './routes/savings.routes.js';
import { transactionsRouter } from './routes/transactions.routes.js';
import { walletRouter } from './routes/wallet.routes.js';

export function createApp() {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.get('/health', (_req, res) => {
    res.json({ status: 'ok', service: 'digital-wallet-api' });
  });

  app.use('/api/auth', authRouter);
  app.use('/api/wallet', walletRouter);
  app.use('/api/transactions', transactionsRouter);
  app.use('/api/bills', billsRouter);
  app.use('/api/analytics', analyticsRouter);
  app.use('/api/bank-accounts', bankAccountsRouter);
  app.use('/api/kyc', kycRouter);
  app.use('/api/savings-goals', savingsRouter);

  return app;
}
