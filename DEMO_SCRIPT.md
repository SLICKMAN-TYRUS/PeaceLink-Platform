# PeaceLink Platform - 9-Minute Demo Script

**Date:** November 22, 2025  
**Presenter:** SLICKMAN-TYRUS  
**Target Time:** 8-9 minutes  
**Assignment Due:** Friday 28th, 2 am.

---

## Grading Rubric Alignment (30 Points Total)

1. **System Requirements Reflection (10 points)** - Show SRS features in prototype
2. **Presentation Skills (5 points)** - Clear, audible, articulate delivery
3. **Code Availability (5 points)** - Public GitHub, clear README
4. **Solution Deployment (5 points)** - Public URL access
5. **Operation (5 points)** - Login, signup, buttons, redirections working

---

## Pre-Demo Checklist (5 Minutes Before Recording)

### Backend Server
```bash
cd backend
python3 manage.py runserver 8000
# Verify at http://127.0.0.1:8000/admin/
# Login: admin / your_password
```

### Frontend Server
```bash
cd frontend
npm run dev:client
# Verify at http://localhost:5000/
```

### Browser Tabs Setup (Open Before Recording)
1. **Tab 1:** Frontend - http://localhost:5000/
2. **Tab 2:** Admin Panel - http://127.0.0.1:8000/admin/
3. **Tab 3:** GitHub Repository - https://github.com/SLICKMAN-TYRUS/PeaceLink-Platform
4. **Tab 4:** README.md preview (for documentation showcase)

### Test Credentials Ready
- **Admin:** username: `admin` / password: [your password]
- **Test User:** username: `chief_makuei` / password: [sample data password]
- **NGO Worker:** username: `sarah_nyandeng`
- **Citizen:** username: `james_lual`

---

## Demo Script (8-9 Minutes)

### OPENING - Introduction (45 seconds) [0:00-0:45]

