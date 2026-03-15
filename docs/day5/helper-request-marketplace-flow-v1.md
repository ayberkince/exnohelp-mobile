# Helper Request Marketplace Flow v1

## Purpose
This document defines how helpers browse open client requests and accept/apply to them.

This marketplace feed is essential for supply-side liquidity.

---

## Core Goal
A helper should be able to quickly find open requests that match:
- their availability
- location
- language
- service categories
- earning preferences

---

## Entry Points
A helper can access open requests from:
- helper dashboard
- requests tab
- recommended requests section
- notification-driven re-entry

---

## Open Request Feed
Each request card should display:
- service category
- short title
- date
- time
- district / area
- language preference
- duration
- offered price or pricing indicator
- short summary
- request freshness / status

### UX goal
Request cards should be fast to scan and easy to compare.

---

## Request Detail Page
The request detail page should show:
- category
- date and time
- meeting location
- end location if relevant
- description
- language preference
- mobility notes if relevant
- offered compensation
- non-medical support reminder
- CTA to apply / accept

---

## Action Model
For v1, choose one of these two:
- simple accept flow
- application flow

### Recommended v1 approach
Use a simple `apply / express interest` model for request marketplace.
This keeps client choice intact and feels safer.

---

## Helper Flow
1. helper opens requests feed
2. helper filters or browses requests
3. helper opens detail page
4. helper applies / expresses interest
5. client selects helper
6. request converts into booking flow

---

## Trust Rule
Helpers should always see visible reminders that requests fall under non-medical support only.