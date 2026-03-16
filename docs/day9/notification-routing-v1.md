# Notification Routing v1

## Purpose
This document defines which events go to which channels.

---

## In-App + Email
- booking confirmed
- booking canceled
- payment successful
- payment failed
- payout completed
- payout held
- account under review
- verification approved
- verification rejected / needs action
- refund decision

---

## In-App Preferred
- new message
- new request available
- new application on request
- review reminder
- profile completion reminder

---

## Email Preferred
- password reset
- email verification
- important account state change

---

## No Notification or Internal Only
- low-level admin actions not relevant to user
- internal moderation notes
- silent analytics events
