# Deployment Workflow v1
## Flow
Local Dev -> Staging Push -> Staging QA -> Production Release.

## Testing Focus
Any change to Auth, Booking, or Payments MUST be tested in Staging first.

## Post-Deploy
Verify critical path: Can a user still book? Can they still pay?
