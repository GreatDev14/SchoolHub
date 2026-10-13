# SCHOOL HUB — MASTER PRODUCT, MOCKUP, DESIGN & BUILD SPECIFICATION

**Document purpose:** Master brief for an AI coding assistant to build the original School Hub mockup and the complete product plan in one coherent project.  
**Initial pilot:** SS1 Dynamo and SS1 Horizon only.  
**Current stage:** Build a polished, clickable front-end prototype with realistic demo flows; plan production architecture separately and clearly label anything that is not connected to a real backend.

---

## 1. THE PRODUCT IN ONE SENTENCE

School Hub is a simple, safe, mobile-friendly school platform where students and teachers can access class information, announcements, assignments, learning materials, timetables, and moderated class communication in one organised place.

## 2. PRODUCT VISION

Create a useful school-wide digital home that makes school information easier to find and helps students and teachers coordinate learning. The experience should feel modern and trustworthy, not like a complicated enterprise dashboard or an unrestricted social network.

The first version must be designed around day students and a controlled pilot. Boarding-student support is explicitly postponed until the day-student pilot demonstrates value and school leadership agrees to discuss it.

### Product principles
- **Easy first:** common tasks should take very few steps.
- **Mobile-first:** most screens must work well on a phone, while also looking excellent on a laptop.
- **Low-bandwidth aware:** keep pages lightweight; avoid autoplay and unnecessary animation.
- **Safe by design:** school-controlled membership, permissions, reporting and moderation.
- **Clear status:** show whether content is a demo, draft, pending approval or published.
- **Honest prototype:** never pretend a local demo action has saved to a real server.
- **Flexible:** use configurable school details rather than hard-coding unconfirmed information.
- **Teacher-supportive:** the platform supports teachers; it does not replace their judgement or teaching.

## 3. CONFIRMED DECISIONS — DO NOT OVERRIDE

1. The school administration has given permission to explore the idea.
2. The first pilot is limited to **SS1 Dynamo** and **SS1 Horizon**.
3. A survey has already been prepared for these two arms. Do not invent survey results; incorporate real findings when supplied.
4. Official school branding and data will be supplied later: school name/logo, colours, class structure, subjects, timetable, calendar, clubs and school rules.
5. Teachers must request access and be approved by an authorised administrator before receiving teacher permissions.
6. Students join the correct class/arm using a school-issued class code or another school-approved invitation process.
7. Administrators should be able to see membership totals for each class/arm.
8. **No attendance tracking or grading system in the first version.**
9. **No boarding-student-specific features in the first version.** Revisit only after the day-student pilot and school discussion.
10. Do not create duplicate teacher signup/login pages if an existing page or flow is already in the repository. Inspect and reuse existing work.
11. Start with a complete visual mockup using fictional demo data. Do not imply that a real database, authentication, messaging or uploads work until actually implemented.
12. Use temporary branding that is easy to replace after the school provides official assets.

## 4. USERS, ROLES AND PERMISSIONS

### Student
Can:
- View their dashboard, joined classes, class-specific posts and schoolwide announcements.
- View assignment instructions and deadlines, and use the demo submission flow.
- Access published learning resources, timetable and school calendar.
- Participate in approved class discussions if the school enables them.
- Edit basic profile preferences and notification preferences.

Cannot:
- Publish official schoolwide announcements.
- Approve teachers, create class codes, change class membership rules or access admin analytics.
- View private information or class spaces they have not joined.
- View a public directory containing private student information.

### Teacher (access must be approved)
Can, within assigned classes:
- Create and manage assignments, learning resources and class announcements.
- View submissions for their own assignments/classes.
- Edit their own draft posts and resources.
- Start a class discussion if enabled by the school.

Cannot:
- Automatically access every class or administrator-only data.
- Approve their own teacher request.
- Change school-level settings unless separately granted an admin role.

