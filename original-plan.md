# School Hub — UI Mockup Specification

> **Project status:** Early visual prototype  
> **Initial pilot:** SS1 Dynamo and SS1 Horizon  
> **Purpose of this document:** Guide an AI coding assistant or developer to build a polished, clickable front-end mockup of School Hub using sample data. This is a mockup first, not a production-ready school management system.

---

## 1. Product concept

School Hub is a central online space for students, teachers, and school administrators. It brings class information, assignments, announcements, learning resources, timetables, and school communication into one easy-to-use interface.

The first version is only for the **day-student pilot involving SS1 Dynamo and SS1 Horizon**. Boarding-student-specific features are explicitly out of scope for now. Do not build boarding access, hostel workflows, offline boarding systems, or boarding-specific dashboards in this mockup.

The interface should feel modern, welcoming, organised, and simple enough for students and teachers to understand without training.

## 2. Goal of this mockup

Build a responsive, visually convincing prototype that allows someone to click through the main School Hub screens and understand how the platform will work.

The mockup should:
- Look like a real, modern education platform rather than a generic admin template.
- Work on desktop, tablet, and mobile screens.
- Use realistic but fictional sample content.
- Include working navigation and obvious interactions where practical.
- Use one consistent design system and reusable components.
- Keep school-specific branding and information easy to replace later.
- Clearly separate sample/demo behaviour from real account, database, or messaging functionality.

**Do not claim that data is being saved to a real database.** Unless a backend is explicitly supplied, all users, assignments, announcements, and messages are demo data.

## 3. Temporary visual direction

The school has not yet supplied its official logo, school colours, timetable, calendar, or other branding information. Use temporary branding that is easy to change.

### Suggested temporary theme
- Primary: deep navy `#17243A`
- Accent: blue `#356AE6`
- Background: very light grey `#F6F8FC`
- Cards: white `#FFFFFF`
- Main text: dark slate `#1F2937`
- Secondary text: muted slate `#667085`
- Success: restrained green `#16845B`
- Warning: warm amber `#B7791F`
- Borders: `#E5EAF1`

Treat these as placeholders, not approved school colours.

### Typography
Use a clean, legible sans-serif font such as Inter, or a system font stack if external font loading is unavailable. Make page titles distinct, body text comfortable to read, and secondary text readable rather than tiny.

### Visual style
- Clean cards with subtle borders and restrained shadows.
- Comfortable spacing and consistent alignment.
- Rounded corners around 10–14px, used consistently.
- Simple line icons.
- Clear hover, focus, selected, loading, empty, and disabled states.
- Use animation sparingly; respect reduced-motion preferences.
- Avoid excessive gradients, glassmorphism, giant hero sections inside the logged-in app, or decorative elements that distract from schoolwork.
- Use clear labels alongside icons where needed. Never rely on colour alone to communicate status.

## 4. Main application shell

Create a shared layout for all signed-in screens.

### Desktop layout
1. **Left sidebar**
   - School Hub logo/wordmark placeholder.
   - Dashboard
   - My Classes
   - Assignments
   - Announcements
   - Timetable
   - Learning Centre
   - Messages or Discussions
   - Profile and Settings near the bottom
2. **Top bar**
   - Current page title or breadcrumb.
   - Search field or search button (demo only if search is not implemented).
   - Notification icon with a small demo indicator.
   - User avatar, display name, and role.
3. **Main content**
   - Page heading and short description.
   - Main content cards, lists, and panels.
   - Consistent page width and spacing.

### Mobile layout
- Replace the permanent sidebar with a menu drawer or compact navigation.
- Optionally use a small bottom navigation for the four most-used areas: Home, Classes, Assignments, and More.
- Ensure all actions remain available through the menu.
- Avoid horizontal scrolling for the overall page.
- Use touch targets of approximately 44px or larger.
- Stack dashboard cards into one column on narrow screens.

### Shared layout requirements
- Sidebar selected state must match the current page.
- All pages must use the same header, typography, spacing, and components.
- Navigation must work; do not leave buttons that look interactive but do nothing.
- Include a consistent page-loading placeholder if simulated loading is used.

