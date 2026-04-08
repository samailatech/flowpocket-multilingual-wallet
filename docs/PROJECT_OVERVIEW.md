# Project Overview

## Product Concept

A complete digital wallet app where users can:

- send and receive money
- pay bills
- buy airtime and data
- request payments
- track wallet activity

## Why It Stands Out

- Real money movement logic
- Transaction security with PIN and 2FA-ready architecture
- P2P flows similar to Cash App and Paystack
- Fintech-ready compliance awareness through BVN and NIN fields

## Main User Journeys

1. Create account and verify identity
2. Fund wallet via bank transfer or card
3. Send money to another user
4. Request a payment from a contact
5. Pay bills, buy airtime, and purchase data
6. Withdraw to a linked bank account
7. Review analytics and savings goals

## Core Technical Layers

- Next.js web app for dashboard, history, insights, and admin views
- React Native mobile app for on-the-go transfers and receive flows
- Express API for wallet, bill, transfer, and notification logic
- PostgreSQL for durable financial records
- Redis for idempotency, caching, and rate limits
- Socket.io for live transaction updates

