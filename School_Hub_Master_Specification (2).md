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

---

# EXPANDED FEATURE SPECIFICATION — LEARNING, ENGAGEMENT AND CLASS COMMUNITY

> **This expansion is part of the master brief, not a separate optional idea list.** It expands and takes priority over the shorter descriptions in Sections 5, 9, 16 and 18 wherever they overlap. The coding AI must preserve the original platform plan and incorporate these requirements into the same School Hub experience. Build realistic front-end demonstrations now; connect external services only in a later approved implementation phase.

## 22. PRODUCT GOAL: MAKE SCHOOL HUB A PLACE STUDENTS RETURN TO

School Hub should not feel like a static school noticeboard. It should connect school information, teaching, practice, revision, class collaboration and student motivation in one simple experience.

Every learning feature must answer at least one question:
- What should I learn next?
- Can I understand this topic in another way?
- Can I listen instead of reading right now?
- Can I practise and see what I need to improve?
- Can I ask a useful question and get help?
- Can I find the notes, recording or explanation my teacher shared?
- Can I see my progress and feel encouraged to keep going?

Do not overwhelm students with dozens of cards at once. Use clear sections, sensible defaults, a search field, filters, saved items and a consistent “Continue learning” entry point. All learning activity should be organised by subject, class, topic and teacher where applicable.

## 23. LEARNING CENTRE — FULL INFORMATION ARCHITECTURE

Create a real Learning Centre area with its own navigation and detail pages, not one generic resource list. Suggested tabs or side navigation:
1. **Overview** — continue learning, daily goal, recommended next steps and recent activity.
2. **Lessons & Notes** — teacher notes, lesson summaries, PDFs, presentations and approved links.
3. **Audio & Podcasts** — podcasts, recorded explanations and text-to-speech lessons.
4. **Live Learning** — upcoming live lessons, revision rooms and approved online sessions.
5. **AI Tutor** — interactive explanations, hints and guided practice.
6. **Practice & Quizzes** — low-stakes topic practice and self-checks; not an official grading system.
7. **Flashcards & Revision** — student revision cards and spaced review.
8. **My Progress** — personal goals, activity history, streaks and achievements.
9. **Saved Items** — bookmarked notes, audio, lessons and questions.

Each resource card should show a clear title, subject, topic, class/arm audience, creator, content type, duration or estimated reading time when known, publication date, and whether it is a draft, published or archived. Do not invent official school content. Demo content must be clearly fictional and marked as sample data.

## 24. PODCASTS AND AUDIO LEARNING

### Student experience
- Browse a podcast/audio library by subject, topic, teacher and duration.
- Show episode title, short description, speaker/teacher, episode number when relevant, duration and release date.
- Provide play/pause, seek, skip backward/forward, playback speed, volume where supported, and a visible progress bar.
- Remember playback position in the demo locally so a student can resume an episode.
- Let students bookmark an episode, save it to a revision playlist, mark it completed, and view a transcript when one exists.
- Include “Listen again”, “Continue listening” and “Related resources” states.
- Add a clear transcript or text alternative for accessibility where available.
- Do not autoplay audio or video. Start only after the user presses play.
- Production downloads must be authorised by the school/content owner, protected where needed and designed for limited storage/data use. Do not promise offline playback in the mockup unless it is genuinely implemented.

### Teacher podcast publishing
- Teachers can create an episode draft, add title/description/subject/topic, upload or record audio if supported, attach a transcript, add a cover image, select the class audience, preview it and publish it.
- Support a series with multiple episodes, but do not force teachers to create a series for a single audio lesson.
- Teacher must be able to edit metadata, unpublish or archive their own content; admin moderation powers must be clearly defined.
- Demo: simulate upload/record/publish locally and label the feature as a prototype. Never pretend a file was actually uploaded if it was not.

## 25. TEACHER NOTES-TO-AUDIO STUDIO

Add a dedicated **Create audio lesson** action to the teacher dashboard and resource creation flow.

