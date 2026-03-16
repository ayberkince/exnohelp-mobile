# Operator Workflows v1

## Purpose
This document defines the key internal workflows for running the platform.

---

## 1. Helper Verification Workflow
1. helper submits verification
2. submission enters pending queue
3. operator reviews profile and documents
4. operator chooses:
   - approve
   - reject
   - needs action
5. action is logged
6. helper is notified

---

## 2. Report Review Workflow
1. report enters queue
2. operator reviews report details
3. operator checks linked user, booking, and message context
4. severity is assigned
5. action is chosen
6. action is logged
7. report is updated and closed or monitored further

---

## 3. Booking Issue Workflow
1. booking issue is reported or detected
2. operator reviews booking state
3. operator checks payment, payout, and chat context
4. operator decides:
   - no action
   - user contact
   - payout hold
   - refund review
   - account action
5. outcome is logged

---

## 4. Refund Review Workflow
1. refund request enters queue
2. operator checks cancellation timing, dispute status, and booking history
3. operator decides:
   - deny
   - partial refund
   - full refund
4. financial action is executed
5. action is logged
6. user is notified

---

## 5. Suspension Workflow
1. operator identifies serious or repeated issue
2. operator reviews report history and reliability pattern
3. operator decides enforcement level
4. account action is applied
5. action is logged
6. user sees review-state screen if applicable
