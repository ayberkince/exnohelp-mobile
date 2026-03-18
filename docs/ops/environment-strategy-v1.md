# Environment Strategy v1
## Purpose
Separate development work from real production usage to prevent "oops" moments.

## Environments
1. **Local:** Fast iteration, mock data, sandbox payments.
2. **Staging:** release-candidate testing, separate DB, identical to production.
3. **Production:** Real users, real money, real monitoring.

## Rule
No production secrets or user data ever enter Local or Staging.
