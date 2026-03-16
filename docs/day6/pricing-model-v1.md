# Pricing Model v1

## Purpose
This document defines how pricing works in the first version of the marketplace.

The pricing model must be:
- simple
- understandable
- transparent
- easy to implement
- sustainable for operations

---

## 1. Core Model
The platform uses a per-booking commission model.

### Client pays
- helper amount
- platform fee

### Helper receives
- helper amount minus no hidden deductions beyond clearly disclosed platform rules

### Platform earns
- platform fee

---

## 2. Pricing Structure
Each booking should display:
- helper rate
- duration
- helper subtotal
- platform fee
- total client price

### Example
- Helper rate: €18/hour
- Duration: 2 hours
- Helper subtotal: €36
- Platform fee: €6
- Total client price: €42

---

## 3. Recommended v1 Pricing Logic
Use simple pricing logic:
- hourly helper rate
- minimum booking duration or minimum booking value
- fixed or semi-fixed platform fee logic

### Recommended approach
Keep the platform fee easy to understand.
Example structure:
- percentage fee
or
- fixed booking fee
or
- hybrid small fixed fee + percentage

For v1, simplicity is more important than pricing perfection.

---

## 4. Visibility Rule
The user must always see:
- how much the helper earns
- how much the total costs
- what the platform fee is

No hidden price logic.

---

## 5. Helper Rate Logic
For v1:
- helper sets a base hourly rate within allowed range
- platform may later apply category-based constraints
- admin may review unusually low or high values manually

---

## 6. Minimum Booking Logic
For v1, it is recommended to set:
- minimum booking duration
or
- minimum booking total

This prevents unprofitable micro-bookings.

---

## 7. v1 Simplicity Rule
Do not add:
- surge pricing
- complex dynamic pricing
- subscription-based pricing
- promotional discounts engine
- coupon system
- loyalty discounts

Those can come later.