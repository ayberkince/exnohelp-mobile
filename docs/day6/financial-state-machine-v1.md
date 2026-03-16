# Financial State Machine v1

## Purpose
This document defines the financial states that interact with bookings.

---

## 1. Payment Status
- unpaid
- authorized
- paid
- failed
- refunded
- partially_refunded

---

## 2. Payout Status
- not_ready
- pending
- paid_out
- held
- reversed

---

## 3. Refund Status
- none
- requested
- under_review
- approved_full
- approved_partial
- denied
- completed

---

## 4. Cancellation Effect Rules

### canceled before payment
- booking does not proceed
- no payout
- no refund needed if not charged

### canceled after payment but before service
- refund logic applies
- payout remains not_ready

### disputed after completion
- payout may move to held
- refund review may begin