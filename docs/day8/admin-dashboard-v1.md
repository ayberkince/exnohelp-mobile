# Admin Dashboard v1

## Purpose
This document defines the first internal dashboard for platform operators.
The admin dashboard is the operational control center of the marketplace.

It must support:
- safety
- verification
- booking health
- support
- refund and payout review
- user oversight

---

## Core Admin Dashboard Sections

### 1. Overview
A top-level operational summary showing:
- total active bookings
- bookings needing attention
- open reports
- pending verifications
- payout holds
- recent support issues

### 2. Verification Queue
A queue of helpers needing review.

Each row should show:
- helper name
- submission date
- verification status
- missing items
- quick action buttons

### 3. Reports Queue
A queue of reports waiting for review.

Each row should show:
- report type
- severity
- involved users
- linked booking
- current status
- assigned reviewer if applicable

### 4. Booking Monitor
A list of current and recent bookings.

Useful columns:
- booking ID
- client
- helper
- scheduled time
- booking status
- payment status
- payout status
- issue flag

### 5. Refund / Financial Review Queue
A list of bookings where money movement may need manual action.

Useful columns:
- booking ID
- refund status
- payment status
- payout status
- reason for review

### 6. User Management
A searchable user list with:
- role
- status
- verification state
- reliability indicators
- suspension state

### 7. Incident / Support Queue
A place where support and incident tickets can be reviewed.

---

## Admin Dashboard Rule
The dashboard should prioritize queues and actionability over visual decoration.
