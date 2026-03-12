# Architecture Gap List v1

## Purpose
This document compares the current application structure to the full set of systems required for a real marketplace launch.

The purpose is to identify what already exists conceptually and what is still missing for a production-grade product.

---

## 1. Current Strengths

Based on the current route and component structure, the application already shows a strong directional foundation.

### Existing Structural Strengths
- role-separated route structure for client and helper
- early marketplace logic already reflected in route structure
- helper request routes already included
- trust-safety route already included
- shared component folder started
- UI component layer started
- dummy data structure available
- modern Next.js app structure
- mobile-oriented mindset visible in architecture

### Good Product Signals Already Present
- client flow exists conceptually
- helper flow exists conceptually
- request marketplace exists conceptually
- shared cards and trust components already started
- bottom navigation pattern already considered
- helper-side request browsing is already aligned with marketplace liquidity needs

---

## 2. Major Missing Systems

The current app is still closer to a prototype or app shell than a market-ready platform.

The following major systems are still missing or incomplete:

### Authentication and Authorization
- real sign up / login system
- role-based auth handling
- protected routes
- session handling
- password reset / secure access logic

### Database and Persistence
- production database schema
- persistent user data
- persistent client profiles
- persistent helper profiles
- persistent requests
- persistent bookings
- persistent chat
- persistent reviews
- persistent verification records
- persistent notifications

### Booking Engine
- formal booking state machine
- request-to-booking conversion logic
- cancellation logic
- refund state handling
- booking completion flow
- dispute states

### Payments and Payouts
- real payment integration
- platform fee logic
- helper payout flow
- failed payment handling
- refund processing
- payout status tracking

### Verification and Trust
- helper verification backend
- ID verification workflow
- status review logic
- optional background document workflow
- trust badge logic
- manual approval flow

### Messaging
- persistent chat storage
- chat thread model
- booking-linked conversation logic
- unread message state
- message reporting flow

### Notifications
- in-app notification system
- email notification system
- booking reminders
- status updates
- verification notifications

### Reporting and Moderation
- report submission backend
- report categories
- admin review tools
- suspension workflow
- block logic
- moderation records

### Admin / Operations Layer
- admin dashboard
- verification review tools
- report review tools
- booking monitoring tools
- refund operations
- user management tools
- incident review

### Analytics
- event tracking
- funnel metrics
- booking conversion metrics
- helper/client activity tracking
- trust and safety metrics

### Legal / Policy Integration
- terms pages
- privacy pages
- prohibited-task messaging
- trust and safety content integration
- cancellation/refund policy surfaces

---

## 3. Product-Level Gaps

Even beyond engineering systems, some product rules still need to be formally defined.

### Missing Product Rules
- exact booking statuses
- exact cancellation windows
- exact refund logic
- helper acceptance logic
- no-show handling
- emergency escalation rules
- trust badge meaning
- review eligibility rules
- payout release timing
- dispute workflow definitions

---

## 4. Operations Gaps

This startup cannot run on code alone.

### Missing Operational Systems
- helper review checklist
- client support workflow
- support inbox / ticket handling
- incident escalation logic
- fraud review process
- suspension/reinstatement logic
- manual moderation playbook
- payout issue handling

---

## 5. Recommended Immediate Priorities

The next priorities should be addressed in this order:

### Priority 1
Formalize product rules:
- service boundaries
- booking states
- must-have flows
- role permissions

### Priority 2
Build backend foundation:
- auth
- database
- core schema
- route protection

### Priority 3
Build core marketplace persistence:
- profiles
- requests
- bookings
- messaging

### Priority 4
Build trust and operations layer:
- verification
- reporting
- moderation
- admin tools

### Priority 5
Build payment and payout layer:
- payment collection
- fee logic
- payout management

---

## 6. Conclusion
The current codebase has a strong conceptual start and a clean route-level structure, but it is not yet production-ready.

To become market-ready, the project must evolve from:
- page structure
- UI shell
- dummy data

into:
- full persistent marketplace system
- trust and safety infrastructure
- payment-enabled platform
- moderated operations system
- launchable business product

This gap is manageable, but it must be approached systematically.