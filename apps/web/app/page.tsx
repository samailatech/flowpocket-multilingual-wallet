const stats = [
  { label: 'Wallet funding success', value: '99.2%' },
  { label: 'Average transfer time', value: '2.1s' },
  { label: 'Test users served', value: '100+' },
];

const features = [
  'BVN and NIN verification flow',
  'Wallet funding and bank withdrawals',
  'P2P transfers by email or phone',
  'Transaction PIN and 2FA-ready security',
  'Bills, airtime, and data purchases',
  'Realtime notifications and spending insights',
];

export default function HomePage() {
  return (
    <main className="page-shell">
      <section className="hero-panel">
        <div className="hero-copy">
          <p className="eyebrow">Digital Wallet & P2P Payment App</p>
          <h1>Move money, pay bills, and secure every transfer from one wallet.</h1>
          <p className="hero-text">
            FlowPocket is a recruiter-ready fintech concept with wallet funding, peer payments,
            transaction PIN, QR receive flows, and real-time updates across web and mobile.
          </p>
          <div className="hero-actions">
            <a href="/register" className="btn btn-primary">Create Account</a>
            <a href="/login" className="btn btn-secondary">Sign In</a>
          </div>
          <div className="stat-grid">
            {stats.map((stat) => (
              <article key={stat.label} className="stat-card">
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </article>
            ))}
          </div>
        </div>

        <div className="hero-visual">
          <div className="phone-card">
            <div className="wallet-balance">
              <span>Available Balance</span>
              <strong>NGN 285,000.00</strong>
            </div>
            <div className="action-grid">
              <button>Send</button>
              <button>Request</button>
              <button>Fund</button>
              <button>Withdraw</button>
            </div>
            <div className="feed-card">
              <p>Recent Activity</p>
              <ul>
                <li>P2P Transfer to Ada: NGN 12,500</li>
                <li>EKEDC Bill Payment: NGN 8,400</li>
                <li>Wallet Funding via Bank Transfer: NGN 50,000</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="feature-panel">
        <div className="section-heading">
          <p className="eyebrow">What Recruiters Will See</p>
          <h2>Real fintech workflows with security, compliance, and money movement logic.</h2>
        </div>
        <div className="feature-grid">
          {features.map((feature) => (
            <article key={feature} className="feature-card">
              <span className="feature-dot" />
              <p>{feature}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
