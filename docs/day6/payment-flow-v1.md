# Payment Flow v1

## Purpose
This document defines how client payment works.

The payment flow must be:
- secure
- transparent
- tied to booking state
- easy to support operationally

---

## 1. Payment Principle
A booking should not become fully confirmed until valid payment is recorded.

---

## 2. Payment Flow
### Direct booking path
1. client selects helper
2. client enters booking details
3. booking summary is shown
4. client sees full price breakdown
5. client enters payment flow
6. payment is processed
7. if successful, booking becomes confirmed
8. client and helper receive confirmation

### Request-based path
1. client selects helper from applicants
2. booking summary is shown
3. payment is processed
4. booking becomes confirmed

---

## 3. Payment States
A booking payment may be:
- unpaid
- authorized
- paid
- failed
- refunded
- partially_refunded

---

## 4. Failure Handling
If payment fails:
- booking must not become fully confirmed
- client should see clear retry path
- helper should not be told final booking is confirmed until valid payment exists

---

## 5. Checkout Requirements
Checkout page must show:
- helper name
- service category
- date/time
- duration
- helper subtotal
- platform fee
- total
- cancellation summary
- trust reminder
- non-medical support reminder

---

## 6. Trust Rule
The payment screen must reinforce:
- pay only inside the platform
- do not use off-platform cash arrangements
- support is protected through platform flow

---

## 7. Manual Support Principle
In v1, payment issues may still require manual support intervention.
That is acceptable as long as payment state remains system-controlled.