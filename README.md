# School Hub — Master Visual Mockup & Interactive Prototype

Interactive front-end visual mockup of **School Hub**, tailored specifically for the day-student pilot involving **SS1 Dynamo** and **SS1 Horizon**.

Built with **React 19**, **TypeScript**, **Vite**, and **Lucide Icons** implementing the complete design, interactions, and workflows specified in [`School_Hub_Master_Specification (5).md`](./School_Hub_Master_Specification%20(5).md) and [`original-plan.md`](./original-plan.md).

---

## 🚀 How to Run the Project

### Prerequisites
- Node.js (v18+)
- npm (v9+)

### Commands

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the local development server**:
   ```bash
   npm run dev
   ```
   Open your browser to: **[http://localhost:5173](http://localhost:5173)** or **[http://127.0.0.1:5173](http://127.0.0.1:5173)**.

3. **Validate TypeScript & production build**:
   ```bash
   npm run build
   ```

---

## 🧭 Implemented Master Specification Modules

| Module / Screen | Persona | Features & Local Interactivity |
| :--- | :--- | :--- |
| **Welcome / Entry** | Public | Headline (*"Your school, connected."*), pilot badges, 1-click persona launchers, prototype disclaimers. |
| **Demo Sign-In** | All | Simulated credentials, show/hide password, form validation, quick role presets. |
| **Student Dashboard** | Student | Morning greeting (*"Good morning, Ada 👋"*), pilot cards, upcoming assignments, timetable highlights, announcements. |
| **My Classes** | Student | SS1 Dynamo & SS1 Horizon subject hubs, **Join with Class Code modal** simulation, stream filter pills. |
| **Class Detail** | Student | Tabs: *Overview*, *Classwork*, *Resources*, *Discussions*, handouts download simulation, notices. |
| **Assignments & Tasks** | Student | Filter chips (*All, Not Started, In Progress, Submitted, Past Due*), search, submission form, mock file attacher, green confirmation banner. |
| **School Announcements** | All | Categories (*Class Update, General Notice, Event*), read/unread status, full modal dialog reader. |
| **Timetable & Calendar** | All | **Weekly Schedule** (Monday–Friday periods, room numbers) + **Academic Calendar & Deadlines** (Continuous Assessment week, science symposium). |
| **Learning Centre** | All | Filter categories (*Revision Notes, Video Guides, Worksheets, Past Papers, Teacher Resources*), document preview modal, **Planned AI Revision Helper concept banner**. |
| **Class Discussions** | Student / Teacher | Moderated forum threads, rule reminder banner, reply composer (updates state), **Flag / Report to Admin queue action**. |
| **Teacher Dashboard** | Teacher | **Verified Instructor credentials badge**, taught classes, student submissions inbox, **Create Assignment modal**, **Broadcast Notice modal**. |
| **Administrator Console** | Admin | **Teacher Access Requests Queue (Approve / Decline)**, **Class Codes & Keys Manager (Generate & Revoke)**, **Content Moderation Queue**, User Directory. |
| **Profile & Settings** | All | Editable display name (updates live across app), notification preference toggles, prototype reset button. |
| **Global Prototype Shell** | All | Persistent top banner with instant 1-click role switcher, ESC-friendly search modal (`/`), mobile bottom navigation and drawer. |

---

## 👥 Personas Included

- **Adaeze (Ada) Okonkwo** — Day Student (*SS1 Dynamo*)
- **Mr. Babatunde Alabi** — Lead Teacher (*Mathematics & Physics*, verified by administration)
- **Mrs. Clara Nnamdi** — Pilot Coordinator / Administrator (*Vice Principal*)

---

## 🔒 Scope Exclusions (As Specified)

This prototype is intentionally a **front-end visual mockup**:
- No real database or password authentication (all actions mutate local browser session state).
- Excludes boarding-student or hostel workflows (day-student pilot only).
- Excludes gradebooks, financial accounting/fees, and live tracking.