### Workflow
1. Choose a subject, class/arm, topic and lesson title.
2. Paste text or select a supported document format in the eventual production version.
3. Preview and edit the text before conversion.
4. Choose an available voice and speaking speed if the connected text-to-speech provider supports them.
5. Generate audio using an approved text-to-speech service in production; show a progress, success or failure state.
6. Preview the generated audio and transcript.
7. Optionally split long content into chapters/sections and add a short introduction.
8. Save as draft, regenerate, discard or publish to selected classes.
9. Published audio appears in the correct class, subject, Audio & Podcasts library and teacher resource list.

### Requirements and safeguards
- Never expose a text-to-speech API key in client-side code.
- Show estimated cost/usage to authorised staff if the chosen provider charges per character or minute and the provider makes that information available.
- Include a confirmation step before a potentially expensive generation request in production.
- Do not clone a real person's voice or imply that synthetic speech is a teacher's actual recording without explicit permission and clear labelling.
- Keep original notes and generated audio linked so teachers can correct notes and regenerate the audio.
- Demo mode can use a prewritten sample audio item and a simulated conversion state; be honest that actual audio generation is not connected.

## 26. LIVE LEARNING ROOMS

Add a dedicated Live Learning area for teacher-scheduled online classes, tutorials and revision sessions.

### Student screen
- Tabs: Upcoming, Live now, Past sessions and Saved recordings (only when available).
- Session card: title, subject, host teacher, date/time, intended class, duration if known, short agenda, attached resources and session status.
- Actions: View details, add reminder, open approved meeting link, submit a question before the session, and open permitted notes/recording after the session.
- A “Live now” indicator must reflect actual session state; do not show a session as live based only on a fictional timer.
- If the service is not connected, show a clearly labelled demo room and a disabled or simulated join action.

### Teacher scheduling flow
- Create session title, subject/topic, audience, date/time, agenda, optional resources and approved meeting URL or integrated room.
- Validate required fields and prevent accidental publication of an incomplete session.
- Edit or cancel sessions and notify the selected audience in production.
- Allow questions and a moderated session chat only when enabled by school policy.
- If recordings are allowed, explain who can view them and for how long. Do not record by default.

### Live room interaction model
For the mockup, demonstrate a room layout with session information, teacher panel, question list, shared resource panel and a moderated chat placeholder. Real video/audio conferencing requires a selected third-party provider or a separately implemented real-time system; do not build a fake interface that claims a real call is happening.

## 27. AI TEACHING ASSISTANT — GUIDED LEARNING, NOT JUST A CHAT BOX

The AI Tutor should be a multi-turn learning assistant with a conversation history scoped to the student's account in production. In the mockup, use a clearly labelled simulated conversation and sample prompts.

### Student capabilities
- Ask a question about a subject or topic.
- Select a learning mode: **Explain simply**, **Teach me step by step**, **Give me a hint**, **Quiz me**, **Give me an example**, or **Help me revise**.
- Ask follow-up questions without restarting the lesson.
- Ask for another explanation, a worked example, a short summary or a comparison.
- Receive practice questions and feedback that explains why an answer is correct or incorrect.
- Request a short revision plan for a topic.
- Rate whether an explanation helped and report a problematic response.
- Where enabled later, ask using a photo of a question, a document or a voice note; provide text input first and keep unavailable inputs clearly disabled rather than pretending they work.

### Teaching behaviour
- Prefer guiding questions, hints and reasoning before giving a final answer when the student is practising.
- Make explanations age-appropriate and structured with headings, examples and a short “check your understanding” question.
- Distinguish teacher-provided material from AI-generated explanation.
- If a response may be uncertain or the available material is insufficient, say so and suggest asking the teacher rather than inventing a school rule, timetable or syllabus fact.
- Where possible, ground answers in approved teacher materials and show which material was used. Do not fabricate citations or claim that an answer came from a teacher's notes when it did not.
- Do not present AI output as official grading, diagnosis of a student's ability, or a replacement for a teacher.
- Give students a way to return to their class resources and report an error.

### Teacher and admin controls
- Define which classes can use the tutor and which approved materials it can reference.
- Teachers can create suggested prompts or a topic-specific revision helper.
- Admin can disable the AI feature if school policy requires it.
- In production, disclose AI usage, protect conversation data, set appropriate retention controls, and prevent one student's conversations from being visible to other students or teachers by default.
- Set sensible request limits and monitor costs without exposing student content unnecessarily.

