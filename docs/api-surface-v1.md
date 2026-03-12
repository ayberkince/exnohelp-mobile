# API Surface v1

## Purpose
This document lists the key backend actions required by the first real version of the platform.

The exact implementation may use:
- route handlers
- server actions
- service-layer functions

---

## Auth / User
- createUser
- updateUserProfile
- selectUserRole
- suspendUser
- reactivateUser

## Client
- createClientProfile
- updateClientProfile
- createSupportRequest
- updateSupportRequest
- cancelSupportRequest
- listClientBookings
- leaveReview

## Helper
- createHelperProfile
- updateHelperProfile
- updateHelperAvailability
- submitVerification
- listOpenRequests
- applyToRequest
- acceptBooking
- listHelperBookings
- getHelperEarningsSummary

## Marketplace / Booking
- createDirectBooking
- convertRequestToBooking
- cancelBooking
- markBookingInProgress
- markBookingCompleted
- openBookingDispute

## Chat
- createConversation
- sendMessage
- listMessages
- reportMessage

## Trust and Safety
- createReport
- blockUser
- listUserReports

## Admin
- listPendingVerifications
- approveVerification
- rejectVerification
- listOpenReports
- reviewReport
- suspendPlatformUser
- issueRefund
- listBookingsForAdmin

## Payments
- createCheckoutSession or payment intent
- handlePaymentWebhook
- createPayoutRecord
- releasePayout
- holdPayout