**[Screen: Landing Page - http://localhost:5000/]**

> "Good morning/afternoon. I'm presenting **PeaceLink**, a comprehensive community-driven peacebuilding platform designed for South Sudan and East Africa. 
>
> This platform addresses critical challenges in conflict resolution by bridging traditional leadership with modern technology. It enables youth, elders, NGOs, and local leaders to report incidents, engage in moderated dialogue, and access verified peacebuilding resources—even in low-connectivity environments.
>
> PeaceLink directly implements the requirements outlined in our Software Requirements Specification document, which I'll demonstrate over the next 8 minutes."

**ACTION:** Scroll slowly down the landing page showing features

---

### SECTION 1 - System Requirements & Key Features (90 seconds) [0:45-2:15]

**[Screen: Still on Landing Page]**

> "Our SRS identified five critical requirements, all implemented in this prototype:
>
> **First, Inclusive Reporting:** The platform supports anonymous reporting with multi-language support across 7 languages including English, Arabic, Dinka, Juba Arabic, Nuer, Shiluk, and Bari. Reports include location tracking, urgency levels, and a 9-stage status workflow from submission to resolution.
>
> **Second, Voice-First Design:** For elders and users with literacy challenges, we've implemented audio recording capabilities in forum discussions. This is visible in our Peace Talks forum feature.
>
> **Third, Role-Based Access:** You can see here we have five distinct portals—Youth Hub, Community Elders, Local Government, Moderation Team, and Admin Console. Each role has a tailored dashboard and permissions."

**ACTION:** Point to the "Choose your path" section showing all 5 role portals

> "**Fourth, Trust & Verification System:** The platform includes a trust score algorithm ranging from 0-100, community verification workflows, and achievement badges for peacemakers.
>
> **And fifth, Offline-First Architecture:** With automatic data sync, action queuing, and local caching for low-connectivity areas."

**ACTION:** Scroll to show "Why PeaceLink?" features (Safe Reporting, Dialogue, Verified Info)

---

### SECTION 2 - User Authentication & Navigation (60 seconds) [2:15-3:15]

**[Screen: Landing Page → Login]**

> "Let me demonstrate the authentication flow. I'll click Login..."

**ACTION:** Click "Login" button in top-right

**[Screen: Login Page]**

> "The login page provides test accounts for different roles. I'll log in as an elder from the community."

**ACTION:** 
- Enter username: `chief_makuei`
- Enter password: [sample password]
- Click "Sign In"

**[Screen: Dashboard loads]**

> "Upon successful authentication, users are automatically redirected to their role-specific dashboard. As you can see, the navigation includes a persistent header with back button, home button, notification bell, and menu options—ensuring seamless navigation throughout the platform."

**ACTION:** Hover over header icons briefly, then show bottom navigation

> "The bottom navigation provides quick access to Home, Report, Forums, and Resources—the four core features accessible across all user roles."

---

### SECTION 3 - Core Feature: Incident Reporting (75 seconds) [3:15-4:30]

**[Screen: Dashboard → Report]**

**ACTION:** Click "Report" in bottom navigation

**[Screen: Report Form]**

> "The reporting feature implements our SRS requirements comprehensively. Let me walk through a sample report submission."

**ACTION:** Start filling the form while narrating

> "Users can select from 12 report categories including conflict, violence, resource disputes, and humanitarian issues. The form captures:
> - Location with state, county, and payam specificity
> - Multi-language description support
> - Incident date and urgency level
> - Number of people affected
> - Anonymous reporting option for safety
> - Contact preferences—SMS, phone, or WhatsApp"

**ACTION:** Scroll to show audio recording feature

> "Critical for our context: voice recording capability. Users can record their report in their native language if they cannot write. This directly addresses our literacy challenge requirement."

**ACTION:** Show file attachment option

> "Photo and document attachments are supported with a 10MB limit per file."

**ACTION:** Scroll to bottom but don't submit

> "Reports feed into our 9-stage tracking workflow: submitted, under review, verified, assigned, in progress, resolved, and closed—with additional paths for rejection or escalation."

---

### SECTION 4 - Forums & Voice Recording (75 seconds) [4:30-5:45]

**[Screen: Report → Forums]**

**ACTION:** Click "Forums" in bottom navigation

**[Screen: Peace Talks Forum]**

> "The Peace Talks forum implements our moderated dialogue requirement. We have three main tabs: Discussions, Highlighted Posts, and Meetings."

**ACTION:** Show the tabs

> "Forums are organized into 11 categories addressing local issues: Water Access Crisis, Youth Employment, Cattle Disputes, Land Conflicts, and more. Each topic shows engagement metrics—views, replies, and likes."

**ACTION:** Scroll through forum topics

> "Let me show the audio recording feature for elders—this is a key differentiator."

**ACTION:** Click "Create New Post" button

**[Screen: Create Post Dialog]**

> "When creating a post, users can type their message OR record audio. This is specifically designed for community elders who may not be literate but have valuable wisdom to share."

**ACTION:** Point to audio recording icon and file attachment option

> "Posts can include text, audio recordings, and file attachments. The platform also supports threaded replies, likes, and post highlighting for high-engagement discussions."

**ACTION:** Close dialog, switch to "Meetings" tab

**[Screen: Meetings Tab]**

> "The Meetings tab shows our admin meeting scheduler feature. Meetings have four urgency levels—critical, high, medium, normal—with Google Meet integration, invited leaders tracking, and attendance management."

**ACTION:** Show the sample meeting with invited leaders

---

### SECTION 5 - Resources & Documentation (45 seconds) [5:45-6:30]

**[Screen: Forums → Resources]**

**ACTION:** Click "Resources" in bottom navigation

**[Screen: Resources Library]**

> "The resource library provides verified peacebuilding content across 12 categories: legal aid, mental health, education, employment, health, agriculture, women's rights, child protection, and more."

**ACTION:** Scroll through resources

> "Resources come in five types: PDFs, audio files, videos, external links, and text guides. Notice the audio versions—again addressing literacy challenges. Users can bookmark resources, rate them, and filter by category or type."

**ACTION:** Show filtering options at top

> "Featured resources are highlighted, and all content is verified by moderators to prevent misinformation."

---

### SECTION 6 - Admin Panel & Backend (75 seconds) [6:30-7:45]

**[Screen: Resources → Landing Page]**

**ACTION:** Click back/home to return to landing page, scroll to "Choose your path" section

> "Let me demonstrate the admin capabilities. The Admin Console button here links directly to our Django admin panel."

**ACTION:** Click "Admin Console" portal (opens new tab)

**[Screen: Django Admin Login]**

**ACTION:** Login with admin credentials

**[Screen: Django Admin Dashboard]**

> "This is the Django administration panel where administrators manage the entire platform. You can see we have 6 main application areas with 35+ database models."

**ACTION:** Scroll through the admin index showing all apps

> "Administrators can:
> - Manage all users, verification requests, and trust scores
> - Review and moderate reports with complete status history
> - Configure forum topics, posts, and scheduled meetings
> - Send notifications with 12 types and 4 priority levels
> - Create emergency alerts with geographic targeting
> - Manage community features: polls, events, achievements
> - Configure the resource library
> - Access analytics for platform insights"

**ACTION:** Click into "Users" to show user management

**[Screen: User List in Admin]**

> "Here we can see our 30 sample users including citizens, elders, NGO workers, and officials. Each user has trust scores, verification status, location data, and language preferences."

**ACTION:** Go back to admin home

> "The backend is fully operational with 63 migrations applied, zero system errors, and all relationships functioning correctly."

---

### SECTION 7 - GitHub & Documentation (45 seconds) [7:45-8:30]

**[Screen: Switch to GitHub Tab]**

> "Moving to code availability—a key rubric criterion. The entire codebase is publicly available on GitHub at github.com/SLICKMAN-TYRUS/PeaceLink-Platform."

**ACTION:** Scroll through repository structure

> "The repository includes comprehensive documentation:
> - A detailed README with setup instructions, architecture diagrams, and feature descriptions
> - All backend code: Django models, admin interfaces, API serializers
> - Complete frontend: React components, TypeScript pages, UI library
> - Database migrations—all 63 successfully applied
> - Sample data generation scripts
> - UML diagrams: Use Case, Class, Sequence, Activity, and Component diagrams
> - Deployment status and verification reports"

**ACTION:** Click on README.md to show preview

**[Screen: README Preview]**

> "The README provides step-by-step instructions for running both servers, troubleshooting common issues, environment setup, and all access credentials. Everything needed for setup is documented."

---

### SECTION 8 - Technical Architecture (30 seconds) [8:30-9:00]

**[Screen: Scroll to Architecture section in README]**

> "Quick technical overview: We're using a modern three-tier architecture.
>
> **Frontend:** React 18 with TypeScript, Vite for build tooling, TailwindCSS for styling, and shadcn/ui for accessible components.
>
> **Backend:** Django 5.2.8 with Django REST Framework for API endpoints, comprehensive admin interfaces, and role-based permissions.
>
> **Database:** PostgreSQL 14+ with 40+ tables, optimized indexes, full-text search, and geospatial query support via PostGIS extension.
>
> The platform is containerized with Docker for easy deployment and includes integration points for external services like Firebase Cloud Messaging, Twilio SMS Gateway, and Google Maps API."

---

### CLOSING - Summary & Impact (30 seconds) [9:00-9:30]

**[Screen: Return to Frontend Landing Page]**

> "In summary, PeaceLink delivers on all Software Requirements Specification objectives:
>
> We've implemented inclusive reporting with voice recording for elders, moderated forums for dialogue, a comprehensive resource library, role-based access control, trust scoring and verification systems, and admin tools for platform management.
>
> The platform is fully operational with 35 database models, 63 migrations, sample data for testing, and zero system errors. Both frontend and backend servers are running successfully, all code is publicly available on GitHub with complete documentation, and the application demonstrates seamless navigation with login, signup, and feature interactions working as intended.
>
> This addresses the critical need for accessible, culturally-grounded peacebuilding technology in South Sudan and East Africa. Thank you."

**[Screen: End on landing page or GitHub repository]**

---

## Post-Demo Checklist

### Submission Requirements

1. **Video Recording (5-10 minutes)**
   - File format: MP4, MOV, or AVI
   - Upload to Google Drive or YouTube (unlisted)
   - Get shareable link

2. **Google Doc Submission**
   - Video link
   - GitHub repository: https://github.com/SLICKMAN-TYRUS/PeaceLink-Platform
   - SRS document link
   - Public URL (if deployed): http://localhost:5000/ (or deployment URL)

3. **GitHub Repository Status**
   - Ensure repository is PUBLIC
   - README.md is complete and formatted
   - All code is committed and pushed
   - No sensitive credentials in code

---

## Backup Talking Points (If Time Remaining)

### Additional Features to Mention:
- **Notification System:** 12 notification types with 4 priority levels
- **Emergency Alerts:** 4 severity levels, 9 alert types, geographic targeting
- **Community Messaging:** Direct messages, group chats, mediation mode
- **Polls & Surveys:** 4 poll types with demographic targeting
- **Event Calendar:** 7 event types with RSVP system
- **Gamification:** 8 badge types (Peacemaker, Helper, Mediator, etc.)
- **Success Stories:** Document resolved conflicts with impact metrics
- **Translation System:** Content-addressable translation storage
- **Offline Sync:** Action queue with automatic sync when online

### Technical Depth Points:
- "Our database schema includes 35 models with optimized indexes and foreign key relationships"
- "The trust score algorithm ranges from 0-100 based on contributions, verification, and community endorsements"
- "Reports support a 9-stage workflow with complete status history tracking and follower subscriptions"
- "The platform supports 7 languages with field-level translation tracking"

---

## Troubleshooting During Demo

### If Frontend Crashes:
```bash
# Quick restart
pkill -f "vite dev"
cd frontend && npm run dev:client
```

### If Backend Errors:
```bash
# Quick restart
cd backend
python3 manage.py runserver 8000
```

### If Login Fails:
- Use test account: `chief_makuei`
- Or create new superuser: `python3 manage.py createsuperuser`

### If Page Won't Load:
- Check terminal for errors
- Hard refresh: Ctrl+Shift+R (Windows/Linux) or Cmd+Shift+R (Mac)
- Clear browser cache

---

## Key Phrases for Rubric Points

**For "System Requirements Reflection" (10 pts):**
- "This implements requirement X from our SRS document..."
- "Our proposal specified [feature], which you can see here..."
- "This directly addresses the [user need] identified in our requirements..."

**For "Presentation Skills" (5 pts):**
- Speak clearly and confidently
- Maintain steady pacing (not too fast)
- Use transitional phrases: "Moving on to...", "Next, I'll demonstrate...", "As you can see..."
- Point out features explicitly: "Notice here...", "You can see that..."

**For "Code Availability" (5 pts):**
- "The complete codebase is publicly available on GitHub..."
- "The README provides comprehensive setup instructions..."
- "All 35 models and 63 migrations are included..."

**For "Solution Deployment" (5 pts):**
- "Both servers are running successfully..."
- "The frontend is accessible at localhost:5000..."
- "The backend admin panel is at localhost:8000/admin..."

**For "Operation" (5 pts):**
- Demonstrate actual login/signup
- Click through multiple pages
- Show navigation working
- Interact with forms and buttons
- Show redirections after login

---

## Time Management Guide

- **0-2 min:** Intro + Requirements Overview
- **2-4 min:** Authentication + Reporting Demo
- **4-6 min:** Forums + Audio Recording
- **6-8 min:** Admin Panel + GitHub
- **8-9 min:** Architecture + Closing

**Stay within 9 minutes!** If running long, skip "Backup Talking Points" section.

---

## Final Pre-Recording Checklist

- [ ] Both servers running (backend port 8000, frontend port 5000)
- [ ] Browser tabs open (Frontend, Admin, GitHub, README)
- [ ] Test login credentials ready
- [ ] Sample data loaded (30 users, 47 reports, 37 forum posts)
- [ ] Screen recording software ready (OBS, QuickTime, etc.)
- [ ] Audio quality tested (clear microphone)
- [ ] Notifications/popups disabled
- [ ] Clean desktop (close unnecessary windows)
- [ ] Script printed or on second monitor
- [ ] Timer/clock visible

---

