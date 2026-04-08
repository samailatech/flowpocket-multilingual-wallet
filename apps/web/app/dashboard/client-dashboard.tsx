'use client';

import { FormEvent, useEffect, useState } from 'react';
import Link from 'next/link';

const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

interface WalletSummary {
  balance: number;
  currency: string;
  linkedBanks: number;
  verificationLevel: string;
  transactionPinEnabled: boolean;
}

interface WalletUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  wallet_balance: number;
  verification_level: string;
}

interface WalletTransaction {
  id: string;
  amount: number;
  type: string;
  status: string;
  reference: string;
}

export default function ClientDashboard() {
  const [token, setToken] = useState('');
  const [user, setUser] = useState<WalletUser | null>(null);
  const [summary, setSummary] = useState<WalletSummary | null>(null);
  const [transactions, setTransactions] = useState<WalletTransaction[]>([]);
  const [feedback, setFeedback] = useState('');
  const [error, setError] = useState('');
  const [transferForm, setTransferForm] = useState({ receiver: '', amount: '', pin: '' });

  useEffect(() => {
    const savedToken = localStorage.getItem('flowpocket_token') || '';
    setToken(savedToken);

    if (!savedToken) {
      setError('No session token found. Please sign in first.');
      return;
    }

    const headers = { Authorization: `Bearer ${savedToken}` };

    Promise.all([
      fetch(`${apiBaseUrl}/api/auth/me`, { headers }),
      fetch(`${apiBaseUrl}/api/wallet/summary`, { headers }),
      fetch(`${apiBaseUrl}/api/transactions`, { headers }),
    ])
      .then(async ([meRes, walletRes, txnRes]) => {
        const [mePayload, walletPayload, txnPayload] = await Promise.all([
          meRes.json(),
          walletRes.json(),
          txnRes.json(),
        ]);

        if (!meRes.ok) throw new Error(mePayload.error || 'Unable to load profile.');
        if (!walletRes.ok) throw new Error(walletPayload.error || 'Unable to load wallet summary.');
        if (!txnRes.ok) throw new Error(txnPayload.error || 'Unable to load transactions.');

        setUser(mePayload.user);
        setSummary(walletPayload);
        setTransactions(txnPayload);
      })
      .catch((loadError) => {
        setError(loadError instanceof Error ? loadError.message : 'Unable to load dashboard.');
      });
  }, []);

  const handleTransfer = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFeedback('');
    setError('');

    try {
      const response = await fetch(`${apiBaseUrl}/api/transactions/transfer`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          receiver: transferForm.receiver,
          amount: Number(transferForm.amount),
          pin: transferForm.pin,
        }),
      });

      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload.error || 'Transfer failed.');
      }

      setFeedback(`Transfer completed. Reference: ${payload.reference}`);
      setTransferForm({ receiver: '', amount: '', pin: '' });
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : 'Transfer failed.');
    }
  };

  return (
    <main className="dashboard-shell">
      <section className="dashboard-hero">
        <div>
          <p className="eyebrow">Live Wallet Dashboard</p>
          <h1>{user ? `Welcome back, ${user.name}.` : 'Wallet command center'}</h1>
          <p>
            Review your wallet, transfer money, and monitor real transactions from the API-backed dashboard.
          </p>
        </div>
        <div className="insight-chip">
          {summary ? `${summary.currency} ${summary.balance.toLocaleString()}` : 'Loading wallet'}
        </div>
      </section>

      {error ? <p className="form-error standalone">{error}</p> : null}
      {feedback ? <p className="form-success standalone">{feedback}</p> : null}

      <section className="dashboard-grid">
        <article className="dashboard-card">
          <span>Wallet balance</span>
          <strong>{summary ? `NGN ${summary.balance.toLocaleString()}` : '--'}</strong>
        </article>
        <article className="dashboard-card">
          <span>Linked bank accounts</span>
          <strong>{summary?.linkedBanks ?? '--'}</strong>
        </article>
        <article className="dashboard-card">
          <span>Verification level</span>
          <strong>{summary?.verificationLevel ?? '--'}</strong>
        </article>
      </section>

      <section className="dashboard-two-up">
        <article className="history-card">
          <div className="section-heading compact">
            <p className="eyebrow">Quick Transfer</p>
            <h2>Send money to email or phone</h2>
          </div>
          <form className="auth-form compact-form" onSubmit={handleTransfer}>
            <input
              placeholder="Receiver email or phone"
              value={transferForm.receiver}
              onChange={(e) => setTransferForm({ ...transferForm, receiver: e.target.value })}
            />
            <input
              placeholder="Amount"
              type="number"
              value={transferForm.amount}
              onChange={(e) => setTransferForm({ ...transferForm, amount: e.target.value })}
            />
            <input
              placeholder="Transaction PIN"
              type="password"
              value={transferForm.pin}
              onChange={(e) => setTransferForm({ ...transferForm, pin: e.target.value })}
            />
            <button type="submit" className="btn btn-primary">Send transfer</button>
          </form>
        </article>

        <article className="history-card">
          <div className="section-heading compact">
            <p className="eyebrow">Session</p>
            <h2>Account controls</h2>
          </div>
          <div className="control-list">
            <p>Email: {user?.email || '--'}</p>
            <p>Phone: {user?.phone || '--'}</p>
            <p>Transaction PIN enabled: {summary?.transactionPinEnabled ? 'Yes' : 'No'}</p>
            <button
              className="btn btn-secondary"
              onClick={() => {
                localStorage.removeItem('flowpocket_token');
                window.location.assign('/login');
              }}
            >
              Sign out
            </button>
            <Link href="/" className="btn btn-secondary">Back to landing</Link>
          </div>
        </article>
      </section>

      <section className="history-card">
        <div className="section-heading compact">
          <p className="eyebrow">Transaction History</p>
          <h2>Recent wallet activity</h2>
        </div>
        <table>
          <thead>
            <tr>
              <th>Reference</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((row) => (
              <tr key={row.id}>
                <td>{row.reference}</td>
                <td>{row.type}</td>
                <td>{`NGN ${row.amount.toLocaleString()}`}</td>
                <td>{row.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}

