# Admin And Content Requirements

## Goal

Provide hospital staff with a simple protected admin panel to publish blogs and manage appointment requests without developer involvement.

## Admin Users

Initial assumption:

- Admin users are trusted hospital staff.
- Public self-registration is not allowed.
- Admin accounts are created manually or seeded by the project owner.

## Admin Login

Requirements:

- Secure login for authorized users only
- Clear error messages for invalid credentials
- Logout option
- Protected admin routes
- No public registration unless explicitly approved later

## Dashboard

The dashboard should provide a quick operational summary.

Required dashboard cards:

- Total appointment requests
- New appointment requests
- Published blog posts
- Draft blog posts

Dashboard lists:

- Recent appointment requests
- Recent blog posts

## Appointment Management

Appointment submissions should be visible in the admin panel.

### Appointment Data

Required fields:

- Patient name
- Phone number
- Department or service
- Preferred date
- Submission date
- Status

Optional fields:

- Email
- Preferred time
- Short message or symptoms
- Internal admin notes

### Appointment Statuses

- New
- Contacted
- Confirmed
- Completed
- Cancelled

Default status:

- New

### Admin Actions

Admins should be able to:

- View all appointment submissions
- Search appointments by name or phone number
- Filter by status
- Filter by department or service
- Filter by date
- Open appointment details
- Update appointment status
- Add internal notes
- Delete spam or invalid entries if necessary

### Appointment UX Rules

- Phone number should be easy to copy or tap on supported devices.
- Status should be visible without opening each record.
- New appointments should be visually distinct.
- Admin notes should not be visible publicly.

## Blog Management

Admins should be able to manage public blog content.

### Blog Fields

Required fields:

- Title
- Slug
- Excerpt
- Content
- Category
- Status

Optional fields:

- Featured image
- SEO title
- SEO description
- Author display name
- Published date

### Blog Statuses

- Draft
- Published

### Admin Actions

Admins should be able to:

- Create blog posts
- Edit blog posts
- Save drafts
- Publish posts
- Unpublish posts
- Delete posts
- Upload or select a featured image
- Add category
- Add SEO metadata

### Blog Editor Requirements

Minimum editor capability:

- Title
- Excerpt
- Category
- Featured image
- Rich text or Markdown content
- Draft and publish actions

Preferred editor capability:

- Headings
- Paragraphs
- Lists
- Links
- Images inside content
- Basic formatting

## Public Blog Content Rules

- Published posts are visible publicly.
- Draft posts are visible only to admins.
- Blog slugs should be readable and SEO-friendly.
- Blog pages should show date, category, and readable content.
- Medical content should avoid overpromising and should not replace professional consultation.

## Suggested Blog Categories

- Health Tips
- Hospital Updates
- Awareness
- Preventive Care
- Emergency Guidance
- Mother and Child Care
- General Medicine

## Content Governance

Recommended publishing workflow:

- Admin creates draft.
- Hospital verifies medical accuracy.
- Admin publishes after approval.

Every article should be checked for:

- Medical correctness
- Clear language
- No unsupported claims
- No patient privacy violation
- Correct contact or appointment CTA

## Notifications

Initial requirement:

- Store appointment requests in admin panel.

Possible future enhancements:

- Email notification to hospital staff
- WhatsApp notification
- SMS confirmation to patient
- Admin reminder for uncontacted appointments

These should not block the first version unless specifically required.

## Privacy And Security

- Appointment data is private and must only be visible to authorized admin users.
- Symptoms/messages may contain sensitive health information and should be handled carefully.
- Admin authentication is required before viewing submissions.
- Public pages should never expose appointment data.
- Uploaded images should be validated and stored safely.

## Non-Goals For Initial Admin Panel

- Full hospital CRM
- Doctor calendar synchronization
- Patient portal
- Medical records management
- Billing or payments
- Role-based permissions beyond basic admin access
- Automated diagnosis or medical advice
