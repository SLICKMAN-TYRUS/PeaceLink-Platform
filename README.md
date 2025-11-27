# PeaceLink Platform

[![Django](https://img.shields.io/badge/Django-5.2.8-green.svg)](https://www.djangoproject.com/)
[![React](https://img.shields.io/badge/React-18+-blue.svg)](https://reactjs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Latest-blue.svg)](https://www.postgresql.org/)
[![License](https://img.shields.io/badge/License-Apache%202.0-orange.svg)](LICENSE)

PeaceLink is a comprehensive community-driven peacebuilding platform designed for youth, elders, NGOs, and local leaders across South Sudan and East Africa. It enables inclusive reporting, moderated dialogue, conflict resolution, and access to peacebuilding resources, even in low-connectivity environments. Built with an offline-first architecture and multilingual support (English, Arabic, Dinka, Juba Arabic, Nuer, Shiluk, Bari), PeaceLink bridges traditional leadership and modern technology to promote trust, safety, and collaboration.

## Table of Contents

- [Project Overview](#project-overview)
- [Current Status](#current-status)
- [Core Features](#core-features)
- [System Architecture](#system-architecture)
- [Tech Stack](#tech-stack)
- [Folder Structure](#folder-structure)
- [Setup Instructions](#setup-instructions)
- [Database Models](#database-models)
- [API Documentation](#api-documentation)
- [Admin Panel](#admin-panel)
- [Testing](#testing)
- [UML Diagrams](#uml-diagrams)
- [Development Roadmap](#development-roadmap)
- [Contributing](#contributing)
- [License](#license)

---

## Project Overview

PeaceLink empowers communities to report incidents, engage in forums, access verified resources, and participate in conflict resolution processes. With special attention to literacy challenges, the platform supports voice input, audio recording for elders, SMS alerts, and elder-led moderation to ensure culturally grounded, inclusive participation. The platform is designed to work offline and sync data when connectivity is restored.

**Key Differentiators:**
- **Voice-First Design**: Audio recording for elders with literacy challenges
- **7 Languages**: English, Arabic, Dinka, Juba Arabic, Nuer, Shiluk, Bari
- **Offline-First**: Works in low-connectivity areas with automatic sync
- **Trust System**: Community-driven verification with trust scores (0-100)
- **Role-Based**: Tailored experiences for citizens, elders, NGOs, officials, admins
- **Privacy-Focused**: Anonymous reporting, encrypted messaging, mediation support

---

## Current Status

**Last Updated:** November 27, 2025  
**Version:** 0.9.0 (Beta)  
**Status:** Backend Infrastructure Complete | API Development In Progress

### Completed (Backend)
- 35+ database models across 6 Django apps
- 63 migrations applied successfully
- Enhanced user system with verification & trust scores
- Forum system with audio recording & meeting scheduler
- Notification system with 12 notification types
- Emergency alert system with geo-targeting
- Community features (messaging, polls, events, achievements)
- Report tracking with 9-stage workflow
- Admin panel with 25+ registered models
- Sample data populated for testing

### In Progress
- REST API endpoints for community features
- Frontend integration for new features
- External service integrations (push notifications, SMS)

### Platform Metrics
- **Total Models:** 35
- **Database Tables:** 40+
- **Migrations:** 63 applied
- **Sample Users:** 30
- **Sample Reports:** 47
- **Sample Forum Posts:** 37

For detailed status, see [DEPLOYMENT_STATUS.md](./DEPLOYMENT_STATUS.md) and [VERIFICATION_REPORT.md](./VERIFICATION_REPORT.md).

---

## Core Features

### Implemented Features

#### 1. Enhanced User Management
- **Role-based access**: citizen, elder, ngo, official, admin
- **4-stage verification** (unverified → pending → verified → rejected)
- **Trust score algorithm** (0-100 based on contributions, helpful actions, verification)
- **Location tracking** (state, county, payam, GPS coordinates)
- **7-language support** with preferred language settings
- **Organization verification** for NGOs with document upload
- **Elder endorsement** system for community validation
- **Ambassador program** support for offline representatives

#### 2. Advanced Forum System
- Text-based discussions with 11 categories
- **Audio recording** for elders (illiterate users)
- File attachments (documents, images)
- Highlighted posts for high engagement
- Threaded replies with parent-child relationships
- Like system with user tracking
- Pinned topics for important discussions
- Topic locking to prevent unwanted replies

#### 3. Admin Meeting Scheduler
- **4 urgency levels** (critical, high, medium, normal)
- Multi-stakeholder leader invitations
- Google Meet integration
- Attendance tracking
- Action items and meeting notes
- Automated meeting reminders
- Meeting status workflow (scheduled, ongoing, completed, cancelled)

#### 4. Report Tracking System
- **9-stage status workflow**:
  - Submitted, Under Review, Verified, Assigned, In Progress, Resolved, Closed
  - Additional: Rejected, Escalated
- Assignment to staff members
- Resolution timeline tracking
- Comment system (internal & external)
- Follower system for interested parties
- Satisfaction ratings (1-5 stars)
- Complete status change history
- Automatic notifications on status changes

#### 5. Notification System
- **12 notification types**: report_status, meeting_invite, forum_reply, forum_mention, forum_like, message, emergency_alert, verification, resource_added, system, achievement, event
- **4 priority levels**: critical, high, medium, low
- **Multi-channel delivery**: push, SMS, email
- User preferences with quiet hours (e.g., 10 PM - 7 AM)
- Mark as read/unread tracking
- Batch notification support
- Action URLs for quick navigation
- Push and SMS delivery tracking

#### 6. Emergency Alert System
- **4 severity levels** (critical, severe, moderate, info)
- **9 alert types**: conflict, flood, drought, disease, evacuation, safety, curfew, food_shortage, infrastructure
- **Geographic targeting** (specific states, counties, regions)
- Broadcast to all users option
- Multi-channel delivery (push, SMS, WhatsApp)
- Delivery and read tracking
- Expiration dates for time-sensitive alerts
- Active/inactive status control

#### 7. Community Messaging
- 1-on-1 private conversations
- Group chats with custom names and avatars
- **Mediation mode** with designated mediator for conflict resolution
- Audio messages for voice communication
- File attachments
- Encryption flag for sensitive conversations
- Read receipts with read_by tracking

#### 8. Polls & Surveys
- **4 poll types**:
  - Single choice
  - Multiple choice
  - Rating scale (1-5)
  - Text response
- **Demographic targeting** (regions, roles, counties)
- Anonymous voting option
- Comments on poll options
- Real-time vote counting
- Start/end date scheduling
- Automatic percentage calculations
- Allow multiple votes option

#### 9. Event Calendar
- **7 event types**: meeting, ceremony, training, market, dialogue, celebration, other
- Location with GPS coordinates
- **RSVP system** (attending/interested)
- Max participants limit
- Automated reminders with configurable times
- Meeting links (Google Meet, Zoom)
- Public/private event settings
- Attendance counting
- Forum topic integration for discussions

#### 10. Gamification & Achievements
- **8 badge types**:
  - Peacemaker - Conflict resolution
  - Helper - Community assistance
  - Contributor - Active participation
  - Mediator - Dispute mediation
  - Reporter - Incident reporting
  - Leader - Community leadership
  - Mentor - Knowledge sharing
  - Innovator - Creative solutions
- Points system
- Progress tracking for multi-step achievements
- Achievement criteria configuration
- User achievement history with earned dates

#### 11. Success Stories
- Document resolved conflicts
- Before/after photos
- Video testimonials
- Participant tagging with many-to-many relationships
- Impact metrics (people impacted, community rating 1-5)
- Verification by moderators
- Featured stories for homepage
- View count tracking
- Link to related reports/forum topics

#### 12. Translation System
- **7 supported languages**: English, Arabic, Dinka, Juba Arabic, Nuer, Shiluk, Bari
- Content-addressable translation storage
- Field-level translation tracking
- Verified translations by language experts
- Support for any content type (reports, forum posts, resources)

#### 13. Offline Sync
- Action queue for offline operations
- Automatic sync when connectivity restored
- Timestamp tracking (created_at, synced_at)
- Action type categorization
- Sync status monitoring

#### 14. Resource Library
- **12 categories**: legal, mental health, education, employment, peacebuilding, health, agriculture, women's rights, child protection, conflict resolution, cultural, emergency
- **5 resource types**: PDF, audio, video, external link, text guide
- Bookmarking system
- Ratings and reviews
- View and download tracking
- Audio versions for illiterate users
- Tagging system
- Featured resources
- Verification by moderators

---

## System Architecture

PeaceLink follows a modern three-tier architecture:

```
┌─────────────────────────────────────────────────────────────┐
│                     FRONTEND LAYER                          │
│  React 18 + TypeScript + Vite + TailwindCSS               │
│  - Responsive UI with mobile-first design                  │
│  - Offline-first with service workers                      │
│  - Multi-language support (i18n)                           │
│  - Role-based routing and dashboards                       │
└─────────────────────────────────────────────────────────────┘
                            ↓ REST API
┌─────────────────────────────────────────────────────────────┐
│                     BACKEND LAYER                           │
│  Django 5.2.8 + Django REST Framework 3.16.1               │
│  ├── Users App - Authentication & profiles                 │
│  ├── Reports App - Incident reporting & tracking           │
│  ├── Forums App - Discussions & meetings                   │
│  ├── Notifications App - Alerts & notifications            │
│  ├── Community App - Messaging, polls, events              │
│  ├── Resources App - Knowledge library                     │
│  └── Analytics App - Metrics & insights                    │
└─────────────────────────────────────────────────────────────┘
                            ↓ ORM
┌─────────────────────────────────────────────────────────────┐
│                     DATABASE LAYER                          │
│  PostgreSQL 14+ with PostGIS extension                     │
│  - 35+ tables with optimized indexes                       │
│  - Full-text search capabilities                           │
│  - Geospatial queries for location-based features          │
│  - JSON fields for flexible data structures                │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                  EXTERNAL SERVICES                          │
│  - Firebase Cloud Messaging (push notifications)           │
│  - Twilio SMS Gateway (emergency alerts)                   │
│  - Google Maps API (geolocation & mapping)                 │
│  - Translation API (multi-language support)                │
│  - WhatsApp Business API (community outreach)              │
└─────────────────────────────────────────────────────────────┘
```

---

## Tech Stack

| Layer              | Technology                          | Purpose                                |
|--------------------|-------------------------------------|----------------------------------------|
| **Frontend**       | React 18, TypeScript, Vite          | Modern, type-safe UI framework        |
| **Styling**        | TailwindCSS, shadcn/ui             | Responsive, accessible design         |
| **State**          | React Context, React Query         | State management & data fetching      |
| **Backend**        | Django 5.2.8, DRF 3.16.1           | RESTful API server                    |
| **Database**       | PostgreSQL 14+                     | Relational database with JSON support |
| **Authentication** | Django Auth + JWT                  | Secure user authentication            |
| **File Storage**   | Django FileField + Cloud Storage   | Media and document management         |
| **Notifications**  | Firebase Cloud Messaging           | Push notifications                    |
| **SMS**            | Twilio SMS Gateway                 | Emergency alerts via SMS              |
| **Maps**           | Google Maps API                    | Geolocation and mapping               |
| **Translation**    | Custom + Translation APIs          | Multi-language support                |
| **Deployment**     | Docker, Docker Compose             | Containerized deployment              |

---

## Folder Structure

```
PeaceLink-Platform/
├── README.md                           # This file
├── LICENSE                             # Apache 2.0 License
├── DEPLOYMENT_STATUS.md                # Detailed deployment status
├── VERIFICATION_REPORT.md              # System verification results
├── IMPLEMENTATION_SUMMARY.md           # Feature implementation details
├── docker-compose.yml                  # Docker orchestration
├── Dockerfile                          # Container configuration
│
├── backend/                            # Django backend
│   ├── manage.py                       # Django management script
│   ├── requirements.txt                # Python dependencies
│   ├── create_sample_data.py          # Sample data generation
│   │
│   ├── peacelink/                     # Main Django project
│   │   ├── settings.py                # Project configuration
│   │   ├── urls.py                    # Main URL routing
│   │   ├── wsgi.py                    # WSGI configuration
│   │   │
│   │   ├── users/                     # User management
│   │   │   ├── models.py             # User, UserVerification
│   │   │   ├── admin.py              # Admin interface
│   │   │   └── serializers.py        # API serializers
│   │   │
│   │   ├── reports/                   # Incident reporting
│   │   │   ├── models.py             # Report, ReportStatusHistory, etc.
│   │   │   ├── admin.py              # Admin interface
│   │   │   └── serializers.py        # API serializers
│   │   │
│   │   ├── forums/                    # Forum discussions
│   │   │   ├── models.py             # ForumTopic, ForumPost, Meeting
│   │   │   ├── admin.py              # Admin interface
│   │   │   └── serializers.py        # API serializers
│   │   │
│   │   ├── notifications/             # Notification system
│   │   │   ├── models.py             # Notification, EmergencyAlert
│   │   │   ├── admin.py              # Admin interface
│   │   │   ├── serializers.py        # API serializers
│   │   │   ├── api_views.py          # REST API endpoints
│   │   │   └── utils.py              # Notification utilities
│   │   │
│   │   ├── resources/                 # Resource library
│   │   │   ├── models.py             # Resource, ResourceBookmark
│   │   │   ├── admin.py              # Admin interface
│   │   │   └── serializers.py        # API serializers
│   │   │
│   │   └── analytics/                 # Analytics & reporting
│   │       ├── models.py             # Analytics models
│   │       └── admin.py              # Admin interface
│   │
│   ├── community/                      # Community features (NEW)
│   │   ├── models.py                  # Messaging, Polls, Events, etc.
│   │   ├── admin.py                   # Admin interface
│   │   ├── serializers.py             # API serializers
│   │   └── migrations/                # Database migrations
│   │
│   └── tests/                          # Backend tests
│       └── __init__.py
│
├── frontend/                           # React frontend
│   ├── package.json                   # NPM dependencies
│   ├── tsconfig.json                  # TypeScript config
│   ├── vite.config.ts                 # Vite configuration
│   ├── tailwind.config.js             # TailwindCSS config
│   │
│   ├── client/                        # Main React app
│   │   └── src/
│   │       ├── main.tsx              # App entry point
│   │       ├── App.tsx               # Root component
│   │       │
│   │       ├── pages/                # Page components
│   │       │   ├── Dashboard.tsx
│   │       │   ├── Forums.tsx        # Enhanced with audio/meetings
│   │       │   ├── Reports.tsx
│   │       │   ├── Resources.tsx
│   │       │   └── Profile.tsx
│   │       │
│   │       ├── components/           # Reusable components
│   │       │   ├── NotificationBell.tsx
│   │       │   ├── AudioRecorder.tsx
│   │       │   ├── MeetingScheduler.tsx
│   │       │   └── ui/              # shadcn/ui components
│   │       │
│   │       ├── services/             # API services
│   │       │   ├── api.ts           # API client
│   │       │   └── auth.ts          # Authentication
│   │       │
│   │       ├── lib/                  # Utilities
│   │       │   ├── sample-forums-data.ts  # Sample data
│   │       │   └── utils.ts
│   │       │
│   │       └── localization/         # i18n translations
│   │           ├── en.json
│   │           ├── ar.json
│   │           └── dik.json
│   │
│   ├── assets/                        # Static assets
│   │   └── images/
│   │
│   └── test/                          # Frontend tests
│
├── diagrams/                           # UML diagrams (PlantUML)
│   ├── ActivityDiagram.puml
│   ├── ClassDiagram.puml
│   ├── ComponentDiagram.puml
│   ├── SequenceDiagram.puml
│   └── UseCaseDiagram.puml
│
├── docs/                               # Documentation
│   └── AppendixB/                     # Diagram explanations
│
└── scripts/                            # Deployment scripts
    ├── deploy.sh                      # Production deployment
    └── setup_env.sh                   # Environment setup
```

---

## Setup Instructions

### Prerequisites

- **Python 3.10+**
- **Node.js 18+**
- **PostgreSQL 14+**
- **Git**

### Quick Start (Running the Application)

#### Step 1: Start the Backend Server

1. **Navigate to the backend directory**
```bash
cd backend
```

2. **Activate virtual environment (if already set up)**
```bash
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. **Run the Django development server**
```bash
python3 manage.py runserver 8000
```

**Backend will be available at:** http://127.0.0.1:8000  
**Admin panel accessible at:** http://127.0.0.1:8000/admin/  
**Default admin credentials:** username: `admin` (password set during superuser creation)

#### Step 2: Start the Frontend Server

1. **Open a new terminal and navigate to the frontend directory**
```bash
cd frontend
```

2. **Run the React development server**
```bash
npm run dev:client
```

**Frontend will be available at:** http://localhost:5000/ (or next available port if 5000 is in use)

#### Step 3: Access the Application

- **Frontend Application:** http://localhost:5000/
- **Backend Admin Panel:** http://127.0.0.1:8000/admin/
- **API Endpoint:** http://127.0.0.1:8000/api/

**Sample Test Accounts:**
- Username: `chief_makuei` - Elder from Juba
- Username: `sarah_nyandeng` - NGO worker from Bor  
- Username: `james_lual` - Citizen from Malakal
- Username: `grace_achol` - Citizen from Wau

(Default password for test accounts is set in the sample data script)

### Full Setup (First Time Installation)

#### Backend Setup (Django)

1. **Clone the repository**
```bash
git clone https://github.com/SLICKMAN-TYRUS/PeaceLink-Platform.git
cd PeaceLink-Platform/backend
```

2. **Create and activate virtual environment**
```bash
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. **Install dependencies**
```bash
pip install -r requirements.txt
```

4. **Set up environment variables**
```bash
cp .env.example .env
# Edit .env with your database credentials and API keys
```

Required environment variables:
```env
DB_NAME=peacelink_db
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_HOST=localhost
DB_PORT=5432
SECRET_KEY=your-secret-key-here
DEBUG=True
```

5. **Create PostgreSQL database**
```bash
psql -U postgres
CREATE DATABASE peacelink_db;
CREATE USER your_db_user WITH PASSWORD 'your_db_password';
GRANT ALL PRIVILEGES ON DATABASE peacelink_db TO your_db_user;
\q
```

6. **Run migrations**
```bash
python3 manage.py makemigrations
python3 manage.py migrate
```

7. **Create superuser**
```bash
python3 manage.py createsuperuser
```

8. **Load sample data (optional)**
```bash
python3 manage.py shell < create_sample_data.py
```

9. **Run development server**
```bash
python3 manage.py runserver 8000
```

**Backend will be available at:** http://127.0.0.1:8000  
**Admin panel:** http://127.0.0.1:8000/admin/

**Verification Command** (check for issues):
```bash
python3 manage.py check
```

### Frontend Setup (React + Vite)

1. **Navigate to frontend directory**
```bash
cd ../frontend
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env
# Edit .env with your API URL
```

Required environment variables:
```env
VITE_API_URL=http://127.0.0.1:8000/api
VITE_GOOGLE_MAPS_API_KEY=your-maps-api-key
```

4. **Run development server**
```bash
npm run dev:client
```

**Frontend will be available at:** http://localhost:5000/

**Alternative development modes:**
- Full stack mode (requires server/index-dev.ts): `npm run dev`
- Client only: `npm run dev:client`

5. **Build for production**
```bash
npm run build
npm run preview  # Preview production build
```

### Troubleshooting

#### Backend Issues

**Problem:** Database connection errors  
**Solution:** Verify PostgreSQL is running and credentials in .env are correct
```bash
psql -U postgres -c "SELECT version();"
```

**Problem:** Migration errors  
**Solution:** Reset migrations and reapply
```bash
python3 manage.py migrate --fake-zero
python3 manage.py migrate
```

**Problem:** Import errors for models  
**Solution:** Ensure all apps are in INSTALLED_APPS in settings.py

#### Frontend Issues

**Problem:** Module not found errors  
**Solution:** Clear node_modules and reinstall
```bash
rm -rf node_modules package-lock.json
npm install
```

**Problem:** Port already in use  
**Solution:** Vite will automatically try the next available port (5001, 5002, etc.)

**Problem:** Failed to resolve import "@/lib/auth"  
**Solution:** Ensure auth.ts exists in client/src/lib/ with proper exports

### Docker Setup (Alternative)

1. **Build and run with Docker Compose**
```bash
docker-compose up --build
```

This will start:
- PostgreSQL database on port 5432
- Django backend on port 8000
- React frontend on port 5173

**Useful Docker commands:**
```bash
docker-compose down           # Stop all services
docker-compose logs backend   # View backend logs
docker-compose logs frontend  # View frontend logs
docker-compose ps             # List running services
```

---

## Database Models

### Core Models Overview

| App | Models | Purpose |
|-----|--------|---------|
| **users** | User, UserVerification | User management, verification, trust scores |
| **reports** | Report, ReportStatusHistory, ReportComment, ReportFollower | Incident reporting and tracking |
| **forums** | ForumTopic, ForumPost, ForumLike, Meeting | Discussions and meetings |
| **notifications** | Notification, NotificationPreference, EmergencyAlert | Alerts and notifications |
| **community** | Conversation, Message, Poll, PollOption, PollVote, Event, EventReminder, Achievement, UserAchievement, SuccessStory, Translation, OfflineData | Community engagement features |
| **resources** | Resource, ResourceBookmark | Knowledge library |
| **analytics** | ActivityLog | Usage tracking |

### Key Relationships

```
User
├─> Reports (author)
├─> ForumTopics (author)
├─> ForumPosts (author)
├─> Meetings (scheduled_by)
├─> Conversations (participants, M2M)
├─> PollVotes (voter)
├─> Events (organizer, attendees M2M)
└─> UserAchievements (earned achievements)

Report
├─> ReportStatusHistory (status changes)
├─> ReportComments (comments)
├─> ReportFollowers (followers, M2M)
└─> User (assigned_to, reviewed_by)

ForumTopic
└─> ForumPosts (posts)
    └─> ForumLikes (likes, M2M with User)

Meeting
├─> User (invited_leaders, M2M)
└─> User (attendees, M2M)

Poll
├─> PollOptions (choices)
└─> PollVotes (votes)
```

For complete model documentation, see [IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md).

---

## API Documentation

### Authentication Endpoints

```
POST   /api/auth/register/          # User registration
POST   /api/auth/login/             # User login
POST   /api/auth/logout/            # User logout
GET    /api/auth/user/              # Get current user
PUT    /api/auth/user/              # Update user profile
```

### Notification Endpoints

```
GET    /api/notifications/          # List notifications (with filters)
POST   /api/notifications/:id/mark-read/  # Mark notification as read
POST   /api/notifications/mark-all-read/  # Mark all as read
GET    /api/notifications/unread-count/   # Get unread count
DELETE /api/notifications/clear/           # Clear read notifications
GET    /api/notifications/preferences/     # Get preferences
PUT    /api/notifications/preferences/     # Update preferences
```

### Emergency Alert Endpoints

```
GET    /api/emergency-alerts/       # List alerts (filtered by location)
POST   /api/emergency-alerts/       # Create alert (admin only)
GET    /api/emergency-alerts/:id/   # Get alert details
PUT    /api/emergency-alerts/:id/   # Update alert (admin only)
DELETE /api/emergency-alerts/:id/   # Delete alert (admin only)
POST   /api/emergency-alerts/:id/deactivate/  # Deactivate alert
```

### Report Endpoints

```
GET    /api/reports/                # List reports
POST   /api/reports/                # Create report
GET    /api/reports/:id/            # Get report details
PUT    /api/reports/:id/            # Update report
DELETE /api/reports/:id/            # Delete report
POST   /api/reports/:id/follow/     # Follow report
POST   /api/reports/:id/comment/    # Add comment
GET    /api/reports/:id/history/    # Get status history
```

### Forum Endpoints

```
GET    /api/forums/topics/          # List topics
POST   /api/forums/topics/          # Create topic
GET    /api/forums/topics/:id/      # Get topic details
POST   /api/forums/posts/           # Create post (with audio/attachment)
GET    /api/forums/posts/:id/       # Get post details
POST   /api/forums/posts/:id/like/  # Like/unlike post
GET    /api/forums/meetings/        # List meetings
POST   /api/forums/meetings/        # Schedule meeting (admin only)
```

### Community Endpoints (In Development)

```
# Messaging
GET    /api/conversations/          # List conversations
POST   /api/conversations/          # Create conversation
GET    /api/conversations/:id/messages/  # Get messages
POST   /api/messages/               # Send message

# Polls
GET    /api/polls/                  # List polls
POST   /api/polls/                  # Create poll
POST   /api/polls/:id/vote/         # Vote on poll
GET    /api/polls/:id/results/      # Get poll results

# Events
GET    /api/events/                 # List events
POST   /api/events/                 # Create event
POST   /api/events/:id/rsvp/        # RSVP to event

# Achievements
GET    /api/achievements/           # List achievements
GET    /api/users/:id/achievements/ # Get user achievements
```

For complete API documentation, see [IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md).

---

## Admin Panel

Access the Django admin panel at: **http://127.0.0.1:8000/admin/**

### Available Admin Interfaces

#### Users App
- **Users** - Manage users, verification status, trust scores
- **User Verifications** - Review verification requests

#### Reports App
- **Reports** - View and manage incident reports
- **Report Status History** - Track status changes
- **Report Comments** - Manage comments
- **Report Followers** - View report subscriptions

#### Forums App
- **Forum Topics** - Manage discussion topics
- **Forum Posts** - Moderate posts (including audio)
- **Forum Likes** - View like activity
- **Meetings** - Schedule and manage meetings

#### Notifications App
- **Notifications** - View all notifications
- **Notification Preferences** - Manage user preferences
- **Emergency Alerts** - Create and manage alerts

#### Community App
- **Conversations** - View conversations
- **Messages** - Monitor messages
- **Polls** - Manage polls and votes
- **Events** - Manage events and RSVPs
- **Achievements** - Configure achievements
- **Success Stories** - Review and feature stories
- **Translations** - Verify translations
- **Offline Data** - Monitor sync queue

#### Resources App
- **Resources** - Manage resource library
- **Resource Bookmarks** - View user bookmarks

---

## Testing

### Backend Tests

```bash
cd backend

# Run all tests
python3 manage.py test

# Run tests for specific app
python3 manage.py test peacelink.users
python3 manage.py test peacelink.reports
python3 manage.py test community

# Run tests with coverage
coverage run --source='.' manage.py test
coverage report
coverage html  # Generate HTML report
```

### Frontend Tests

```bash
cd frontend

# Run unit tests
npm test

# Run tests with coverage
npm run test:coverage

# Run E2E tests
npm run test:e2e
```

### Manual Testing

Use the sample data script to populate the database:

```bash
cd backend
python3 manage.py shell < create_sample_data.py
```

This creates:
- 30 users (citizens, elders, NGOs)
- 3 forum topics with posts
- 2 reports
- 1 meeting
- 1 poll with 5 options
- 3 achievements

---

## UML Diagrams

All diagrams are located in `diagrams/` and `docs/AppendixB/`:

- **Use Case Diagram** - System actors and their interactions
- **Class Diagram** - Database models and relationships
- **Sequence Diagram** - Request/response flows
- **Activity Diagram** - User workflows
- **Component Diagram** - System architecture

Each diagram includes formal explanations aligned with software engineering standards.

---

## Development Roadmap

### Phase 1: Core Infrastructure - COMPLETE
- [x] Database models and migrations
- [x] User authentication and roles
- [x] Basic reporting system
- [x] Forum discussions
- [x] Admin panel setup

### Phase 2: Enhanced Features - COMPLETE
- [x] Audio recording for elders
- [x] Meeting scheduler
- [x] Notification system
- [x] Emergency alerts
- [x] Trust score system
- [x] Report tracking (9 stages)
- [x] Community messaging
- [x] Polls and surveys
- [x] Event calendar
- [x] Gamification

### Phase 3: API Development - IN PROGRESS
- [x] Notification endpoints
- [x] Emergency alert endpoints
- [ ] Community messaging endpoints
- [ ] Poll endpoints
- [ ] Event endpoints
- [ ] Achievement endpoints
- [ ] User verification endpoints

### Phase 4: Frontend Integration - PLANNED
- [ ] Notification bell component
- [ ] Emergency alert banner
- [ ] Messaging interface
- [ ] Poll creation and voting
- [ ] Event calendar view
- [ ] Achievement badges display
- [ ] Success stories showcase

### Phase 5: External Integrations - PLANNED
- [ ] Firebase Cloud Messaging (push notifications)
- [ ] Twilio SMS Gateway (emergency alerts)
- [ ] Google Maps API (geolocation)
- [ ] Translation API (multi-language)
- [ ] WhatsApp Business API

### Phase 6: Advanced Features - FUTURE
- [ ] AI-powered conflict detection
- [ ] Sentiment analysis on forum posts
- [ ] Video conferencing integration
- [ ] Mobile app (React Native)
- [ ] SMS-based reporting
- [ ] Offline mobile sync
- [ ] Advanced analytics dashboard
- [ ] Content moderation tools
- [ ] Hate speech detection

---

## Contributing

We welcome contributions from the community! Here's how you can help:

### Getting Started

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow PEP 8 for Python code
- Use ESLint/Prettier for JavaScript/TypeScript
- Write unit tests for new features
- Update documentation as needed
- Keep commits atomic and well-described

### Code Review Process

1. All PRs require at least one review
2. CI/CD tests must pass
3. Code coverage should not decrease
4. Documentation must be updated

### Reporting Issues

Use GitHub Issues to report bugs or request features. Please include:
- Clear description of the issue
- Steps to reproduce
- Expected vs actual behavior
- Screenshots (if applicable)
- Environment details (OS, browser, versions)

---

## License

This project is licensed under the **Apache License 2.0**. See the [LICENSE](LICENSE) file for details.

### Key Points:
- Free to use, modify, and distribute
- Commercial use allowed
- Patent rights granted
- Must include original copyright notice
- Must state significant changes made
- No trademark rights granted

---

## Acknowledgments

- **South Sudanese Communities** - For inspiring this platform
- **Local Elders** - For guidance on traditional conflict resolution
- **NGO Partners** - For fieldwork insights and feedback
- **Open Source Community** - For the amazing tools and libraries

---

## Support

- **Documentation**: [docs/](./docs/)
- **GitHub Issues**: [Report a bug](https://github.com/SLICKMAN-TYRUS/PeaceLink-Platform/issues)
- **Email**: support@peacelink.org (placeholder)

---

## Project Status

**Status**: Active Development  
**Last Updated**: November 27, 2025  
**Version**: 0.9.0 (Beta)  
**Next Release**: v1.0.0 - Q1 2026

---

**Built with care for peace in South Sudan and East Africa**