### Class representative (optional, limited role)
May help coordinate class notices, collect non-sensitive feedback, or propose meetings/polls if the school approves. This role must not reveal private data, bypass teacher moderation, or give broad publishing permissions. It can be omitted from the first prototype if it complicates the experience.

### Administrator
Can:
- Review and approve/decline teacher access requests.
- Manage users, classes, arms, memberships and class codes.
- Publish or moderate official announcements and handle content reports.
- See aggregate pilot usage and class membership counts.
- Configure enabled features, school rules and basic platform settings.
- Review an audit trail of sensitive administrative actions.

**Security requirement:** Production permissions must be enforced on the server/database, not merely by hiding buttons in the browser.

## 5. WHAT IS INCLUDED — AND WHAT IS NOT

### Core pilot scope
- Welcome/entry page and demo role selection.
- Student dashboard.
- Classes and class detail pages.
- Assignments and a demo submission experience.
- Announcements.
- Timetable and calendar.
- Learning Centre/resources.
- Teacher dashboard and content creation flows.
- Admin dashboard, teacher approval queue, class/membership overview.
- Profile and basic settings.
- Moderated class discussion prototype, clearly marked as demo/optional pending school approval.
- Responsive navigation, search/filter controls, loading/empty/error states.

### Optional or later, subject to school approval
- Meeting proposals and polls.
- Clubs directory and club membership.
- Email/push notifications.
- Private messaging or real-time chat.
- Audio notes and voice-note submissions, based on survey findings and school policy.
- Video lessons or approved live-class links.
- Carefully constrained AI learning assistance for revision or finding teacher-approved resources.

### Explicitly out of scope for the first version
- Boarding-student support or offline boarding workflows.
- Attendance, grades, report cards or exam ranking.
- School fees or payment collection.
- Parent portal.
- GPS/location tracking.
- Unmoderated public social networking.
- Real-time private messaging unless separately approved and designed for safeguarding.
- Public student directory.
- AI replacing teachers or making disciplinary decisions.
- Real authentication, real database writes or real file uploads inside a static mockup.

## 6. INFORMATION WE WILL ADD LATER

Do not block mockup development while waiting for these. Use editable placeholders and fictional demo content.

- Official school name and logo.
- School colours and brand rules.
- Full list of classes, arms and subjects.
- Timetable, term dates, calendar and school events.
- School rules and acceptable-use policy.
- Approved clubs and club contacts.
- Teacher verification process and responsible administrators.
- Class-code distribution, expiry and revocation rules.
- Discussion, audio/video upload, privacy and moderation policy.
- Survey results from SS1 Dynamo and SS1 Horizon.
- Whether meetings, polls, clubs and audio notes are wanted in the first pilot.

## 7. USER JOURNEYS

### Student journey
1. Open School Hub.
2. Sign in or enter the demo mode during prototype testing.
3. See a dashboard with class, assignment, announcement and timetable summaries.
4. Open SS1 Dynamo or SS1 Horizon demo class.
5. Read a class announcement or assignment.
6. Open a resource in the Learning Centre.
7. Complete a simulated assignment submission.
8. Return to the dashboard and see the local demo state update.

### Teacher journey
1. Open the teacher access request/sign-in flow.
2. In the prototype, switch to the Teacher demo role; do not ask for real passwords.
3. See an approval-state example and teacher dashboard.
4. Create a demo assignment or announcement.
5. Preview it and publish it locally in demo mode.
6. View simulated submissions.

### Administrator journey
1. Open the Admin demo dashboard.
2. Review a fictional teacher access request.
3. Approve/decline it locally and see the demo status change.
4. View SS1 Dynamo and SS1 Horizon membership totals.
5. Create or revoke a sample class code in the local demo.
6. Review sample reports and aggregate pilot activity.

## 8. DESIGN DIRECTION

Create a clean, confident, modern school product. It should be warm and student-friendly without looking childish. Prioritise hierarchy, readability, spacing, and obvious actions over decorative graphics.