### Mockup requirements
- Show a left conversation list or recent conversations area where space permits, a main chat area, prompt chips and a clear text composer.
- Include a sample guided session with at least one follow-up question and a hint-based response.
- Include loading, empty, error and retry states.
- Any simulated answer must be labelled as demo content; never claim a real AI model is connected unless it is.

## 28. PRACTICE, QUIZZES, FLASHCARDS AND SPACED REVISION

These are learning and self-check features, not an official grades or report-card system.

### Practice and topic quizzes
- Teachers can create a practice set with title, subject, topic, instructions and questions.
- Support multiple-choice and short-answer question types in the initial design; more types can be added later.
- Let students attempt questions, submit, review their own answers and read explanations when supplied.
- Show personal completion and practice history. Do not expose public class rankings or turn practice into official marks.
- Teachers may see aggregate participation or common difficult questions later, subject to school approval and privacy controls.
- Include a “Try again” action and links to relevant notes/audio.

### Flashcards
- Students can create personal flashcards; teachers can publish subject/topic decks to selected classes.
- A card has a front, back, subject/topic, source and optional example.
- Include flip/reveal, mark “Need practice” / “Know it”, shuffle and review session controls.
- Use simple spaced-repetition scheduling in production only when implemented and tested; the mockup can simulate due cards locally.
- Let students save a teacher deck without modifying the original.

### Revision planner
- Students can set a modest daily or weekly study goal and choose subjects/topics to revise.
- Build a suggested plan from user-selected tasks and deadlines; do not pretend to know exam dates that have not been entered.
- Let students tick off completed tasks, reschedule missed tasks and pause reminders.
- Avoid shaming language for missed goals. Encourage restarting at any time.

## 29. STREAKS, ACHIEVEMENTS, BADGES AND LEARNING MILESTONES

Create a dedicated **My Progress** experience that celebrates consistent learning without making students feel punished or publicly compared.

### Personal progress elements
- Daily learning goal progress.
- Learning streak with a clear definition of what counts as a learning day.
- Weekly activity summary and a simple calendar/heatmap of completed learning activity.
- Milestones such as First Lesson Completed, First Audio Lesson, Five Practice Sessions, Revision Regular, Topic Explorer and Helpful Contributor.
- Personal achievement shelf with earned, in-progress and locked achievements.
- Progress by subject based on activity completion, not a claim that the student has mastered the subject unless an actual assessment supports that claim.
- Gentle encouragement and a “restart today” action after a missed day.
- Optional reminders controlled by the student.

### Fairness and privacy
- Streaks must be based on meaningful learning activity, not merely opening the app or leaving a page open.
- Never remove a student's access, marks or privileges because they lost a streak.
- Avoid public leaderboards by default. If the school later approves challenges, prefer opt-in class/team challenges that reward participation and cooperation, not only speed or highest scores.
- Do not show a public ranking of students or disclose individual activity to classmates.
- Give students a way to hide achievement displays and mute reminders.
- Keep rewards age-appropriate, non-monetary and educational. No paid boosts, gambling-like mechanics or manipulative notification loops.

### Suggested achievement examples
- **Getting Started:** finish the first lesson.
- **Listening Learner:** finish a permitted audio lesson.
- **Practice Builder:** complete five practice sessions.
- **Curious Mind:** explore resources from three subjects.
- **Revision Ready:** complete a self-chosen revision plan.
- **Consistency:** reach a modest streak milestone.
- **Class Contributor:** receive a teacher-approved helpful contribution recognition, with moderation to prevent popularity contests.

### Mockup interactions
- Make at least one streak card and one achievement shelf visible.
- Let the user open an achievement to see its description and progress.
- Simulate progress updates locally when demo learning tasks are completed.
- Make it explicit that the mockup's streak and badge data is sample/local state, not persistent account data.

## 30. CLASS DISCUSSIONS — MAKE THEM STRUCTURED AND USEFUL

Expand class discussions beyond a basic message list. It must be a moderated learning space connected to each class, subject and topic.

### Discussion categories
- **Ask a question:** students ask about a lesson, assignment or topic.
- **Homework help:** peers can share hints and explanations without simply posting answer keys where a teacher has restricted them.
- **Lesson discussion:** teacher-led thread for a lesson or resource.
- **Study group:** coordinate a revision session or shared topic.
- **Class updates:** class-rep coordination posts when authorised; official notices remain distinct from informal discussion.
- **Poll or quick check:** optional and enabled only when permitted by school policy.

