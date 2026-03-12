# Backend Architecture v1

## Purpose
This document defines the first production-oriented backend architecture for the marketplace.

## Chosen Stack
- Next.js
- TypeScript
- PostgreSQL
- Prisma ORM
- Clerk or NextAuth for authentication
- Stripe Connect for payments and payouts
- Resend for transactional email
- file storage provider for verification documents and profile images
- optional realtime/chat provider depending on implementation choice

## Why This Stack
The platform requires:
- relational data
- role-based permissions
- booking state management
- admin operations
- financial records
- trust and safety records
- scalable marketplace logic

PostgreSQL + Prisma is a strong fit for these requirements.

## Core Backend Responsibilities
The backend must support:
- user authentication and sessions
- client/helper/admin permissions
- request creation and discovery
- application and booking flow
- chat persistence
- review system
- verification storage and review
- report and moderation handling
- payment and payout records
- notifications
- audit trail

## Security Principles
- do not trust client-side role checks alone
- all sensitive operations must be validated server-side
- payment state must be server-driven
- admin actions must be logged
- verification documents must be protected
- personal data access should be role-limited

## Deployment Principle
The system should be deployable as:
- frontend + server actions / route handlers in Next.js
- Postgres database
- third-party services for payments, email, storage, and possibly realtime messaging

## First Build Priority
The backend should be built in this order:
1. auth and users
2. profiles
3. requests
4. bookings
5. chat
6. verification
7. reports/admin
8. payments/payouts
9. notifications