### Temporary design tokens
Use CSS variables so the school theme can be changed quickly.

```css
:root {
  --color-primary: #17243A;
  --color-accent: #356AE6;
  --color-background: #F6F8FC;
  --color-surface: #FFFFFF;
  --color-text: #1F2937;
  --color-muted: #667085;
  --color-success: #16845B;
  --color-warning: #B7791F;
  --color-danger: #C2413B;
  --color-border: #E5EAF1;
  --radius-card: 14px;
  --radius-control: 10px;
  --shadow-card: 0 4px 18px rgba(23, 36, 58, 0.06);
}
```

Typography: Inter or a clean system sans-serif. Use clear heading sizes, comfortable line-height, and readable text on small screens. Use consistent spacing, restrained shadows and a small set of status colours. Avoid excessive gradients, glassmorphism, large animations, crowded cards and low-contrast text.

### Layout
- Desktop: persistent left sidebar, top bar with page title/search/profile, and a content area with a sensible maximum width.
- Tablet: compact/collapsible sidebar.
- Mobile: compact header and simple drawer or bottom navigation; content cards stack vertically.
- Tap targets should be about 44px or larger where practical.
- Show breadcrumbs or clear back navigation on nested class and assignment pages.

### Suggested reusable components
- `AppLayout`
- `Sidebar`
- `MobileNavigation`
- `Topbar`
- `PageHeader`
- `Button`
- `FormField`
- `StatCard`
- `ClassCard`
- `AssignmentCard`
- `AnnouncementCard`
- `ResourceCard`
- `StatusBadge`
- `EmptyState`
- `SearchInput`
- `FilterTabs`
- `Modal`
- `Toast`
- `UserAvatar`
- `LoadingSkeleton`
- `ConfirmDialog`

Reuse components instead of creating slightly different versions on every page.

## 9. REQUIRED SCREENS AND CONTENT

### A. Welcome / entry
- Product name: **School Hub**.
- Suggested headline: **“Your school, connected.”**
- Short description: “Classes, learning resources and school updates in one place.”
- Primary actions: `Explore demo` and `Sign in`.
- Clearly state that demo mode uses fictional sample data.
- Keep the page quick to load and easy to understand.

### B. Demo sign-in / role selector
- Offer Student, Teacher and Administrator demo roles.
- No real password or personal information should be required in demo mode.
- Clearly label role switching as prototype-only.
- In production, role selection must never grant permissions; the server must derive access from the authenticated account.

### C. Student dashboard
Include:
- Greeting and current demo profile.
- Quick stats: joined classes, upcoming assignments, unread announcements (sample values only).
- “My Classes” cards for SS1 Dynamo and SS1 Horizon.
- Upcoming assignments with due dates and status.
- Recent schoolwide/class announcements.
- Today’s timetable preview.
- Quick links to Assignments, Learning Centre and Calendar.
- Useful empty states if a section has no items.

### D. Classes list and class detail
Class list:
- SS1 Dynamo and SS1 Horizon as the two initial demo groups.
- Subject/class cards, short description and open action.

Class detail tabs/sections:
- Overview.
- Announcements.
- Classwork/assignments.
- Learning resources.
- Discussion (labelled demo and only shown if enabled).

Include search/filter, a clear class identity and a useful empty state. Do not invent official subject names or school rules; label all sample content as demo content.

### E. Assignments
- List views or filters: All, Upcoming, Submitted, Past Due.
- Search and sort where useful.
- Each card shows title, class, due date, teacher/demo author and status.
- Assignment detail shows instructions, permitted file types, due date and a clear submission area.
- Demo submission may support text and simulated attachment selection; never upload to a real server in the mockup.
- Audio notes/voice notes and video should appear only as clearly marked optional concepts until survey findings and school policy confirm them.
- Do not add grades or grading features.
- Show validation and confirmation states for demo submission.

