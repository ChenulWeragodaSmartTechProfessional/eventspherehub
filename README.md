# EventSphere

## School Competition and Events Platform

EventSphere is a digital platform for organizing and discovering school competitions, academic exhibitions, sports tournaments, cultural programmes, clubs, and workshops.

The platform gives students, teachers, parents, and school administrators one reliable place to view upcoming activities, follow the school calendar, and coordinate campus events.

## Purpose

School announcements are often spread across noticeboards, messaging groups, and informal conversations. EventSphere brings those activities together in a searchable, real-time event hub so that the school community can:

- Discover competitions and activities in one place
- View dates, times, locations, descriptions, and event images
- Search and filter events by category
- Access a shared school calendar
- Use role-specific dashboards for different community needs
- Allow teachers to request additional administrative access

## Key Features

- Real-time event data powered by Cloud Firestore
- Event discovery page with search and category filters
- Featured event cards with image support
- Responsive home page and mobile navigation
- Interactive school calendar
- Email/password and Google authentication
- Student, teacher, and parent account roles
- Personalized dashboard after sign-in
- Teacher admin-privilege request by email
- Administrator dashboard for event management
- Live registered-user and published-event metrics

## User Roles

Each account has a role stored in the Firestore document `users/{uid}`.

### Student

Students can browse competitions, explore school activities, and open the calendar to plan their participation.

### Teacher

Teachers can browse the school schedule and request administrative privileges from the configured administrator when they need to publish or manage events.

### Parent

Parents can follow upcoming school activities and use the calendar to stay informed about important school dates.

### Administrator

Administrators use `admin.html` to publish, edit, and delete events, review event images, and monitor user and event totals.

After successful email or Google authentication, users are redirected to the dashboard at `pages/dashboard.html`. The dashboard uses the saved Firestore role to display the appropriate experience.

## Event Categories

- Academic
- Sports
- Cultural
- Clubs
- Workshops

## Project Structure

```text
index.html              Public home page
admin.html              Administrator event and metrics dashboard
pages/events.html       Event discovery and filtering
pages/calendar.html     School calendar
pages/dashboard.html    Authenticated role dashboard
pages/login.html        Sign-in page
pages/register.html     Account registration
js/                     Firebase integration and page behavior
css/                    Shared and page-specific styles
images/                 Logos and favicon assets
```

## Technology

- HTML5
- CSS3
- JavaScript ES modules
- Firebase Authentication
- Cloud Firestore
- Google Authentication

## Firebase Configuration

1. Create or select a Firebase project.
2. Enable the following Authentication providers:
   - Email/password
   - Google
3. Create a Cloud Firestore database.
4. Add the project credentials to `js/firebase-config.js`.
5. Create the `users` and `events` collections.
6. Configure Firestore security rules before deploying the application.

### User Profile Fields

User documents are stored at `users/{uid}` and may contain:

```text
uid
fullName
email
role
createdAt
```

Supported roles are `student`, `teacher`, and `parent`.

### Event Fields

Event documents in the `events` collection may contain:

```text
title
date
category
time
location
imageUrl
description
createdAt
```

## Running Locally

EventSphere uses browser ES modules and Firebase network requests. Run it through a local web server instead of opening the HTML files directly with `file://`.

Using Python:

```powershell
python -m http.server 5500
```

Open the application at:

```text
http://localhost:5500/index.html
```

## Teacher Admin Requests

The teacher dashboard includes a **Request admin privileges** action. It opens a prepared email addressed to the administrator configured in `js/dashboard.js`.

The administrator reviews each request and grants access separately by adding the teacher's email to `ADMIN_EMAILS` in `admin.html`.

Keep the administrator email consistent in both files:

- `js/dashboard.js` - destination for teacher requests
- `admin.html` - allowlist for administrator access

##Repository

- https://github.com/ChenulWeragodaSmartTechProfessional/eventspherehub

## Security Notes

- Firebase Authentication controls account identity.
- Firestore security rules must control who can read and write users and events.
- The administrator email allowlist in the client is a convenience check, not a replacement for Firestore security rules.
- Never expose service-account credentials or private server keys in the frontend.

## Competition Context

EventSphere is designed to support school communities by improving event visibility, reducing missed announcements, and making competition schedules easier to access for every participant and stakeholder.
