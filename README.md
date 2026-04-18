# Digital Wallet & P2P Payment App

A fintech starter project for wallet funding, peer-to-peer transfers, bill payments, airtime and data purchases, QR receiving, spending analytics, and secure transaction flows.

## Stack

- Web: Next.js 14, Tailwind CSS, shadcn-style UI
- Mobile: React Native with Expo
- Backend: Node.js and Express
- Database: PostgreSQL (Neon-ready)
- Cache: Redis (Upstash-ready)
- Auth: NextAuth.js and JWT
- Real-time: Socket.io

## Structure

- `apps/web`: Web dashboard and landing experience
- `apps/mobile`: Expo mobile app shell
- `services/api`: Express API for wallet operations
- `packages/db`: SQL schema and seed notes
- `packages/shared`: Shared types and constants
- `docs`: Architecture and recruiter-facing project notes

## Feature Areas

- Account creation and KYC-ready profile fields
- Wallet funding and withdrawals
- P2P transfers by email or phone
- Payment requests and QR receive flow
- Airtime, data, electricity, and cable bill services
- Transaction PIN and 2FA-ready hooks
- Analytics, savings goals, and transaction history

## Quick Start

Install dependencies from the project root and run the app you need:

```bash
npm install
npm run db:start
npm run db:init
npm run dev:web
npm run dev:api
npm run dev:mobile
```

Local defaults:

- Web app: `http://localhost:3000`
- API: `http://localhost:4000`
- PostgreSQL: `localhost:5434`

The API reads its local connection details from `services/api/.env`.

## Local Startup Order

Use the project root for local development:

```bash
cd /home/samaila/Desktop/projects/digital-wallet-p2p-app
```

If you want to start everything together:

```bash
npm run dev:full
```

That will:

1. start the local PostgreSQL container
2. start the API on `http://localhost:4000`
3. start the web app on `http://localhost:3000`

If the database schema has not been loaded yet, run this once first:

```bash
npm run db:init
```

You can also run the app pieces separately:

```bash
npm run dev:api
npm run dev:web
```

## Recruiter Summary

Built a P2P payment app with wallet funding, transaction PIN, and real-time notifications serving 100+ test users.
