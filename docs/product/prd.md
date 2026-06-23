# Product Requirements Document

## Product

Shree Shivaya Hospital public website with blog publishing and appointment request management.

## Goal

Create a modern, trustworthy, and easy-to-use hospital website that helps patients quickly understand available care, evaluate trust, and request appointments. The site should also support health education through a dedicated blog and allow hospital staff to manage blog posts and appointment requests through an admin panel.

## Capability Statement

Patients and families can discover Shree Shivaya Hospital, review services, facilities, doctors, amenities, health articles, and submit appointment requests. Hospital admins can publish blog content and manage appointment submissions from a protected admin area.

## Primary Objectives

- Build immediate trust through professional visuals, clear messaging, real services, facilities, staff information, and patient-focused copy.
- Make appointment booking visible, simple, and low-friction.
- Provide a dedicated blog experience for health education, hospital updates, and SEO.
- Provide a protected admin panel for blog publishing and appointment management.
- Deliver an experience that feels premium, calm, local, credible, and mobile-friendly.

## Target Users

### Patients

People looking for hospital services, doctors, facilities, timings, contact details, or appointments.

### Patient Family Members

Visitors evaluating trust, safety, emergency support, facilities, and quality of care for someone else.

### Hospital Admin Staff

Internal users who publish blog posts and manage appointment form submissions.

### Local Search Visitors

People arriving from Google search for hospital, emergency care, specialty, health tips, or local healthcare queries.

## Required Pages

- Landing page
- Blog listing page
- Blog detail page
- Appointment form experience
- Admin login page
- Admin dashboard
- Blog management views
- Appointment management views

## Landing Page Requirements

### Hero

The hero must make the hospital feel established, trustworthy, modern, and accessible.

Required content:

- Hospital name: Shree Shivaya Hospital
- Strong patient-focused headline
- Short supporting text about compassionate care, experienced staff, and modern facilities
- Primary CTA: Book Appointment
- Secondary CTA: Call Now or Explore Services
- Large hospital, facility, or healthcare image
- Trust indicators such as emergency care, experienced doctors, patient-first care, clean facilities, or 24/7 support if verified

Suggested headline options:

- Trusted Care for Every Stage of Life
- Modern Healthcare with Compassion at Its Core
- Your Health, Our Priority at Shree Shivaya Hospital

### About

The about section should explain the hospital's values and care promise.

Required themes:

- Patient-first care
- Experienced doctors and trained staff
- Clean and comfortable facilities
- Ethical, transparent, accessible healthcare
- Local community trust

### Services

The site must show core hospital services using clear, patient-friendly cards.

Potential services to confirm:

- Emergency Care
- General Medicine
- Surgery
- Maternity Care
- Pediatrics
- Orthopedics
- Diagnostics
- ICU or Critical Care
- Pharmacy
- Outpatient Consultation

Each service card should include:

- Service name
- Short patient-friendly description
- Icon or image
- Optional CTA

### Facilities And Amenities

Facilities should be visually prominent and image-led.

Potential facilities to confirm:

- 24/7 Emergency Support
- Ambulance Service
- Patient Rooms
- Operation Theatre
- ICU or NICU
- In-house Pharmacy
- Diagnostic Lab
- Digital X-Ray or Imaging
- Waiting Area
- Parking
- Clean and Hygienic Environment

Each facility card should include:

- Facility name
- Image
- One-line patient benefit
- Optional badge such as 24/7, Emergency, Patient Care, Diagnostics, or Comfort

### Doctors And Staff

The site should introduce doctors and key staff to build trust.

Each profile should include:

- Name
- Role or specialization
- Qualification
- Experience
- Photo
- Consultation availability if applicable

If complete staff data is unavailable at launch, start with featured doctors and expand later.

### Why Choose Us

This section should clearly explain why patients should choose the hospital.

Suggested points:

- Experienced medical professionals
- Patient-first approach
- Modern facilities
- Emergency support
- Transparent communication
- Clean and comfortable care environment
- Easy appointment booking

### Testimonials

Testimonials should only use approved real patient or family feedback.

Each testimonial should include:

- Patient name, initials, or approved display name
- Short quote
- Optional treatment or service category
- Optional rating

If verified testimonials are unavailable, this section should be omitted or replaced with a non-testimonial trust section.

### Contact

The site must make contact details easy to find.

Required content:

- Phone number
- Address
- Map or map link
- Opening hours
- Emergency contact if applicable
- Appointment CTA

## Appointment Form Requirements

The appointment form should be small, clear, and low-friction.

Required fields:

- Patient name
- Phone number
- Department or service
- Preferred date

Optional fields:

- Email
- Preferred time
- Short message or symptoms

Consent:

- Include a consent checkbox allowing the hospital to contact the patient about the appointment request.

Submission behavior:

- Show a clear success message after submission.
- Store the request for admin review.
- Mark new submissions as New by default.
- Do not expose appointment data publicly.

## Blog Requirements

### Blog Listing

The blog listing page should support health education, hospital updates, and SEO.

Required features:

- Blog cards
- Category filtering
- Search
- Featured or latest posts
- Responsive layout
- Readable typography

Suggested categories:

- Health Tips
- Hospital Updates
- Awareness
- Preventive Care
- Emergency Guidance
- Mother and Child Care
- General Medicine

### Blog Detail

Each blog detail page should include:

- Title
- Featured image
- Author or admin name
- Published date
- Category
- Reading time
- Main content
- Related posts
- Appointment CTA

## Admin Panel Requirements

Admin capabilities are detailed in [Admin and Content Requirements](./admin-and-content.md).

## SEO Requirements

- SEO-friendly blog URLs
- Metadata for public pages
- Open Graph title, description, and image
- Local hospital keywords
- Fast page loading
- Correct heading hierarchy
- Image alt text
- Hospital or medical organization schema if feasible

Suggested SEO focus areas:

- Shree Shivaya Hospital
- Hospital near me
- Emergency hospital
- Doctor consultation
- Healthcare services
- Local specialty keywords once services are confirmed

## Accessibility Requirements

- High color contrast
- Keyboard-friendly navigation
- Proper form labels
- Clear validation and error messages
- Alt text for images
- Readable font sizes
- Touch-friendly buttons and form controls

## Performance Requirements

- Fast loading on mobile networks
- Optimized images
- Lazy loading for below-fold images
- Minimal unnecessary animation
- Fast blog page rendering
- Responsive admin interactions

## Security Requirements

- Admin panel protected by authentication
- Appointment data must not be publicly exposed
- Validate appointment and blog inputs
- Protect against spam submissions where practical
- Secure handling of uploaded blog images
- No public admin registration unless explicitly approved later

## Non-Goals For Initial Launch

- Online payments
- Patient medical records
- Doctor scheduling system with real-time availability
- Patient login portal
- Telemedicine/video consultation
- Multi-branch hospital marketplace features
- Public user comments on blogs

## Success Metrics

- Visitors can find appointment CTA within a few seconds.
- Appointment request completion is simple on mobile.
- Admin can publish a blog without developer help.
- Admin can view and update appointment statuses.
- Website loads quickly on common mobile connections.
- Public pages communicate trust without feeling cluttered.
