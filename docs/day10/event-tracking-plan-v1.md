# Event Tracking Plan v1

## Purpose
This document defines the important product events that should be tracked.

The goal is not to track everything.
The goal is to track events that explain user movement and marketplace health.

---

## 1. Account and Auth Events
- signup_started
- signup_completed
- login_completed
- role_selected
- onboarding_started
- onboarding_completed

---

## 2. Client Events
- client_profile_completed
- support_request_started
- support_request_published
- helper_search_opened
- helper_profile_viewed
- booking_started
- booking_summary_viewed
- payment_started
- payment_succeeded
- payment_failed
- booking_confirmed
- booking_canceled
- booking_completed
- review_submitted

---

## 3. Helper Events
- helper_profile_started
- helper_profile_completed
- helper_availability_set
- helper_verification_started
- helper_verification_submitted
- helper_verification_approved
- requests_feed_opened
- request_detail_viewed
- request_application_submitted
- booking_accepted
- booking_completed_by_helper
- payout_viewed

---

## 4. Chat and Communication Events
- conversation_created
- message_sent
- notification_opened
- reminder_delivered

---

## 5. Trust and Safety Events
- report_submitted
- report_review_started
- report_action_taken
- warning_issued
- account_paused
- account_suspended
- payout_held

---

## 6. Financial Events
- refund_requested
- refund_approved
- refund_completed
- payout_released

---

## Event Design Rule
Each event should include useful properties where appropriate, such as:
- role
- category
- city/district
- booking source
- verification state
- request status
