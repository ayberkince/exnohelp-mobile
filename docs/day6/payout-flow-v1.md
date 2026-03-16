# Payout Flow v1

## Purpose
This document defines how helpers receive payout after completed bookings.

The payout flow must balance:
- helper trust
- dispute protection
- operational simplicity
- platform control

---

## 1. Payout Principle
Helpers are paid after a booking is completed and after the platform determines the payout is eligible for release.

---

## 2. Recommended v1 Payout Sequence
1. booking is confirmed
2. booking takes place
3. booking is marked completed
4. short review / issue window passes
5. if no issue blocks payout, payout becomes eligible
6. payout is released to helper

---

## 3. Payout Statuses
- not_ready
- pending
- paid_out
- held
- reversed

---

## 4. Why Payout Hold Exists
Payout may be held if:
- booking is disputed
- serious report is filed
- fraud signal appears
- support review is required
- payment was refunded or reversed

---

## 5. Payout Visibility for Helpers
Helpers should be able to see:
- expected earnings
- pending payouts
- completed payouts
- held payouts
- payout dates where possible

---

## 6. v1 Simplicity Rule
In the first version:
- do not build a complex accounting engine
- do build clear payout statuses
- do keep admin control over payout exceptions

---

## 7. Platform Trust Rule
Helpers should clearly understand:
- when payout is expected
- why payout may be delayed
- what completed means
- what happens if a dispute occurs