# Search, Filter, Sort v1

## Purpose
This document defines how clients search helpers and how helpers search requests.

---

## 1. Client -> Helper Search

### Search dimensions
- category
- district / area
- language
- price range
- verification level
- availability
- rating

### Sort options
- recommended
- highest rated
- nearest / same district
- lowest price
- most experienced

---

## 2. Helper -> Request Search

### Search dimensions
- category
- district / area
- language preference
- date
- time
- duration
- price

### Sort options
- newest
- nearest
- best fit
- highest pay
- soonest date

---

## 3. Filtering Principles
- filters should be fast and mobile-friendly
- avoid too many advanced controls in v1
- expose only the filters that improve matching quality