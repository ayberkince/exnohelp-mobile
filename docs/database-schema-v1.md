# Database Schema v1

## Purpose
This document defines the core data model for the first real version of the marketplace.

The schema is designed to support:
- two-sided marketplace logic
- requests
- bookings
- messaging
- reviews
- helper verification
- admin moderation
- payments and payouts

---

## 1. User
Represents every account on the platform.

### Core fields
- id
- email
- phone
- password_hash or auth_provider_id
- role (client, helper, admin)
- first_name
- last_name
- profile_photo_url
- preferred_language
- created_at
- updated_at
- is_active
- is_suspended
- suspension_reason
- last_login_at

---

## 2. ClientProfile
Stores client-specific information.

### Fields
- id
- user_id
- emergency_contact_name
- emergency_contact_phone
- default_city
- default_district
- saved_addresses_json or related table
- accessibility_notes
- support_preferences
- created_at
- updated_at

---

## 3. HelperProfile
Stores helper-specific information.

### Fields
- id
- user_id
- bio
- gender
- birth_date optional
- city
- district
- languages_json or related table
- hourly_rate
- transport_mode
- profile_status (draft, pending_verification, active, paused, rejected)
- response_rate
- completion_rate
- average_rating
- review_count
- completed_bookings_count
- is_accepting_requests
- created_at
- updated_at

---

## 4. HelperServiceCategory
Which support categories the helper offers.

### Fields
- id
- helper_profile_id
- category_slug
- is_active

Example categories:
- accompaniment
- waiting_support
- return_home
- paperwork_help
- emotional_companionship
- light_post_appointment_help

---

## 5. HelperAvailability
Stores when helpers are available.

### Fields
- id
- helper_profile_id
- day_of_week
- start_time
- end_time
- timezone
- recurrence_type
- is_active

---

## 6. HelperVerification
Tracks helper verification state.

### Fields
- id
- helper_profile_id
- email_verified
- phone_verified
- id_document_status
- selfie_status
- payout_status
- background_document_status
- reviewed_by_admin_id optional
- review_notes
- submitted_at
- reviewed_at

Possible statuses:
- not_started
- pending
- approved
- rejected
- needs_action

---

## 7. SupportRequest
Represents a client request for help.

### Fields
- id
- client_user_id
- category_slug
- title
- description
- requested_date
- requested_start_time
- requested_end_time
- duration_minutes
- city
- district
- start_location_text
- end_location_text optional
- language_preference
- gender_preference optional
- mobility_notes
- price_offer_type
- offered_total_price
- request_status
- created_at
- updated_at
- expires_at

Possible statuses:
- draft
- open
- matched
- booked
- canceled
- expired
- closed

---

## 8. RequestApplication
Represents helper interest or application to an open request.

### Fields
- id
- support_request_id
- helper_user_id
- application_message
- application_status
- created_at
- updated_at

Possible statuses:
- submitted
- withdrawn
- accepted
- rejected

---

## 9. Booking
Represents a confirmed support session.

### Fields
- id
- support_request_id optional
- client_user_id
- helper_user_id
- category_slug
- booking_source (direct_booking, request_match)
- scheduled_date
- scheduled_start_time
- scheduled_end_time
- duration_minutes
- city
- district
- start_location_text
- end_location_text optional
- booking_notes
- booking_status
- helper_rate
- platform_fee
- total_price
- payment_status
- payout_status
- created_at
- updated_at
- canceled_at optional
- completed_at optional

Possible booking_status values:
- pending_acceptance
- awaiting_payment
- confirmed
- in_progress
- completed
- canceled_by_client
- canceled_by_helper
- disputed
- refunded
- closed

Possible payment_status values:
- unpaid
- authorized
- paid
- failed
- refunded
- partially_refunded

Possible payout_status values:
- not_ready
- pending
- paid_out
- held
- reversed

---

## 10. BookingEvent
Audit trail for booking lifecycle.

### Fields
- id
- booking_id
- actor_user_id optional
- actor_role
- event_type
- event_payload_json
- created_at

Examples:
- booking_created
- booking_accepted
- payment_received
- booking_canceled
- booking_completed
- dispute_opened
- refund_issued

---

## 11. Conversation
Chat container linked to a booking.

### Fields
- id
- booking_id
- client_user_id
- helper_user_id
- conversation_status
- created_at
- updated_at

---

## 12. Message
Chat message entity.

### Fields
- id
- conversation_id
- sender_user_id
- message_type
- body
- attachment_url optional
- is_flagged
- created_at
- read_at optional

Possible message_type:
- text
- system
- attachment

---

## 13. Review
Review left after completed booking.

### Fields
- id
- booking_id
- reviewer_user_id
- reviewee_user_id
- rating
- review_text
- tags_json
- created_at
- is_hidden

---

## 14. Report
User-generated trust and safety report.

### Fields
- id
- reporter_user_id
- reported_user_id optional
- booking_id optional
- conversation_id optional
- report_type
- description
- evidence_url optional
- report_status
- priority
- created_at
- reviewed_at optional
- reviewed_by_admin_id optional

Possible report_type:
- no_show
- unsafe_behavior
- harassment
- boundary_violation
- off_platform_payment
- fraud
- inappropriate_message
- other

Possible report_status:
- open
- under_review
- action_taken
- dismissed
- closed

---

## 15. Payment
Represents payment records.

### Fields
- id
- booking_id
- payer_user_id
- stripe_payment_intent_id optional
- amount_total
- platform_fee
- helper_amount
- currency
- payment_status
- created_at
- updated_at

---

## 16. Payout
Represents payout to helper.

### Fields
- id
- booking_id
- helper_user_id
- stripe_transfer_id optional
- payout_amount
- payout_status
- initiated_at
- completed_at optional
- failure_reason optional

---

## 17. Notification
Represents in-app or email notification records.

### Fields
- id
- user_id
- notification_type
- title
- body
- link_url optional
- is_read
- created_at

---

## 18. AdminAction
Tracks important moderation/admin actions.

### Fields
- id
- admin_user_id
- target_user_id optional
- target_booking_id optional
- target_report_id optional
- action_type
- action_notes
- created_at

Examples:
- approve_verification
- reject_verification
- suspend_user
- refund_booking
- close_report