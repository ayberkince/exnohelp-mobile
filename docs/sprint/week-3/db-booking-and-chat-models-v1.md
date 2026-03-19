# DB Booking and Chat Models v1
- **Booking:** Links Client/Helper/Request. Tracks date, time, status, and price.
- **BookingEvent:** Audit log for status changes (e.g., 'confirmed' -> 'canceled').
- **Conversation:** Grouping for messages, strictly linked to a single Booking.
- **Message:** The text/system payloads within a conversation.
