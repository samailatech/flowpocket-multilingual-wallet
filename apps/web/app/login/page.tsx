'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const response = await fetch(`${apiBaseUrl}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload.error || 'Unable to sign in.');
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
        setError(submitError instanceof Error ? submitError.message : 'Unable to sign in.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="auth-shell">
      <section className="auth-panel">
        <p className="eyebrow">Sign In</p>
        <h1>Access your wallet dashboard.</h1>
        <p className="auth-copy">
          Sign in with the same credentials you used during registration and continue with wallet actions.
        </p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <input placeholder="Email address" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

          {error ? <p className="form-error">{error}</p> : null}

          <button className="btn btn-primary" type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        <p className="auth-switch">
          New here? <Link href="/register">Create an account</Link>
        </p>
      </section>
    </main>
  );
}
