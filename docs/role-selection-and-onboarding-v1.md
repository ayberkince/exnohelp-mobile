# Role Selection and Onboarding v1

## Purpose
This document defines how a newly authenticated user becomes a platform participant.

## Core Principle
Authentication creates a user account.
Role selection determines platform path.
Onboarding prepares the user for marketplace participation.

---

## 1. Role Options
Every new non-admin user must choose one primary role:

- client
- helper

Admins are created internally, not through public signup.

---

## 2. Client Onboarding Steps
A client must complete:

1. basic profile setup
   - first name
   - last name
   - profile image optional
   - language
   - city/district

2. support preferences
   - preferred language
   - accessibility notes optional
   - support preferences optional

3. emergency contact
   - contact name
   - contact phone

4. acceptance of:
   - platform terms
   - privacy policy
   - non-medical support boundaries

### Client onboarding completion condition
A client is onboarding-complete when required profile, emergency contact, and acceptance steps are finished.

---

## 3. Helper Onboarding Steps
A helper must complete:

1. basic profile setup
   - first name
   - last name
   - profile image
   - language(s)
   - city/district

2. helper profile setup
   - bio
   - support categories
   - hourly rate
   - transport mode
   - availability

3. helper rules acceptance
   - prohibited tasks
   - non-medical support policy
   - platform behavior rules

4. verification submission flow
   - email verified
   - phone verified
   - ID upload
   - payout setup
   - optional background document field

### Helper onboarding completion condition
A helper is onboarding-complete when basic helper profile and mandatory rules acceptance are complete.

Verification approval is not required for onboarding completion, but it is required for certain marketplace actions.

---

## 4. Role Change Policy
For v1, role switching should be limited.

Recommended v1 rule:
- one primary role per account
- no instant switching between client and helper in same dashboard
- future expansion may support dual-role accounts

This keeps logic cleaner for launch.

---

## 5. Onboarding Progress Model
Each onboarding flow should have explicit progress status:
- not_started
- in_progress
- complete

This status should be stored in the database and checked on login.