### F. Announcements
- Feed with clear schoolwide versus class-specific labels.
- Category examples: General Notice, Class Update, Event.
- Announcement detail with author role, date and relevant class.
- Search/filter and read/unread styling if useful.
- Teachers can create demo announcements for their assigned classes; admin can create a demo schoolwide announcement.
- Avoid sending notifications externally from the prototype.

### G. Timetable and calendar
- Weekly/day timetable view that works on mobile.
- Calendar/list view for events and deadlines.
- Use clearly fictional times and events until official data is supplied.
- No attendance marking, presence tracking or grades.
- Provide previous/next week and today controls if practical.

### H. Learning Centre
- Categories such as Notes, Revision, Videos, Practice and Teacher Resources.
- Search and filters by subject/type/class.
- Resource preview with title, author, date and short description.
- Demo resources should be fictional or clearly labelled examples.
- Do not autoplay media.
- AI assistance, if shown as a future idea, must be clearly marked “planned” and must not claim to be live.

### I. Class discussions / communication
- A restrained, moderated discussion space, not an open social feed.
- Topic list, topic detail and demo replies.
- A report-content control may be demonstrated locally.
- Clearly label the entire experience as a prototype.
- Production release requires written rules, moderation responsibilities, reporting/escalation workflow and a decision about who can post.
- Do not add private one-to-one chat by default.

### J. Meetings and polls — optional
- Provide a concept screen only if it fits the prototype without distracting from core functions.
- Students may suggest a meeting; teacher/class representative approval is required according to school rules.
- Polls must be labelled advisory unless the school explicitly authorises official voting.
- Before implementation, define eligibility, anonymity, results visibility, deadlines and who can create polls.

### K. Clubs — optional later
- Directory of approved clubs, description and meeting information.
- Do not invent actual clubs; use clearly fictional examples or placeholders.
- Keep hidden or marked “planned” until the school supplies verified details.

### L. Teacher dashboard
- Summary of assigned classes, active assignments, recent submissions and recent class activity.
- Quick actions: Create Assignment, Post Announcement, Add Resource.
- Forms must validate required fields and show preview before publishing.
- In demo mode, new items update local application state only.
- Include an approval-state example so the intended gate is clear.

### M. Administrator dashboard
- Aggregate counts for students, approved teachers, pending teacher requests, classes and recent activity; use demo values.
- Teacher access request queue with approve/decline actions.
- User list with role and access state.
- Class/arm membership counts for SS1 Dynamo and SS1 Horizon.
- Class code management concept: create, expire, revoke and see usage in production; prototype actions are local only.
- Content reports/moderation queue.
- Basic settings and audit activity preview.
- Do not expose private student details unnecessarily or create a public directory.

### N. Profile and settings
- Demo display name and role.
- Basic editable profile fields only if needed for the prototype.
- Notification preference toggles (local only).
- Clear sign-out/return-to-role-selector action.
- Do not request unnecessary personal data.

## 10. DEMO DATA AND CONTENT RULES

- Keep demo data in one central file/module rather than scattering it through UI components.
- Mark all sample people, subjects, assignments, announcements, dates and resource names as fictional/demo data.
- Use SS1 Dynamo and SS1 Horizon as the two pilot class labels.
- Never fabricate survey results or present sample counts as real school statistics.
- Use a few high-quality, realistic sample records per section; do not create hundreds of fake records just to fill space.
- Keep the data model flexible enough to replace sample records with real school-approved data later.

## 11. TECHNICAL IMPLEMENTATION GUIDANCE

### First inspect the existing repository
Before writing code:
1. Inspect the existing file structure, framework, package manager and scripts.
2. Identify reusable components, current styling, routing and existing authentication screens.
3. Preserve working code and the existing theme unless a change is necessary and agreed.
4. Avoid duplicate pages, duplicate navigation systems and unnecessary dependency additions.
5. Explain the implementation plan briefly, then make changes in small, testable steps.

