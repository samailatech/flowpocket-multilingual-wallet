'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    pin: '',
    bvn: '',
    nin: '',
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const response = await fetch(`${apiBaseUrl}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload.error || 'Unable to create account.');
      }

      localStorage.setItem('flowpocket_token', payload.token);
      router.push('/dashboard');
    } catch (submitError) {
      if (submitError instanceof TypeError) {
        setError(
          process.env.NODE_ENV === 'development'
            ? 'Unable to reach the wallet API. Start the backend on http://localhost:4000 and try again.'
            : 'Unable to reach the wallet service right now. Please try again in a moment.'
        );
      } else {
        setError(submitError instanceof Error ? submitError.message : 'Unable to create account.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="auth-shell">
      <section className="auth-panel">
        <p className="eyebrow">Create Account</p>
        <h1>Open your wallet and secure it with a transaction PIN.</h1>
        <p className="auth-copy">
          Register with your phone, email, password, and transfer PIN. Add BVN or NIN now or later.
        </p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <input placeholder="Full name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <input placeholder="Email address" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <input placeholder="Phone number" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
          <input placeholder="Password" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
          <input placeholder="4-digit transaction PIN" value={form.pin} onChange={(e) => setForm({ ...form, pin: e.target.value })} />
          <input placeholder="BVN (optional)" value={form.bvn} onChange={(e) => setForm({ ...form, bvn: e.target.value })} />
          <input placeholder="NIN (optional)" value={form.nin} onChange={(e) => setForm({ ...form, nin: e.target.value })} />

          {error ? <p className="form-error">{error}</p> : null}

          <button className="btn btn-primary" type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Creating account...' : 'Create wallet'}
          </button>
        </form>

        <p className="auth-switch">
          Already have an account? <Link href="/login">Sign in</Link>
        </p>
      </section>
    </main>
  );
}
