# User Status Gating v1

## Purpose
This document defines how account status and onboarding state affect product access.

---

## 1. Account Status Types
- active
- paused
- suspended
- banned

### active
Normal usage allowed.

### paused
User can log in but some actions are restricted.

### suspended
User may log in only to review-state/support screens.

### banned
Access removed entirely according to policy.

---

## 2. Client Gating Rules

### If client onboarding incomplete
redirect to onboarding

### If client active and onboarding complete
full client access

### If client suspended
redirect to review-state screen

---

## 3. Helper Gating Rules

### If helper onboarding incomplete
redirect to helper onboarding

### If helper onboarding complete but verification incomplete
allow:
- dashboard
- profile editing
- verification submission

restrict:
- accepting bookings if verification is mandatory for launch

### If helper verified and active
full helper access

### If helper suspended
redirect to review-state screen

---

## 4. Admin Gating Rules
Only admin-role users may access admin routes.

---

## 5. Review-State Screen Requirements
If a user is suspended or under review, the screen should show:
- that access is restricted
- that the account is under review or limited
- support contact path
- next expected step if appropriate