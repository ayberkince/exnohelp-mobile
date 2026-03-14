# Profile Completion Rules v1

## Purpose
This document defines how profile completion is calculated for clients and helpers.

Profile completion serves 3 functions:
- improves UX guidance
- increases marketplace quality
- helps trust and conversion

---

## 1. Client Completion Rules

### Required for onboarding completion
- first name
- last name
- preferred language
- city
- district
- emergency contact name
- emergency contact phone
- policy acceptance

### Optional but valuable
- profile image
- accessibility notes
- support preferences
- saved addresses

### Client profile statuses
- not_started
- in_progress
- complete

---

## 2. Helper Completion Rules

### Required for onboarding completion
- first name
- last name
- profile photo
- city
- district
- at least one language
- short bio
- at least one service category
- hourly rate
- basic availability
- policy acceptance

### Optional but valuable
- transport mode
- extended bio
- experience note
- additional languages
- public profile polish

### Helper verification is separate
Helper profile completion does not equal verification approval.

### Helper profile statuses
- not_started
- in_progress
- complete

### Helper marketplace readiness states
- onboarding_incomplete
- onboarding_complete_verification_pending
- active_verified
- paused
- suspended

---

## 3. Completion Percentage Logic
For UX purposes, the platform may display a completion percentage.

### Client example
- required items weighted heavily
- optional items weighted lightly

### Helper example
- trust-driving items weighted heavily
- profile photo, bio, categories, availability, and verification prompt should have strong weight

The purpose is guidance, not vanity.