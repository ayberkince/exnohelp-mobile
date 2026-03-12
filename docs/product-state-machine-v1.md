# Product State Machine v1

## Purpose
This document defines the lifecycle states of the most important product objects.

State clarity is essential for:
- backend logic
- UI rendering
- notifications
- admin operations
- support decisions
- analytics

---

## 1. Support Request Lifecycle

### States
- draft
- open
- matched
- booked
- canceled
- expired
- closed

### Meaning
- draft: client started request but has not published it
- open: request is visible to helpers
- matched: client selected a helper or accepted an application
- booked: request has been converted into a booking
- canceled: request was canceled before booking completion
- expired: request timed out without match
- closed: request is no longer active

---

## 2. Request Application Lifecycle

### States
- submitted
- withdrawn
- accepted
- rejected

### Meaning
- submitted: helper applied to request
- withdrawn: helper removed their application
- accepted: client or system selected this helper
- rejected: application was not chosen

---

## 3. Booking Lifecycle

### States
- pending_acceptance
- awaiting_payment
- confirmed
- in_progress
- completed
- canceled_by_client
- canceled_by_helper
- disputed
- refunded
- closed

### Meaning
- pending_acceptance: booking proposal exists but helper/client acceptance not complete
- awaiting_payment: booking agreed in principle but payment not completed
- confirmed: booking is confirmed and scheduled
- in_progress: booking time has started
- completed: service completed successfully
- canceled_by_client: client canceled
- canceled_by_helper: helper canceled
- disputed: issue raised requiring review
- refunded: money returned fully or partially
- closed: final terminal state after completion or resolution

---

## 4. Payment Lifecycle

### States
- unpaid
- authorized
- paid
- failed
- refunded
- partially_refunded

---

## 5. Payout Lifecycle

### States
- not_ready
- pending
- paid_out
- held
- reversed

### Meaning
- not_ready: booking not eligible yet
- pending: waiting for payout release
- paid_out: payout completed
- held: payout paused for review or dispute
- reversed: payout reversed if applicable

---

## 6. Helper Verification Lifecycle

### States
- not_started
- pending
- approved
- rejected
- needs_action

### Meaning
- not_started: helper has not submitted verification items
- pending: submitted and awaiting review
- approved: helper is verified for launch scope
- rejected: verification not accepted
- needs_action: helper must resubmit or fix items

---

## 7. Report Lifecycle

### States
- open
- under_review
- action_taken
- dismissed
- closed

---

## 8. User Account Moderation States

### States
- active
- paused
- suspended
- banned

### Meaning
- active: normal usage allowed
- paused: temporarily limited usage
- suspended: access disabled pending review
- banned: permanent removal from platform

---

## 9. Review Eligibility Rule
A review may only be created if:
- booking_status = completed
- payment_status is valid
- no duplicate review from same side already exists

---

## 10. Notification Triggers
Important events that should generate notifications:
- request received
- application received
- application accepted
- booking confirmed
- booking canceled
- payment failed
- booking reminder
- new message
- verification approved
- report update
- payout completed