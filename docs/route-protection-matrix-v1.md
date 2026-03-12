# Route Protection Matrix v1

## Purpose
This document defines which routes are public, authenticated, role-restricted, or admin-only.

---

## 1. Public Routes
Accessible without login:
- /
- /about
- /how-it-works
- /for-clients
- /for-helpers
- /trust-safety (public informational version if desired)
- /login
- /signup
- /forgot-password
- /reset-password

---

## 2. Authenticated Shared Routes
Accessible only to logged-in users:
- /onboarding
- /messages (if shared route structure is used)
- /settings
- /notifications
- /support
- /account/review-state

---

## 3. Client-Only Routes
Accessible only if:
- authenticated
- role = client
- onboarding complete where required

Routes:
- /client
- /client/search
- /client/helper/[id]
- /client/book/[id]
- /client/bookings

---

## 4. Helper-Only Routes
Accessible only if:
- authenticated
- role = helper
- onboarding complete where required

Routes:
- /helper
- /helper/requests
- /helper/requests/[id]
- /helper/earnings
- /helper/profile
- /helper/availability
- /helper/verification

---

## 5. Admin-Only Routes
Accessible only if:
- authenticated
- role = admin

Routes:
- /admin
- /admin/verifications
- /admin/reports
- /admin/bookings
- /admin/users
- /admin/incidents
- /admin/refunds

---

## 6. Helper Verification Gating
A helper may access helper dashboard routes before full verification approval.
However, helper action permissions may be limited.

Recommended v1:
- helper can view dashboard and onboarding state
- helper can edit profile
- helper can submit verification
- helper cannot accept paid bookings unless required verification conditions are met

---

## 7. Suspended User Gating
Suspended users should not access normal product routes.
They should be redirected to:
- /account/review-state