## 5. Mockup screens

Build the following screens using fictional sample data.

### Screen A — Welcome / entry page

A simple, attractive landing page that introduces School Hub.

Include:
- School Hub wordmark.
- Headline: **“Your school, connected.”**
- Supporting text: “A simpler place to learn, share classwork, and stay up to date.”
- Primary button: **Explore the demo**
- Secondary button: **Sign in**
- A small preview of the dashboard or feature cards.
- A discreet note: “Prototype preview — sample information only.”

Do not invent the school's name, logo, address, official identity, or endorsement.

### Screen B — Sign-in demo

Create a polished sign-in screen with:
- School Hub wordmark.
- Email or demo username field.
- Password field with show/hide control.
- Sign-in button.
- Clear validation for empty fields.
- A visible **“Use demo account”** option or a demo-role selector.

For prototype testing, allow the viewer to enter the app as one of these sample roles:
- Student
- Teacher
- Administrator

This is **demo role switching, not secure authentication**. Clearly label the prototype accordingly. Do not collect or send real passwords to any service.

### Screen C — Student dashboard

This is the most important screen. Make it the most polished and complete screen in the mockup.

Use a friendly greeting such as “Good morning, Ada” with a short line like “Here’s what’s happening with your schoolwork.”

Include:
- **My Classes** summary card.
- **Assignments Due** summary card.
- **New Announcements** summary card.
- **Today's Timetable** or upcoming lessons.
- **Upcoming Assignments** list with title, subject, due date, and status.
- **Latest Announcements** preview.
- **Quick Actions** such as Open Classes, View Assignments, and Read Announcements.

Use fictional sample content such as:
- Class: SS1 Dynamo
- Subject: Mathematics
- Assignment: “Practice: Linear Equations”
- Due date: a clearly illustrative date
- Announcement: “Sample notice: Review the updated lesson resources.”

The sample dashboard must not imply that the school has supplied or confirmed any of these details.

### Screen D — My Classes

Show the classes the demo student belongs to.

Include:
- Page title and brief explanation.
- Class cards showing class name, subject or group label, teacher placeholder, and number of sample resources.
- At least two sample groups so the interface can demonstrate SS1 Dynamo and SS1 Horizon.
- Search or filter control if useful.
- Empty state for users with no classes.

Clicking a class card opens the class detail page.

### Screen E — Class detail

This page demonstrates what a student sees inside a class.

Include:
- Class title and teacher placeholder.
- Tabs or a simple section navigation:
  - Overview
  - Classwork
  - Resources
  - Discussion
- Recent class announcements.
- A list of assignments and learning resources.
- A visible back-to-classes action.
- Empty states for sections with no sample content.

Keep the design calm and structured. Do not implement public, unrestricted student profiles or expose private student information.

### Screen F — Assignments

Include:
- Page heading.
- Filter chips or tabs: All, Upcoming, Submitted, Past Due.
- Assignment rows or cards with subject, title, due date, and status.
- Clear status text such as “Not started,” “In progress,” and “Submitted.”
- Search or subject filter if practical.
- Clicking an assignment opens its detail view.

Use statuses only as fictional demonstration data. No real grading system is required.

### Screen G — Assignment detail

Include:
- Assignment title and subject.
- Teacher placeholder.
- Instructions.
- Due date.
- Sample attached resource or document link.
- A text area or file-upload control visual for a submission.
- Submit button with a clear demo-only confirmation state.

If a real upload service is not connected, do not pretend a file has been uploaded to a server. It is acceptable to simulate a submission locally and label it as a demo.

### Screen H — Announcements

Create an announcement feed with:
- Announcement title.
- Short preview.
- Author role (for example, Teacher or School Admin).
- Date.
- Optional category such as Class Update, General Notice, or Event.
- Read/unread visual treatment.
- Click to open the full announcement.

Provide an attractive empty state for a new user with no announcements.

