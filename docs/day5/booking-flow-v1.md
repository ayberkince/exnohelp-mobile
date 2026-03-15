# Booking Flow v1

## Purpose
This document defines the booking flow from the moment of selection to a confirmed booking.

The booking flow must feel:
- simple
- safe
- transparent
- calm
- trustworthy

---

## Two Booking Paths

### Path A — Client direct booking
1. client browses helpers
2. client opens helper profile
3. client taps book
4. client chooses category, date/time, location, and notes
5. client reviews summary
6. client confirms and pays
7. booking enters confirmation flow

### Path B — Request marketplace booking
1. client publishes request
2. helper applies
3. client reviews applicant/helper
4. client selects helper
5. booking summary appears
6. client confirms and pays
7. booking becomes confirmed

---

## Booking Summary Requirements
Before final confirmation, the user must see:
- helper name
- service category
- date/time
- location
- duration
- total price
- platform fee if shown
- cancellation summary
- trust and safety reminder
- prohibited-task reminder

---

## Payment Timing
Recommended v1:
- payment occurs before final booking confirmation
- booking should not be fully confirmed without valid payment state

This protects both marketplace trust and operations.

---

## Confirmed Booking State
A confirmed booking should include:
- status
- booking ID
- helper summary
- date/time
- location
- chat access
- cancellation path
- safety center shortcut

---

## After Confirmation
Both users should receive:
- booking confirmation UI
- email notification
- in-app notification
- chat access
- calendar-ready summary later if added

---

## Booking UX Rules
- never hide the total price
- never hide the non-medical boundary
- show who is booked, what is booked, when, and where in one clear summary
- do not overload the flow with unnecessary form steps