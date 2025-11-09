# PeaceLink Platform

PeaceLink is a community-driven peacebuilding platform designed for youth, elders, NGOs, and local leaders across East Africa. It enables inclusive reporting, moderated dialogue, and access to peacebuilding resources — even in low-connectivity environments. Built with an offline-first architecture and multilingual support, PeaceLink bridges traditional leadership and modern technology to promote trust, safety, and collaboration.

## Table of Contents

- [Project Overview](#project-overview)
- [Core Features](#core-features)
- [System Architecture](#system-architecture)
- [Tech Stack](#tech-stack)
- [Folder Structure](#folder-structure)
- [Setup Instructions](#setup-instructions)
- [UML Diagrams](#uml-diagrams)
- [Future Enhancements](#future-enhancements)
- [License](#license)

---

## Project Overview

PeaceLink empowers communities to report incidents, engage in forums, and access verified resources. It supports voice input, SMS alerts, and elder-led moderation to ensure culturally grounded, inclusive participation. The platform is designed to work offline and sync data when connectivity is restored.

---

## Core Features

### Functional Modules

- Report Submission: Submit incidents with text, media, and location. Offline caching supported.
- Forum Discussions: Participate in moderated forums. Posts can be tagged as “trusted” if endorsed by elders.
- Resource Hub: Access peacebuilding guides, videos, and audio content in multiple languages.
- Alerts & Notifications: Receive emergency alerts via push and SMS.
- Voice Notes: Record and share voice messages in forums.
- Live Calls: Real-time voice calls for community coordination (planned).
- Offline Sync Engine: Automatically syncs cached reports and posts when online.
- Multilingual Support: Interface and content available in local languages.
- Role-Based Access: Tailored dashboards for youth, elders, moderators, NGOs, and admins.
- Analytics Dashboard: View trends, heatmaps, and report statistics.
- Verification Workflow: Elders and moderators validate reports and posts.
- Geolocation Mapping: Visualize reports and alerts on maps.

---

## System Architecture

PeaceLink is structured into four main layers:

- Frontend (Flutter): Mobile app for youth and elders with offline-first logic, voice input, and multilingual UI.
- Backend (Django): RESTful API handling authentication, report processing, moderation, and notifications.
- Database (MongoDB Atlas): Cloud-based storage for users, reports, forum posts, and resources.
- External Services:
- Firebase Auth (authentication)
- Twilio SMS Gateway (alerts)
- Google Maps API (geolocation)

---

## Tech Stack

| Layer        | Technology         |
|--------------|--------------------|
| Frontend     | Flutter             |
| Backend      | Django REST Framework |
| Database     | MongoDB Atlas       |
| Auth         | Firebase Auth       |
| Notifications| Twilio SMS Gateway  |
| Mapping      | Google Maps API     |

---

## Folder Structure

peacelink-platform/ ├── README.md ├── .gitignore ├── frontend/           # Flutter mobile app │   ├── lib/ │   │   ├── screens/ │   │   ├── widgets/ │   │   ├── models/ │   │   ├── services/ │   │   ├── localization/ │   │   └── main.dart │   └── assets/ ├── backend/            # Django backend │   ├── peacelink/ │   │   ├── reports/ │   │   ├── forums/ │   │   ├── resources/ │   │   ├── users/ │   │   ├── notifications/ │   │   ├── analytics/ │   │   └── settings.py │   └── manage.py ├── docs/               # Documentation and SRS │   └── AppendixB/ ├── diagrams/           # PlantUML source files └── scripts/            # Deployment and setup scripts




---

## Setup Instructions

### Backend (Django)

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver


Frontend (Flutter)

cd frontend
flutter pub get
flutter run

UML Diagrams
All diagrams are located in docs/AppendixB/ and include:
- Use Case Diagram
- Class Diagram
- Sequence Diagram
- Activity Diagram
- Component Diagram
Each diagram is accompanied by a formal explanation aligned with academic rubric standards.



Future Enhancements
- Real-time voice calls using Twilio or Agora
- AI-powered moderation and translation
- Community heatmaps and conflict trend analysis
- Admin export tools for reports and forum data
- SMS-based reporting for non-smartphone users


License
This project is licensed under the Apache 2.O License. See the LICENSE file for details.



