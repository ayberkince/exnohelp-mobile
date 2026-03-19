# Middleware Plan v1
## The Bouncer Logic
1. Guest? Allow Home, Login, Signup. Redirect others to Login.
2. Logged in but no Role? Force /onboarding/role-selection.
3. Logged in but Onboarding Incomplete? Force /onboarding/[role].
4. Logged in and Suspended? Force /account/review-state.
5. Logged in and trying to access Admin? Check role === ADMIN.