### Mockup technology
If the repository is empty and no stack has been chosen, use:
- React + TypeScript + Vite.
- React Router or the existing router.
- CSS Modules or a consistent existing styling system.
- Lucide icons or the project's existing icon library.
- A central typed demo-data module and local React state for simulated actions.

Do not install a backend just to build a visual prototype. Do not add Firebase unless explicitly chosen later. The prototype must run locally using the repository's documented package scripts.

### Suggested folder structure
Adapt to the existing project rather than forcing this exact structure:

```text
school-hub/
  src/
    components/
      layout/
      ui/
      classes/
      assignments/
      announcements/
      resources/
    data/
      demoData.ts
    pages/
      Welcome.tsx
      DemoSignIn.tsx
      StudentDashboard.tsx
      Classes.tsx
      ClassDetail.tsx
      Assignments.tsx
      AssignmentDetail.tsx
      Announcements.tsx
      Timetable.tsx
      LearningCentre.tsx
      Discussions.tsx
      TeacherDashboard.tsx
      AdminDashboard.tsx
      ProfileSettings.tsx
    styles/
      theme.css
    App.tsx
    main.tsx
```

### Production architecture — separate from the mockup
Do not pretend this is already implemented. Before launch, choose a secure backend and database. A relational database such as PostgreSQL is a strong fit because users, classes, memberships, assignments and submissions have clear relationships. The final provider and hosting choice should consider cost, school access, reliability, backups and the team's experience.

Production components will likely include:
- Frontend application.
- Secure authentication and account recovery.
- Server-side role and class-membership authorization.
- Relational database and migrations.
- Protected file storage for permitted uploads.
- Email/in-app notifications if approved.
- Monitoring, error reporting, backups and operational documentation.
- Administrative audit events for sensitive actions.

Never put private API keys or database credentials in frontend code. Never trust a role value supplied by the browser. Every protected operation must verify the authenticated user and their permissions on the server.

## 12. SUGGESTED PRODUCTION DATA MODEL

This is a planning starting point, not a requirement to implement the database in the mockup.

- `users`: user ID, display name, login identifier, role, account state, timestamps.
- `teacher_access_requests`: user ID, requested details, status, reviewer, review timestamp.
- `classes`: class ID, year/group, arm name, active state.
- `class_memberships`: user ID, class ID, membership role, status, joined timestamp.
- `class_codes` or `invitations`: code hash, target class, expiry, usage limit, revoked state, creator.
- `subjects`: subject ID, class ID, name and optional assigned teacher.
- `announcements`: author, audience, title, body, publish state, timestamps.
- `assignments`: class, author, title, instructions, due date, allowed submission types, status.
- `assignment_submissions`: assignment, student, text/metadata, protected file references, submitted timestamp.
- `learning_resources`: author, class/subject, title, description, type, protected file/link, publish state.
- `discussion_topics` and `discussion_replies`: author, class, content, moderation state, timestamps.
- `calendar_events`: title, dates, audience, location/details only if approved.
- `content_reports`: reporter, target content, reason, status, moderator action.
- `notification_preferences`: user and selected notification settings.
- `audit_events`: actor, action, target, timestamp and minimal safe metadata.
- Optional later tables: `meeting_proposals`, `polls`, `poll_responses`, `clubs`, `club_memberships`.

Design constraints:
- Teacher approval is distinct from class assignment.
- Class codes must be revocable and should not be stored in a way that exposes usable secrets.
- A teacher should access only assigned/authorised classes and their associated submissions.
- A student should access only their own submissions and content intended for their memberships.
- Store the minimum personal information needed to operate the service.

## 13. SECURITY, PRIVACY AND SAFEGUARDING

Students may be minors, so safeguarding must be considered before any real launch.