### Topic/thread structure
Each thread should support title, category, subject/topic, author, timestamp, body, optional approved attachment, reply count, last activity, and state such as open, answered, pinned or locked. Replies should support basic text formatting and a clear reply composer. Avoid endless nesting; use one level of replies initially.

### Student capabilities
- Search and filter by subject, category, unanswered, pinned and recent.
- Create a thread in permitted categories.
- Reply, edit their own post for a limited period if policy allows, bookmark a thread, and follow/unfollow a discussion.
- Mark their own question as resolved, or allow a teacher to mark it answered.
- React with a small, restrained set of helpful reactions if school approves; avoid popularity metrics.
- Report a post/reply and block no one by default without a school-defined moderation process.
- Receive in-app notifications for replies or teacher responses, with controls to mute a thread.

### Teacher capabilities
- Create and pin a topic, reply, mark an answer as teacher-verified, close/lock a thread, move a thread to the correct subject/category, and remove or hide content according to policy.
- Post a “Question of the week” or a prompt for class discussion.
- Highlight a useful explanation without exposing private student information.
- See unanswered questions for their assigned classes.

### Moderation and safety
- Show community rules before first participation.
- Provide report reasons such as bullying, harassment, spam, personal information, unsafe content or other.
- Reports go to an authorised moderator queue; do not reveal the reporter to the reported student.
- Provide clear status feedback after reporting without promising a specific outcome.
- Allow admins/moderators to hide content pending review, preserve necessary moderation records, and escalate serious safety concerns under school policy.
- Do not launch unrestricted direct messaging between students in the first pilot. Start with class-based moderated threads. Private messaging, if ever approved, needs separate safeguards and permissions.
- Never publish student phone numbers, addresses or other private information in profiles or public class spaces.

### Discussion mockup
Include a class discussion list, thread detail, create-thread form, reply form, search/filter controls, a pinned teacher prompt, an unanswered question, an answered question, report action and moderation queue example. Use fictional content and simulate actions locally.

## 31. MORE USEFUL FEATURES TO ADD BEYOND THE ORIGINAL REQUEST

Design these as coherent, low-clutter additions. Implement local demo interactions where feasible; defer real service integrations until approved.

### A. Ask anonymously — with safeguards
A student may submit a question anonymously to a teacher or approved moderator, not anonymously to the whole internet. The system must explain who can see the identity, whether anonymity is real or only hidden from classmates, and the school's moderation policy. In the mockup, label the feature as a concept until those rules are agreed.

### B. “I don't understand” topic signals
Let students privately indicate that a published lesson or topic is confusing. Teachers can see aggregated counts for a class, not a public list shaming individual students. This is a feedback signal, not an attendance or grading feature.

### C. Lesson recap cards
At the end of a resource, show a short recap, key terms, “what to remember” and links to related notes/audio/practice. Only generate summaries automatically in production when a real service is connected and the teacher/content permissions allow it.

### D. Question parking lot
A shared, teacher-moderated list of questions to answer in the next lesson or revision session. Students can upvote a question only if enabled; limit popularity-driven behaviour and provide report controls.

### E. Study groups and shared goals
Allow students to join a teacher-approved or class-approved revision group with a topic, goal and next meeting time. In the initial mockup, use simple group cards and schedules. Do not create unrestricted private chat rooms.

### F. Personal notes and bookmarks
Let students save private notes against a lesson or topic, bookmark resources, and organise them into revision collections. Private notes must remain private in production unless the student explicitly shares them.

### G. “Ask the teacher” queue
A structured question submission tied to a subject/topic and resource, with states such as submitted, answered and needs clarification. The teacher sees a manageable queue and can answer once for the class when appropriate.

### H. Accessibility and learning preferences
Provide readable typography, keyboard access, transcripts, captions where available, reduced motion, adjustable text size where practical and audio-first alternatives. Do not claim that every video has captions unless they exist.

### I. School information centre
A trusted place for approved school rules, contact routes, calendars, timetable updates and official notices. Clearly distinguish official school content from student posts and demo placeholders.

