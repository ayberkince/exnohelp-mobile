# DB Marketplace Models v1
- **ClientProfile:** Language, District, Emergency Contacts, Accessibility Notes.
- **HelperProfile:** Bio, Photo, Hourly Rate, Completed Bookings, Verification Status.
- **HelperServiceCategory:** Mapping helpers to slugs like 'accompaniment' or 'waiting-support'.
- **HelperAvailability:** Weekly schedule (day_of_week, start_time, end_time).
- **SupportRequest:** The core "Job" object (category, title, location, requested_date, status).
