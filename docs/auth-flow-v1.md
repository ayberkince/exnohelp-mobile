# Auth Flow v1

## Purpose
This document defines how users authenticate into the platform and how the platform manages identity and access.

## Core Principles
- authentication proves identity
- authorization defines what a user can do
- role selection is separate from account creation
- profile completion is separate from authentication
- helper verification is separate from helper signup

---

## 1. Signup Flow

### New user journey
1. user opens landing page or app
2. user clicks sign up
3. user signs up with email/password or approved auth provider
4. platform creates a base user record
5. user is redirected to role selection
6. user chooses:
   - I need support
   - I want to help and earn
7. platform creates role-linked onboarding state
8. user is redirected into onboarding flow

---

## 2. Login Flow
1. user opens login page
2. user authenticates
3. session is created
4. backend checks:
   - role
   - onboarding completion
   - suspension state
   - helper profile status if applicable
5. user is redirected to correct destination

---

## 3. Logout Flow
1. user clicks logout
2. session is destroyed
3. user is redirected to public landing page

---

## 4. Password Reset Flow
1. user clicks forgot password
2. reset email is sent
3. user resets password
4. user returns to login
5. session begins after successful login

---

## 5. Session Rules
A valid session alone is not enough for full product access.

The platform must also check:
- user role
- onboarding status
- account status
- helper verification or helper profile status where relevant

---

## 6. Post-Login Redirect Logic

### If no role selected
redirect to role selection

### If role selected but onboarding incomplete
redirect to onboarding flow

### If client onboarding complete
redirect to client home

### If helper onboarding incomplete
redirect to helper onboarding

### If helper onboarding complete but verification pending
redirect to helper dashboard with verification prompts

### If user suspended
redirect to suspended/review screen

### If admin
redirect to admin dashboard