### J. Student support and reporting
Add a discreet route to report a platform issue or a concerning post. Explain that School Hub is not an emergency service; provide only school-approved support contacts once supplied by the school. Do not invent emergency numbers or safeguarding contacts.

### K. Search across School Hub
Provide one global search for classes, announcements, assignments, published resources and discussion threads the user is authorised to see. Results must respect permissions and show type labels. Exclude private notes and private conversations from global search.

### L. Useful empty states and onboarding
First-time users should see a brief guided tour, clear next steps and helpful empty states. Examples: “No assignments yet”, “Your teacher has not published resources here yet”, and “Join your class with the code supplied by school”. Do not make empty pages look broken.

### M. Feedback and feature requests
Provide a simple pilot feedback form that asks what worked, what was confusing and what the user would improve. Avoid collecting unnecessary personal data. Route feedback to authorised project/school administrators and clearly label it as a prototype until wired up.

### N. Low-data mode
Offer a preference to reduce decorative images, previews and animation. Never autoplay media. Prefer text-first cards and manual loading of audio/video. In production, measure actual data usage before making specific savings claims.

### O. Notification centre
One place for assignment updates, new resources, teacher replies, upcoming live sessions and school announcements. Let users mark read, mute categories and manage reminders. Avoid exposing sensitive message contents in lock-screen notifications.

### P. Content lifecycle and quality
Resources need draft/published/archived states, clear ownership, last-updated date, and a report-outdated-content action. Teachers should be able to correct or withdraw inaccurate materials; admins can review flagged content.

## 32. TEACHER WORKSPACE — COMPLETE TEACHING TOOLS

The teacher experience must not be limited to a dashboard with a few action buttons. Provide a clear “Teaching Workspace” with:
- My classes and subject groups.
- Class resource library and resource publishing.
- Notes-to-audio studio.
- Podcast/audio episode publishing.
- Lesson/resource creation with draft preview.
- Assignment creation and submission review as a workflow; no official grading system is required.
- Practice quiz and flashcard deck creation.
- Live session scheduling.
- Class discussion moderation and unanswered questions.
- “I don't understand” topic feedback summary.
- Basic resource engagement counts where approved, such as views/completions, without implying mastery.
- Announcements and calendar items.
- Preview-as-student mode for checking how a resource will appear.

Every create/edit form needs required-field validation, save draft, cancel, confirmation before destructive actions and clear success/error feedback. In the mockup, persist changes only in local demo state and label them as simulated.

## 33. STUDENT HOME — PERSONAL, NOT OVERLOADED

Organise the student dashboard in this order:
1. Greeting and current class/arm.
2. “Continue learning” item based on recent demo activity.
3. Today's study goal and streak summary.
4. Upcoming deadlines and timetable item(s).
5. New teacher resources and audio episodes.
6. Upcoming live learning sessions.
7. Unanswered questions or teacher replies in followed discussions.
8. Recent official announcements.
9. Quick links to AI Tutor, Practice, Podcasts, Classes and My Progress.

Allow cards to be rearranged or hidden only if this can be implemented simply; do not spend time building a complex personalisation system before core flows work. Use concise cards and progressive disclosure to keep the dashboard usable on small phones.

## 34. ADMINISTRATOR AND SCHOOL CONTROLS — EXPANDED

In addition to the existing admin requirements, include:
- Teacher approval/rejection and ability to revoke teacher access.
- Class/arm, subject and class-code management.
- Ability to expire or revoke class codes and see membership counts.
- Content moderation queue for reported discussion posts/resources.
- Feature switches for AI Tutor, student discussions, anonymous questions, audio uploads and live learning.
- Basic content lifecycle controls and audit history for sensitive actions.
- Ability to publish official notices and identify them distinctly from class posts.
- Pilot feedback overview and simple usage metrics that do not over-collect student data.
- Configurable privacy/retention settings and clear account deactivation process in production.

Never rely on a hidden admin button as security. In production, the server must authorise every admin action. Demo role switching is only a prototype convenience and must never be copied into production authentication.

## 35. UPDATED NAVIGATION AND SCREEN INVENTORY

Keep the primary navigation short and group secondary tools under logical headings.

