# Booking State Transition Plan v1
- **Path:** Pending -> (Awaiting Payment) -> Confirmed -> In Progress -> Completed -> Closed.
- **Rule:** No "jumping" states. Every transition must be valid according to the lib/booking-state logic.
