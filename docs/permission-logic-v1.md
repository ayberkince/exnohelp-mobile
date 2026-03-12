# Permission Logic v1

## Purpose
This document defines authorization rules for important product actions.

Authentication alone does not grant full permission.

---

## 1. Client Permissions

### A client can:
- create support requests
- browse helpers
- create direct bookings
- pay for bookings
- send chat messages in their own conversations
- cancel bookings according to policy
- leave reviews after completed bookings
- report helpers, messages, and bookings

### A client cannot:
- access helper-only actions
- access admin routes
- approve verification
- modify other users’ bookings
- bypass payment flow

---

## 2. Helper Permissions

### A helper can:
- create and update helper profile
- set availability
- browse open requests
- apply to requests
- accept eligible bookings
- send chat messages in their own conversations
- view own earnings
- report clients, messages, and bookings

### A helper cannot:
- access admin routes
- verify themselves
- accept bookings if verification requirements are not met
- perform prohibited service categories
- modify payout records directly

---

## 3. Admin Permissions

### An admin can:
- approve or reject verification
- review reports
- suspend users
- view all bookings
- review incidents
- support refund workflows
- log moderation actions

### An admin cannot:
- operate without action logging
- silently override financial logic without audit trace

---

## 4. Booking Permissions

### Booking creation
Allowed for:
- authenticated client with completed required onboarding

### Booking acceptance
Allowed for:
- helper with required profile completion
- helper with required verification level
- helper with active account status

### Booking cancellation
Allowed for:
- involved client
- involved helper
- admin under support/moderation rules

### Booking completion marking
Should be controlled by:
- structured completion logic
- optionally one party action + system confirmation
- admin override if dispute occurs

---

## 5. Messaging Permissions
A user may only send messages if:
- conversation exists
- they are participant in the conversation
- booking/conversation is active enough to allow chat
- account is not suspended

---

## 6. Review Permissions
A user may leave a review only if:
- they participated in the booking
- booking status = completed
- review not already submitted for that side

---

## 7. Report Permissions
Any authenticated non-suspended user may:
- report another user involved in a booking or conversation
- report a booking
- report a message