### Student navigation
- Home
- My Classes
- Assignments
- Learning Centre
  - Lessons & Notes
  - Podcasts & Audio
  - Live Learning
  - AI Tutor
  - Practice & Quizzes
  - Flashcards & Revision
  - My Progress
- Class Discussions
- Timetable & Calendar
- Announcements
- Saved Items
- Profile & Settings

### Teacher navigation
- Teaching Dashboard
- My Classes
- Resources & Notes
- Notes-to-Audio Studio
- Podcasts
- Assignments
- Practice & Flashcards
- Live Learning Scheduler
- Class Discussions & Questions
- Announcements
- Timetable & Calendar
- Profile & Settings

### Admin navigation
- Overview
- Users & Teacher Approvals
- Classes, Subjects & Codes
- Announcements
- Content Moderation
- Feature Controls
- Pilot Feedback & Metrics
- School Settings
- Audit History

On mobile, use a compact bottom navigation for the most common areas and a clearly labelled “More” menu for secondary screens. Do not force all subpages into a crowded bottom bar. Maintain a visible page title, back navigation where expected and a consistent location for profile/help controls.

## 36. DATA MODEL ADDITIONS FOR THE EXPANDED FEATURES

Extend the production data model only when the corresponding feature is approved. Suggested entities and relationships:
- `learning_resources`: type, title, subject/topic, class audience, owner, status, source, transcript reference, published/updated timestamps.
- `audio_episodes`: series, episode metadata, audio storage reference, transcript, duration, publication status and audience.
- `tts_jobs`: teacher, source resource, provider job identifier, processing status, generated audio reference, cost/usage metadata when available; never store provider secrets.
- `live_sessions`: host, audience, start/end time, meeting provider/reference, agenda, status and recording policy.
- `ai_tutor_conversations` and `ai_tutor_messages`: owner, timestamps, model/service metadata where appropriate, user-controlled deletion/retention; restrict access to the owner and explicitly authorised roles.
- `practice_sets`, `practice_questions`, `practice_attempts`: keep self-practice separate from official grading.
- `flashcard_decks`, `flashcards`, `flashcard_review_events`: deck owner, sharing permissions and review scheduling.
- `learning_goals`, `learning_activity_events`, `streak_summaries`, `achievements`, `user_achievements`: use minimal data and explain what counts as progress.
- `discussion_threads`, `discussion_replies`, `discussion_follows`, `discussion_bookmarks`, `content_reports`, `moderation_actions`.
- `teacher_questions`, `topic_confusion_signals`, `study_groups`, `study_group_memberships`.
- `saved_resources`, `personal_notes`, `notification_preferences`, `pilot_feedback`.

Use stable identifiers, timestamps and explicit ownership. Enforce class membership and content visibility in server-side access rules. Do not make private notes, AI conversations, reports or student activity public by default. Avoid storing duplicate data when a relationship or reference is sufficient. Add migrations and tests for production schema changes.

## 37. INTEGRATIONS AND REALITY CHECK

The mockup must clearly separate interface demonstrations from connected capabilities.

| Feature | Mockup expectation | Production dependency |
|---|---|---|
| Streaks and badges | Local simulated activity and progress | Persisted learning activity rules and account storage |
| Podcasts/audio | Sample audio controls or honest placeholders | Secure media storage, playback and content permissions |
| Teacher notes-to-audio | Simulated generation with clear demo label | Server-side text-to-speech provider, job status and cost controls |
| Live learning | Sample schedule and demo room | Approved conferencing provider or real-time system |
| AI Tutor | Clearly labelled sample conversation | Approved AI service, server-side key handling, privacy/cost controls |
| Discussion threads | Local demo create/reply/report actions | Database, authentication, moderation and notification service |
| Quizzes/flashcards | Local practice and sample answers | Persisted content and attempts; spaced-review logic if used |
| Notifications | Simulated notification centre | Real event processing and approved delivery channel |
| File/audio uploads | Simulated selection only, if not wired up | Protected storage, validation, limits and optional malware scanning |

Do not expose secret API keys in the browser or commit them to the repository. Do not silently sign users up for paid services. Before production integration, recommend a cost-conscious provider, explain data handling and costs, and request the project owner's approval.

## 38. EXPANDED MOCKUP ACCEPTANCE CHECKLIST