- Use least-privilege access and server-side authorization.
- Validate and sanitize user input; protect against XSS, injection and relevant CSRF/session risks.
- Use HTTPS, secure session/cookie settings and rate limiting where appropriate.
- Keep secrets out of source control and client bundles.
- Restrict upload types and sizes; use protected storage and consider malware scanning before serving files.
- Prevent users from guessing IDs to view other users' private records.
- Provide a clear reporting and moderation/escalation process before discussions are enabled.
- Define data retention, account removal, access/correction requests and incident response with school leadership.
- Do not log passwords, access tokens, private message contents or unnecessary personal data.
- Do not expose student email/phone numbers or private profiles to other students by default.
- Do not collect location data.
- Do not use real student names, photos or records in a public prototype without proper authorisation.
- Obtain school approval for the acceptable-use policy, privacy notice, upload policy and discussion rules before production.
- Ensure class-code sharing cannot grant admin/teacher privileges.

## 14. NOTIFICATIONS

Prototype: show an in-app notification list or toast only; actions remain local.

Production, if approved:
- Start with in-app notifications for new announcements, assignments and relevant updates.
- Add email or push notifications only if they provide real value and the school approves them.
- Let users control non-essential notifications.
- Avoid exposing sensitive assignment or student information in lock-screen previews.
- Prevent duplicate or excessive notifications.

## 15. ACCESSIBILITY, PERFORMANCE AND RESPONSIVENESS

- Use semantic headings, proper labels, keyboard-accessible controls and visible focus states.
- Maintain readable contrast and do not communicate status using colour alone.
- Support reduced-motion preferences and avoid distracting animations.
- Provide loading, empty, validation, success and error states.
- Compress images, avoid large unnecessary libraries, lazy-load media when appropriate and paginate long lists.
- Do not autoplay audio or video.
- Test at approximately 360px, 390px, 768px, 1280px and 1440px viewport widths.
- Check keyboard navigation, touch targets, overflow, forms, dialogs and mobile navigation.
- Do not promise offline functionality. If a feature needs the network in production, show a clear network/error state.

## 16. REQUIRED MOCKUP INTERACTIONS

The prototype must be genuinely clickable and useful, not merely a static collection of screenshots.

- Navigate between all core pages and return using clear navigation.
- Switch between Student, Teacher and Admin demo roles.
- Open class cards and view class detail pages.
- Search/filter assignments, announcements and learning resources.
- Open assignment details and simulate a submission.
- Create an assignment in the teacher demo and see it appear locally.
- Create an announcement in the teacher/admin demo and see it appear locally.
- Simulate teacher approval/decline and show the changed demo status.
- Show class membership counts and a simulated class-code action.
- Add a demo discussion reply and simulate reporting content if discussions are included.
- Edit the demo display name or notification settings if those controls are shown.
- Sign out/return to the demo role selector.
- Use confirmation dialogs for destructive demo actions where sensible.
- Disable any control that has no action, or clearly mark it as planned. No dead buttons.
- Clearly indicate when changes are temporary and stored only in local UI state.

## 17. SURVEY-LED PRODUCT DECISIONS

When the real survey responses are available:
1. Summarise what students say they need most, without inventing responses.
2. Separate common requests from one-off suggestions.
3. Identify privacy, safety, access and usability concerns.
4. Compare requested features with school approval and development effort.
5. Prioritise features that solve a clear problem for both pilot arms.
6. Revisit audio notes, video, polls, meetings and discussion features based on evidence.
7. Keep a simple backlog with `Must`, `Should`, `Could` and `Later` priorities.

Do not let optional features make the first release harder to understand or maintain.

## 18. BUILD PHASES

### Phase 1A — Complete interactive mockup
- Inspect the repository and reuse existing work.
- Build the design tokens and responsive application shell.
- Implement Welcome and Demo Sign-in.
- Implement Student Dashboard, Classes, Class Detail, Assignments, Assignment Detail, Announcements, Timetable and Learning Centre.
- Implement Teacher Dashboard and Admin Dashboard.
- Add Profile/Settings and optional moderated discussion concept.
- Use fictional demo data and local interactions.
- Add clear demo labels, loading/empty/error states and mobile layouts.
- Test all navigation and interactions.