### Screen I — Timetable

Build a simple weekly timetable mockup:
- Day selector or weekday tabs.
- Lesson time, subject, and class/room placeholder.
- A clear “No lessons scheduled” state where appropriate.
- Mobile-friendly layout; on narrow screens, show the selected day's schedule rather than squeezing a wide grid.

All times and lessons are fictional placeholders until the school supplies the real timetable.

### Screen J — Learning Centre

Include:
- Search field.
- Resource cards for sample notes, videos, revision materials, and documents.
- Subject/category filters.
- Resource type label and last-updated placeholder.
- Clear open/preview action.
- Friendly empty state.

Use locally supplied placeholders or simple illustrative icons. Do not hotlink random copyrighted textbooks or invent real school resources.

### Screen K — Messages / class discussions

For this mockup, focus on **moderated class discussions**, not an unrestricted social network.

Include:
- List of sample class discussion topics.
- Topic title, class, author role, reply count, and date.
- A discussion detail screen with sample replies.
- A composer to add a demo reply.
- A clear report/flag control in the visual design.
- A reminder that messages and discussions must follow school rules.

Do not implement real-time chat, private direct messaging, or notifications through a real service unless separately specified. Any demo replies should be local sample state only.

### Screen L — Teacher dashboard

When the demo role is Teacher, display a teacher-oriented dashboard.

Include:
- Classes taught.
- Assignments created.
- Recent submissions (fictional).
- Recent class activity.
- Quick actions: Create Assignment, Post Announcement, Add Learning Resource.
- A list of the teacher's sample classes.

Provide simple forms for creating a demo assignment or announcement. Submitting the form should add the item to the local mockup state and show a confirmation that it is a demo action.

Do not build grades, attendance tracking, or disciplinary records in this mockup.

### Screen M — Administrator dashboard

When the demo role is Administrator, show a simple overview for managing the pilot.

Include:
- Sample count of students, teachers, and classes.
- Sample class groups: SS1 Dynamo and SS1 Horizon.
- A recent activity list.
- A user list with fictional records and role labels.
- A way to switch the demo role for testing.
- A notice that real user management and approvals require a backend.

Do not implement destructive actions, real account creation, or real school-wide changes in a front-end-only mockup.

### Screen N — Profile and settings

Include:
- Demo user's display name.
- Demo role and class (where relevant).
- Editable display name in local demo state.
- Notification preference toggles for visual demonstration.
- Sign out / return to demo selection.
- A clear indication that profile changes are not stored on a server.

## 6. Reusable components

Build reusable components instead of copying markup between screens.

Suggested components:
- `AppLayout`
- `Sidebar`
- `MobileNavigation`
- `Topbar`
- `PageHeader`
- `StatCard`
- `ClassCard`
- `AssignmentCard`
- `AnnouncementCard`
- `ResourceCard`
- `StatusBadge`
- `EmptyState`
- `SearchInput`
- `FilterTabs`
- `Modal` or `Dialog`
- `FormField`
- `Toast` or inline confirmation
- `UserAvatar`
- `LoadingSkeleton`

Use a consistent set of spacing, colours, border radii, font sizes, and button variants.

## 7. Interaction requirements

The prototype should be clickable and coherent.

Required interactions:
- Navigate between all main screens.
- Open a class from My Classes.
- Open an assignment from the assignments list.
- Switch between student, teacher, and administrator demo roles.
- Filter assignments and announcements.
- Search sample learning resources.
- Open and close mobile navigation.
- Show validation feedback on demo forms.
- Create a sample announcement or assignment in local state.
- Show a demo-only submission confirmation.
- Edit the demo profile display name.
- Return to the demo role selector or sign out.

If an interaction is not implemented, render it as non-interactive text rather than a misleading button.

## 8. Suggested implementation

If starting from scratch, use:
- React
- TypeScript
- Vite
- CSS Modules or a small, consistent styling system
- React Router for navigation, if routing is needed
- Lucide icons or another consistent icon set

