# Admin Action Logging v1

## Purpose
This document defines what must be recorded whenever an admin/operator takes action.

---

## Actions That Must Be Logged
- verification approval/rejection
- warning
- pause
- suspension
- ban
- booking cancellation by platform
- payout hold
- refund decision
- report closure
- important support resolution

---

## Required Log Fields
- admin user ID
- action type
- target type (user, booking, report, payout, verification)
- target ID
- short internal reason
- timestamp

---

## Why This Matters
Action logging supports:
- consistency
- accountability
- operational clarity
- dispute review
- future analytics