### Phase 1B — Controlled day-student pilot
Only after school review and a separate production plan:
- Confirm school branding and official data.
- Approve privacy, acceptable-use and moderation policies.
- Implement real authentication and account recovery.
- Implement teacher access requests and admin approval.
- Implement secure class codes and memberships.
- Implement announcements, assignments, protected submissions, resources, timetable/calendar and admin overview.
- Add moderation/reporting and backups.
- Test permissions, accessibility, privacy and mobile performance.
- Pilot with SS1 Dynamo and SS1 Horizon only.

### Phase 2 — Improve using evidence
- Collect feedback from students, teachers and the admin.
- Fix usability and reliability issues before expanding scope.
- Add optional features only when they solve demonstrated needs and the school approves them.

### Future consideration — Boarding students
Do not build boarding-specific functionality now. Revisit only after the day-student pilot demonstrates value and the school explicitly agrees to discuss a boarding use case, device access, connectivity, safeguarding and operational support.

## 19. TESTING CHECKLIST

### Visual and navigation
- [ ] The application has a consistent design system and readable hierarchy.
- [ ] Every core page is reachable from the main navigation.
- [ ] Mobile navigation works and does not cover important content.
- [ ] No horizontal overflow at supported screen sizes.
- [ ] Cards, forms, dialogs and status labels are consistent.

### Functional demo
- [ ] Demo role switching works.
- [ ] Student can open classes, announcements and assignments.
- [ ] Assignment filters and searches work.
- [ ] Demo submission shows validation and confirmation.
- [ ] Teacher can create a local demo assignment/announcement.
- [ ] Admin can simulate teacher approval and view class counts.
- [ ] Profile/settings actions work if displayed.
- [ ] No visible button is inert without explanation.

### Scope and honesty
- [ ] All sample data is clearly fictional.
- [ ] The mockup does not request real passwords or unnecessary personal data.
- [ ] It does not claim real database persistence, real uploads or real notifications.
- [ ] No attendance, grades, fees or boarding features have been added.
- [ ] No unapproved private messaging or unrestricted social feed is present.

### Code quality
- [ ] Existing working code and design are preserved where possible.
- [ ] Reusable components are used consistently.
- [ ] Demo data is centralised and typed where supported.
- [ ] Setup/run instructions are accurate.
- [ ] Browser console has no avoidable errors or warnings.

## 20. DEFINITION OF DONE FOR THE MOCKUP

The mockup is complete when a reviewer can open it and understand the product without an explanation; navigate the core student, teacher and admin journeys; interact with sample assignments, announcements and approval controls; see responsive layouts; and distinguish prototype behaviour from production functionality. It must feel like one coherent product rather than disconnected pages.

## 21. FINAL INSTRUCTIONS TO THE CODING AI

Build the **original School Hub mockup plus the complete product plan described in this document**. Do not reduce the work to only a landing page or dashboard. Create a coherent, responsive, clickable front-end prototype with student, teacher and administrator demo experiences. Prioritise the dashboard, classes, assignments, announcements, timetable and Learning Centre, then complete the teacher/admin flows and remaining supporting screens.

Before changing code, inspect the existing repository and preserve useful existing work. If the project already has a framework, theme, login flow or components, adapt them instead of rebuilding everything without reason. Use SS1 Dynamo and SS1 Horizon as the initial demo groups, temporary replaceable branding and clearly fictional data. Do not wait for official branding or survey results to build the prototype; use placeholders until they arrive.

Keep demo changes local and label them honestly. Do not add a fake backend, fake real authentication, attendance, grades, school fees, boarding support or unapproved social features. Include concise run instructions and a summary of files changed. If something cannot be implemented in the current repository, explain the limitation and leave a clearly labelled, non-misleading placeholder.

**The goal is a polished mockup that can be shown to the team and school administration, plus a practical plan for turning it into a safe, useful day-student pilot.**
