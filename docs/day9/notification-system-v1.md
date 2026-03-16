# Notification System v1

## Purpose
This document defines the platform notification system.

The notification system exists to:
- confirm important actions
- reduce user uncertainty
- improve booking reliability
- reduce missed actions
- support re-engagement

---

## Core Notification Types

### Account / Access Notifications
- signup success
- onboarding incomplete reminder
- verification approved
- verification rejected
- account under review
- account restored

### Marketplace Notifications
- new request available for helper
- new application on request for client
- helper selected for request
- booking confirmed
- booking canceled
- new message in conversation

### Financial Notifications
- payment successful
- payment failed
- refund under review
- refund completed
- payout pending
- payout completed
- payout held

### Trust and Safety Notifications
- report received
- report status updated
- warning issued
- account restricted
- support response ready

### Lifecycle / Engagement Notifications
- complete your profile
- finish verification
- complete your first booking
- come back and browse requests
- rebook with confidence

---

## Notification Channels
Available channels in v1:
- in-app notifications
- email notifications

Push notifications can be added later.

---

## System Rule
The system should prioritize certainty over noise.
Only meaningful events should trigger user-facing notifications.