The expanded mockup is not complete until all of the following are satisfied, subject to the existing repository and tooling:
- A student can navigate from the dashboard to the Learning Centre and find Lessons, Podcasts/Audio, Live Learning, AI Tutor, Practice, Flashcards and My Progress.
- At least one demo podcast/audio lesson has a usable playback-style interface, progress display, transcript/bookmark affordances and honest demo status.
- A teacher can walk through a Notes-to-Audio form, preview the simulated result and save/publish a sample item locally.
- Live Learning has Upcoming, Live now and Past session states, a session detail screen and a clearly simulated join action if no provider is connected.
- AI Tutor shows a multi-turn guided learning example with follow-up prompts, hints and a feedback/report action.
- Practice and flashcards include a usable demo attempt/reveal/review flow.
- My Progress displays a learning goal, a streak, achievements and a personal activity summary, and sample completion actions can update local demo state.
- Class discussions include categories, search/filter, thread details, replies, pinned/answered states, bookmarks/following affordances, reporting and a demo moderation queue.
- Teacher workspace includes resource creation, audio publishing, practice creation, live scheduling and unanswered questions.
- Admin view includes feature controls and moderation tools as clearly simulated UI.
- Global search returns only fictional demo content the selected role is allowed to see.
- Empty, loading, error, success and validation states exist for important workflows.
- Layouts work at narrow mobile widths and desktop widths; forms and controls are keyboard-accessible and clearly labelled.
- No feature falsely claims to use a real AI model, database, live call, uploaded file or generated audio when it is only simulated.
- The original requirements remain intact: SS1 Dynamo and SS1 Horizon pilot, teacher approval, class codes, no boarding features, no attendance, and no official grading system in the first version.

## 39. IMPLEMENTATION ORDER — DO NOT BUILD EVERYTHING RANDOMLY

Build in coherent vertical slices so the project stays runnable:
1. Inspect the existing repository, preserve working code, identify framework and current routes.
2. Confirm the shared layout, navigation, responsive design tokens and demo role selector.
3. Finish student Home, My Classes, Announcements, Assignments, Timetable and Calendar.
4. Build the Learning Centre information architecture and resource detail view.
5. Add Podcasts/Audio and the teacher Notes-to-Audio workflow with honest simulated states.
6. Add Live Learning list, details, teacher scheduling and demo room.
7. Add AI Tutor conversation flow and feedback controls using demo responses only until an AI service is approved.
8. Add Practice, Flashcards, Revision Planner, My Progress, streaks and achievements.
9. Expand Class Discussions, thread workflows, reports and moderation queue.
10. Finish teacher and admin workspaces, feature controls and pilot feedback.
11. Add global search, notifications, onboarding, empty/error states and accessibility refinements.
12. Run available lint/type/build/test commands, fix errors and provide setup instructions.

If time is limited, complete each core user journey before polishing secondary animations. Do not create many disconnected placeholder pages with dead buttons. Prefer a smaller number of complete, believable flows over a large collection of empty screens.

## 40. FINAL EXPANDED INSTRUCTION TO THE CODING AI

You are continuing an existing School Hub project, not starting a duplicate. Inspect the repository and both the original plan and this master specification before editing. Preserve useful work and report the current state briefly. This expanded section adds required detail to the existing master specification; it does not replace the platform's earlier class, assignment, announcement, timetable, role, safety or technical requirements.

Build the complete interactive mockup around the first day-student pilot: SS1 Dynamo and SS1 Horizon. The Learning Centre must include lessons/notes, podcasts and audio lessons, teacher notes-to-audio, live learning, an interactive AI Tutor demonstration, practice quizzes, flashcards, revision planning, learning streaks and achievements. Class discussions must become structured, searchable, reply-enabled and moderated. Add the additional helpful features specified above when they can be built coherently.

Use fictional data and local demo state for prototype actions. Clearly label integrations that are not connected. Do not add real credentials, API keys, a fake backend, boarding-student support, attendance or official grading. Do not stop after proposing a plan: implement the agreed mockup, run checks, fix errors and explain how to run it. If a requirement conflicts with existing code or is too large for one pass, state the trade-off and complete the highest-value end-to-end flows first rather than silently omitting the feature.