Keep the implementation lightweight. Do not add a backend, Firebase, payment services, or third-party messaging provider for this visual mockup.

If a project already exists, **inspect it first and adapt the existing stack rather than replacing the project unnecessarily**.

Suggested folder structure:

```text
school-hub/
├── public/
│   └── assets/
├── src/
│   ├── components/
│   │   ├── AppLayout.tsx
│   │   ├── Sidebar.tsx
│   │   ├── Topbar.tsx
│   │   ├── StatCard.tsx
│   │   ├── ClassCard.tsx
│   │   ├── AssignmentCard.tsx
│   │   ├── AnnouncementCard.tsx
│   │   └── EmptyState.tsx
│   ├── data/
│   │   └── demoData.ts
│   ├── pages/
│   │   ├── Welcome.tsx
│   │   ├── DemoSignIn.tsx
│   │   ├── StudentDashboard.tsx
│   │   ├── Classes.tsx
│   │   ├── ClassDetail.tsx
│   │   ├── Assignments.tsx
│   │   ├── AssignmentDetail.tsx
│   │   ├── Announcements.tsx
│   │   ├── Timetable.tsx
│   │   ├── LearningCentre.tsx
│   │   ├── Discussions.tsx
│   │   ├── TeacherDashboard.tsx
│   │   ├── AdminDashboard.tsx
│   │   └── ProfileSettings.tsx
│   ├── styles/
│   │   └── theme.css
│   ├── App.tsx
│   └── main.tsx
└── package.json
```

This is a guide, not a requirement to create every file if a simpler architecture fits the project.

## 9. Responsive design and accessibility

Test at approximately:
- Mobile: 360px and 390px wide.
- Tablet: 768px wide.
- Desktop: 1280px and 1440px wide.

Requirements:
- No accidental horizontal page scrolling.
- Semantic headings and form labels.
- Visible keyboard focus.
- Sufficient text/background contrast.
- Icons have accessible labels when used as controls.
- Controls are usable by keyboard and touch.
- Status information includes text, not colour alone.
- Respect `prefers-reduced-motion`.
- Forms provide understandable validation messages.
- Do not use tiny text for important dates or assignment status.

## 10. Scope exclusions

Do **not** build these in this mockup:
- Boarding-student or hostel features.
- Offline boarding workflows.
- Attendance tracking.
- Grades or report cards.
- Fees, payments, or school accounting.
- Parent portals.
- Live GPS, surveillance, or tracking.
- Real authentication or role-based security.
- A real database or file storage.
- Real-time messaging or push notifications.
- AI tutoring or automated grading.
- A public directory of students.
- Any invented official school identity, branding, rules, timetable, or school data.

These can be discussed later if the school approves and there is a clear need.

## 11. Quality checklist

Before considering the mockup complete, confirm:
- [ ] The first screen clearly introduces School Hub.
- [ ] The dashboard is polished and easy to scan.
- [ ] All primary navigation works.
- [ ] Student, teacher, and administrator demo roles show relevant screens.
- [ ] The two pilot class groups appear as fictional examples.
- [ ] Assignment and announcement forms provide visible demo feedback.
- [ ] Mobile navigation works.
- [ ] Every screen has realistic spacing and a consistent design.
- [ ] Empty states and form errors are handled.
- [ ] No button is misleadingly inactive.
- [ ] Sample data is clearly identified as fictional.
- [ ] No real passwords or personal student information are requested.
- [ ] No boarding-specific features are included.
- [ ] The mockup runs locally and has clear run instructions.

## 12. Final instruction to the coding assistant

Build the **front-end mockup first**, with a strong focus on the student dashboard, class page, and assignments experience. Use fictional data, a temporary theme, reusable components, and working local interactions. Keep the code organised and responsive.

Do not pause to request the school logo, official colours, timetable, calendar, or other details. Use the placeholders described above so those items can be added later.

Do not overengineer the prototype. The objective is to let the school and pilot students see, click through, and evaluate the proposed School Hub experience before we commit to the production architecture or build boarding-student support.
