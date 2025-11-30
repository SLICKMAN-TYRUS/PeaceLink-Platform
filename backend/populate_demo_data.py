#!/usr/bin/env python3
"""Populate the PeaceLink database with rich demo data for admin dashboards.

Usage:
    python3 manage.py shell < populate_demo_data.py

The script is idempotent: running it multiple times will reuse or update existing
records without creating duplicates. It creates diverse sample records across
users, reports, forums, notifications, community features, and analytics so the
Django admin shows meaningful figures during demonstrations.
"""

from datetime import timedelta
import random

from django.utils import timezone

from peacelink.users.models import User, UserVerification
from peacelink.forums.models import ForumTopic, ForumPost, ForumLike, Meeting
from peacelink.reports.models import (
    Report,
    ReportStatusHistory,
    ReportComment,
    ReportFollower,
)
from peacelink.notifications.models import (
    Notification,
    EmergencyAlert,
    Alert,
    NotificationPreference,
)
from peacelink.resources.models import Resource, ResourceBookmark
from peacelink.analytics.models import Analytics
from community.models import (
    Achievement,
    UserAchievement,
    Poll,
    PollOption,
    PollVote,
    Event,
    EventReminder,
    Conversation,
    Message,
    SuccessStory,
    Translation,
    OfflineData,
)

print("\n📊 Populating demo data...\n")
now = timezone.now()

# ---------------------------------------------------------------------------
# Users
# ---------------------------------------------------------------------------
print("👥 Ensuring demo users exist...")
user_specs = [
    {
        "username": "chief_makuei",
        "email": "makuei@example.com",
        "role": "elder",
        "verification_status": "verified",
        "verified": True,
        "trust_score": 88,
        "contribution_count": 28,
        "helpful_count": 14,
        "state": "Central Equatoria",
        "county": "Juba",
        "location": "Juba, Central Equatoria",
        "languages": ["en", "juba"],
        "preferred_language": "en",
        "is_ambassador": True,
        "last_active": now - timedelta(hours=6),
    },
    {
        "username": "sarah_nyandeng",
        "email": "sarah@ngo.org",
        "role": "ngo",
        "verification_status": "verified",
        "verified": True,
        "trust_score": 82,
        "contribution_count": 24,
        "helpful_count": 18,
        "state": "Jonglei",
        "county": "Bor",
        "location": "Bor, Jonglei",
        "languages": ["en", "dik"],
        "preferred_language": "en",
        "organization_name": "PeaceBuilders NGO",
        "is_ambassador": False,
        "last_active": now - timedelta(hours=2),
    },
    {
        "username": "james_lual",
        "email": "james@example.com",
        "role": "youth",
        "verification_status": "pending",
        "verified": False,
        "trust_score": 66,
        "contribution_count": 12,
        "helpful_count": 5,
        "state": "Upper Nile",
        "county": "Malakal",
        "location": "Malakal, Upper Nile",
        "languages": ["en", "ar"],
        "preferred_language": "en",
        "last_active": now - timedelta(days=1),
    },
    {
        "username": "grace_achol",
        "email": "grace@example.com",
        "role": "youth",
        "verification_status": "verified",
        "verified": True,
        "trust_score": 72,
        "contribution_count": 18,
        "helpful_count": 9,
        "state": "Western Bahr el Ghazal",
        "county": "Wau",
        "location": "Wau, Western Bahr el Ghazal",
        "languages": ["en"],
        "preferred_language": "en",
        "last_active": now - timedelta(hours=12),
    },
    {
        "username": "moderator_amani",
        "email": "amani@peacelink.org",
        "role": "moderator",
        "verification_status": "verified",
        "verified": True,
        "trust_score": 91,
        "contribution_count": 52,
        "helpful_count": 31,
        "state": "Central Equatoria",
        "county": "Juba",
        "location": "Juba Civic Center",
        "languages": ["en", "juba"],
        "preferred_language": "en",
        "is_ambassador": True,
        "last_active": now - timedelta(hours=1),
    },
    {
        "username": "ngo_bol_awet",
        "email": "bol.awet@aid.org",
        "role": "ngo",
        "verification_status": "verified",
        "verified": True,
        "trust_score": 79,
        "contribution_count": 21,
        "helpful_count": 11,
        "state": "Lakes State",
        "county": "Rumbek",
        "location": "Rumbek, Lakes State",
        "languages": ["en", "dik"],
        "preferred_language": "en",
        "last_active": now - timedelta(days=2),
    },
    {
        "username": "elder_nyakong",
        "email": "nyakong.elder@example.com",
        "role": "elder",
        "verification_status": "verified",
        "verified": True,
        "trust_score": 95,
        "contribution_count": 63,
        "helpful_count": 40,
        "state": "Unity",
        "county": "Bentiu",
        "location": "Bentiu Community Council",
        "languages": ["en", "nuer"],
        "preferred_language": "nuer",
        "is_ambassador": True,
        "last_active": now - timedelta(days=3),
    },
    {
        "username": "youth_kuol",
        "email": "kuol@student.org",
        "role": "youth",
        "verification_status": "pending",
        "verified": False,
        "trust_score": 58,
        "contribution_count": 9,
        "helpful_count": 4,
        "state": "Northern Bahr el Ghazal",
        "county": "Aweil",
        "location": "Aweil Youth Hub",
        "languages": ["en"],
        "preferred_language": "en",
        "last_active": now - timedelta(days=4),
    },
    {
        "username": "ngo_lina_odongo",
        "email": "lina.odongo@relief.org",
        "role": "ngo",
        "verification_status": "verified",
        "verified": True,
        "trust_score": 84,
        "contribution_count": 29,
        "helpful_count": 17,
        "state": "Eastern Equatoria",
        "county": "Torit",
        "location": "Torit Field Office",
        "languages": ["en", "ar"],
        "preferred_language": "en",
        "last_active": now - timedelta(hours=8),
    },
    {
        "username": "moderator_deng",
        "email": "deng@peacelink.org",
        "role": "moderator",
        "verification_status": "verified",
        "verified": True,
        "trust_score": 89,
        "contribution_count": 47,
        "helpful_count": 28,
        "state": "Upper Nile",
        "county": "Malakal",
        "location": "Malakal Mediation Center",
        "languages": ["en", "ar"],
        "preferred_language": "en",
        "is_ambassador": False,
        "last_active": now - timedelta(hours=5),
    },
    {
        "username": "official_mary_adiar",
        "email": "mary.adiar@gov.ss",
        "role": "ngo",
        "verification_status": "verified",
        "verified": True,
        "trust_score": 87,
        "contribution_count": 36,
        "helpful_count": 19,
        "state": "Central Equatoria",
        "county": "Juba",
        "location": "Ministry of Peace, Juba",
        "languages": ["en"],
        "preferred_language": "en",
        "last_active": now - timedelta(hours=10),
    },
    {
        "username": "field_ambassador_juma",
        "email": "juma.field@network.org",
        "role": "moderator",
        "verification_status": "verified",
        "verified": True,
        "trust_score": 77,
        "contribution_count": 26,
        "helpful_count": 12,
        "state": "Western Equatoria",
        "county": "Yambio",
        "location": "Yambio Peace Center",
        "languages": ["en", "juba"],
        "preferred_language": "en",
        "is_ambassador": True,
        "last_active": now - timedelta(days=2, hours=3),
    },
]

users = {}
for spec in user_specs:
    defaults = {k: v for k, v in spec.items() if k != "username"}
    user, created = User.objects.get_or_create(username=spec["username"], defaults=defaults)
    if created:
        user.set_password("password123")
        user.save()
        print(f"  ✓ Created user {user.username}")
    else:
        for field, value in defaults.items():
            setattr(user, field, value)
        user.save()
        print(f"  • Updated user {user.username}")
    users[user.username] = user

try:
    admin_user = User.objects.get(username="admin")
    users["admin"] = admin_user
except User.DoesNotExist:
    admin_user = None
    print("⚠️  Admin (username='admin') not found. Create a superuser before running demos.")

# ---------------------------------------------------------------------------
# Verification records
# ---------------------------------------------------------------------------
print("\n🛡️  Ensuring verification records...")
verification_specs = [
    {
        "username": "sarah_nyandeng",
        "verification_type": "ngo",
        "status": "approved",
        "endorser": "admin",
        "notes": "NGO accreditation verified",
        "documents_submitted": {"certificate": "ngo_cert_2025.pdf"},
    },
    {
        "username": "moderator_amani",
        "verification_type": "moderator",
        "status": "approved",
        "endorser": "elder_nyakong",
        "notes": "Community elders endorsement",
        "documents_submitted": {"letter": "elder_endorsement.pdf"},
    },
    {
        "username": "ngo_bol_awet",
        "verification_type": "ngo",
        "status": "approved",
        "endorser": "admin",
        "notes": "Field office documentation reviewed",
        "documents_submitted": {"mou": "peace_support_mou.pdf"},
    },
    {
        "username": "grace_achol",
        "verification_type": "youth_leader",
        "status": "pending",
        "endorser": "moderator_amani",
        "notes": "Awaiting review from admin",
        "documents_submitted": {"id": "youth_id_ACHOL.png"},
    },
]

for spec in verification_specs:
    user = users.get(spec["username"])
    if not user:
        continue
    defaults = {
        "verification_type": spec["verification_type"],
        "status": spec["status"],
        "endorser": users.get(spec["endorser"]),
        "notes": spec["notes"],
        "documents_submitted": spec["documents_submitted"],
        "reviewed_by": admin_user if spec["status"] == "approved" and admin_user else None,
        "reviewed_at": now - timedelta(days=1) if spec["status"] == "approved" else None,
    }
    uv, created = UserVerification.objects.update_or_create(
        user=user,
        verification_type=spec["verification_type"],
        defaults=defaults,
    )
    print(f"  {'✓ Created' if created else '• Updated'} verification for {user.username}")

# ---------------------------------------------------------------------------
# Forum topics, posts, likes, meetings
# ---------------------------------------------------------------------------
print("\n💬 Populating forums and meetings...")
forum_topics = [
    {
        "title": "Cattle Grazing Disputes Resolution",
        "category": "conflict_resolution",
        "author": "chief_makuei",
        "is_pinned": True,
        "view_count": 186,
    },
    {
        "title": "Water Access Crisis in Rural Areas",
        "category": "infrastructure",
        "author": "grace_achol",
        "view_count": 142,
    },
    {
        "title": "Youth Employment Opportunities in Juba",
        "category": "youth",
        "author": "james_lual",
        "view_count": 97,
    },
    {
        "title": "Community Healing Circles Best Practices",
        "category": "health",
        "author": "elder_nyakong",
        "view_count": 75,
    },
]

topics = {}
for spec in forum_topics:
    author = users.get(spec["author"])
    if not author:
        continue
    defaults = {
        "category": spec["category"],
        "author": author,
        "is_pinned": spec.get("is_pinned", False),
    }
    topic, created = ForumTopic.objects.get_or_create(title=spec["title"], defaults=defaults)
    topic.view_count = spec.get("view_count", topic.view_count)
    topic.save(update_fields=["view_count"])
    topics[topic.title] = topic
    print(f"  {'✓ Created' if created else '• Updated'} topic '{topic.title}'")

posts_data = [
    {
        "topic": "Cattle Grazing Disputes Resolution",
        "user": "chief_makuei",
        "content": "We have formed a mediation team including elders from both clans. Proposing rotational grazing schedule.",
        "is_highlighted": True,
    },
    {
        "topic": "Cattle Grazing Disputes Resolution",
        "user": "moderator_amani",
        "content": "Great initiative. Please document the agreement in the admin reports section for tracking.",
    },
    {
        "topic": "Water Access Crisis in Rural Areas",
        "user": "grace_achol",
        "content": "Three boreholes still down in Wau. Volunteers needed for pump repairs this weekend.",
    },
    {
        "topic": "Water Access Crisis in Rural Areas",
        "user": "ngo_lina_odongo",
        "content": "Our Torit team can send spare parts. Confirm coordinates for logistics.",
    },
    {
        "topic": "Youth Employment Opportunities in Juba",
        "user": "sarah_nyandeng",
        "content": "Vocational training cohort starts Monday. 40 slots filled, 10 remaining. Apply via the NGO resources portal.",
    },
    {
        "topic": "Community Healing Circles Best Practices",
        "user": "elder_nyakong",
        "content": "Bentiu circle welcomed 25 participants this week. Shared trauma-informed storytelling guidelines.",
        "is_highlighted": True,
    },
]

forum_posts = []
for spec in posts_data:
    topic = topics.get(spec["topic"])
    user = users.get(spec["user"])
    if not topic or not user:
        continue
    post, created = ForumPost.objects.get_or_create(
        topic=topic,
        user=user,
        content=spec["content"],
        defaults={"language": "en"},
    )
    if spec.get("is_highlighted"):
        post.is_highlighted = True
        post.trusted = True
        post.save(update_fields=["is_highlighted", "trusted"])
    forum_posts.append(post)
    print(f"  {'✓ Created' if created else '• Updated'} post by {user.username} in '{topic.title}'")

# Simple reply chain
if forum_posts:
    parent_post = forum_posts[0]
    reply_user = users.get("moderator_deng")
    if reply_user:
        reply, reply_created = ForumPost.objects.get_or_create(
            topic=parent_post.topic,
            user=reply_user,
            content="Please capture mediation outcomes in the conflict report template.",
            parent=parent_post,
            defaults={"language": "en"},
        )
        forum_posts.append(reply)
        print(f"  {'✓ Created' if reply_created else '• Updated'} reply from {reply_user.username}")

# Forum likes for engagement figures
for post in forum_posts:
    for liker_username in random.sample(list(users.keys()), k=min(3, len(users))):
        liker = users.get(liker_username)
        if not liker or liker == post.user:
            continue
        ForumLike.objects.get_or_create(post=post, user=liker)

meetings_data = [
    {
        "title": "Urgent: Water Infrastructure Crisis Response",
        "scheduled_by": "sarah_nyandeng",
        "scheduled_time": now + timedelta(days=1, hours=3),
        "duration_minutes": 120,
        "status": "scheduled",
        "urgency": "high",
        "description": "Coordinating repairs and water trucking to affected counties.",
        "invited": ["chief_makuei", "official_mary_adiar", "moderator_amani"],
        "attendees": ["chief_makuei"],
    },
    {
        "title": "Mediation Briefing: Bentiu Clans",
        "scheduled_by": "moderator_deng",
        "scheduled_time": now - timedelta(days=1),
        "duration_minutes": 90,
        "status": "completed",
        "urgency": "medium",
        "description": "Review mediation outcomes and assign follow-up tasks.",
        "invited": ["elder_nyakong", "field_ambassador_juma"],
        "attendees": ["elder_nyakong", "field_ambassador_juma"],
    },
    {
        "title": "Peace Education Curriculum Planning",
        "scheduled_by": "official_mary_adiar",
        "scheduled_time": now + timedelta(days=4),
        "duration_minutes": 75,
        "status": "scheduled",
        "urgency": "normal",
        "description": "Coordinate youth peace clubs and curriculum roll-out.",
        "invited": ["sarah_nyandeng", "moderator_amani", "youth_kuol"],
        "attendees": [],
    },
]

for spec in meetings_data:
    scheduler = users.get(spec["scheduled_by"])
    if not scheduler:
        continue
    meeting, created = Meeting.objects.get_or_create(
        title=spec["title"],
        defaults={
            "description": spec["description"],
            "scheduled_by": scheduler,
            "scheduled_time": spec["scheduled_time"],
            "duration_minutes": spec.get("duration_minutes", 60),
            "status": spec.get("status", "scheduled"),
            "urgency": spec.get("urgency", "medium"),
            "google_meet_link": "https://meet.google.com/demo-room",
        },
    )
    if not created:
        meeting.description = spec["description"]
        meeting.scheduled_by = scheduler
        meeting.scheduled_time = spec["scheduled_time"]
        meeting.duration_minutes = spec.get("duration_minutes", 60)
        meeting.status = spec.get("status", "scheduled")
        meeting.urgency = spec.get("urgency", "medium")
        meeting.save()
    meeting.invited_leaders.set(
        [users[name] for name in spec.get("invited", []) if users.get(name)]
    )
    meeting.attendees.set(
        [users[name] for name in spec.get("attendees", []) if users.get(name)]
    )
    print(f"  {'✓ Created' if created else '• Updated'} meeting '{meeting.title}'")

# ---------------------------------------------------------------------------
# Reports and workflows
# ---------------------------------------------------------------------------
print("\n📝 Creating conflict and incident reports...")
report_specs = [
    {
        "user": "grace_achol",
        "category": "infrastructure",
        "location": "Wau Market Water Point",
        "description": "Main solar pump offline; 250 households queuing for water.",
        "urgency": "high",
        "people_affected": 250,
        "status": "under_review",
        "assigned_to": "moderator_amani",
        "reviewed_by": "moderator_amani",
        "contact_preference": "phone",
        "contact_number": "+211921000001",
    },
    {
        "user": "james_lual",
        "category": "security",
        "location": "Malakal Market Road",
        "description": "Youth groups clashing over market stalls; two minor injuries reported.",
        "urgency": "medium",
        "people_affected": 40,
        "status": "assigned",
        "assigned_to": "field_ambassador_juma",
        "reviewed_by": "moderator_deng",
        "contact_preference": "whatsapp",
    },
    {
        "user": "chief_makuei",
        "category": "conflict",
        "location": "Gumbo Grazing Fields",
        "description": "Livestock trespassing disputes between cattle keepers and farmers.",
        "urgency": "critical",
        "people_affected": 120,
        "status": "in_progress",
        "assigned_to": "moderator_amani",
        "reviewed_by": "moderator_amani",
        "contact_preference": "phone",
        "contact_number": "+211926000222",
    },
    {
        "user": "ngo_lina_odongo",
        "category": "health",
        "location": "Torit IDP Camp",
        "description": "Cholera symptoms observed; need rapid response team deployment.",
        "urgency": "critical",
        "people_affected": 75,
        "status": "verified",
        "assigned_to": "official_mary_adiar",
        "reviewed_by": "official_mary_adiar",
        "contact_preference": "phone",
    },
    {
        "user": "ngo_bol_awet",
        "category": "livelihoods",
        "location": "Rumbek Youth Center",
        "description": "Request for vocational kits for 30 trainees completing carpentry course.",
        "urgency": "low",
        "people_affected": 30,
        "status": "resolved",
        "assigned_to": "moderator_deng",
        "reviewed_by": "moderator_deng",
        "contact_preference": "phone",
    },
    {
        "user": "elder_nyakong",
        "category": "conflict",
        "location": "Bentiu Protection Site",
        "description": "Reconciliation dialogue ongoing; need food support for 60 participants.",
        "urgency": "medium",
        "people_affected": 60,
        "status": "closed",
        "assigned_to": "field_ambassador_juma",
        "reviewed_by": "moderator_deng",
        "contact_preference": "in-person",
    },
]

reports = []
for spec in report_specs:
    user = users.get(spec["user"])
    assigned_to = users.get(spec.get("assigned_to"))
    reviewed_by = users.get(spec.get("reviewed_by"))
    defaults = {
        "category": spec["category"],
        "description": spec["description"],
        "urgency": spec.get("urgency", "medium"),
        "people_affected": spec.get("people_affected"),
        "status": spec.get("status", "submitted"),
        "assigned_to": assigned_to,
        "reviewed_by": reviewed_by,
        "contact_preference": spec.get("contact_preference", "phone"),
        "contact_number": spec.get("contact_number", ""),
        "language": "en",
        "incident_date": timezone.now().date() - timedelta(days=random.randint(1, 7)),
    }
    report, created = Report.objects.get_or_create(
        user=user,
        location=spec["location"],
        defaults=defaults,
    )
    if not created:
        for key, value in defaults.items():
            setattr(report, key, value)
    report.save()
    reports.append(report)
    print(f"  {'✓ Created' if created else '• Updated'} report for {spec['location']}")

status_sequences = {
    "under_review": ["submitted", "under_review"],
    "assigned": ["submitted", "under_review", "assigned"],
    "in_progress": ["submitted", "under_review", "assigned", "in_progress"],
    "verified": ["submitted", "under_review", "verified"],
    "resolved": ["submitted", "under_review", "assigned", "in_progress", "resolved"],
    "closed": ["submitted", "under_review", "assigned", "in_progress", "resolved", "closed"],
}

for report in reports:
    path = status_sequences.get(report.status, ["submitted", report.status])
    if not path:
        continue
    previous = path[0]
    for state in path[1:]:
        ReportStatusHistory.objects.get_or_create(
            report=report,
            old_status=previous,
            new_status=state,
            defaults={
                "changed_by": report.reviewed_by or admin_user,
                "notes": f"Status changed to {state.replace('_', ' ').title()}",
            },
        )
        previous = state

    # Comments & followers for engagement
    for idx, username in enumerate([report.user.username, "moderator_amani", "moderator_deng"]):
        commenter = users.get(username)
        if not commenter:
            continue
        ReportComment.objects.get_or_create(
            report=report,
            user=commenter,
            content=f"Update {idx + 1}: {report.description[:80]}...",
            defaults={"is_internal": commenter.role in {"moderator"}},
        )
        if commenter != report.user:
            ReportFollower.objects.get_or_create(report=report, user=commenter)

# ---------------------------------------------------------------------------
# Notifications & alerts
# ---------------------------------------------------------------------------
print("\n🔔 Creating notifications and alerts...")
for username in users:
    recipient = users[username]
    NotificationPreference.objects.get_or_create(
        user=recipient,
        defaults={
            "push_enabled": True,
            "sms_enabled": recipient.role in {"elder", "ngo"},
            "email_enabled": recipient.role in {"ngo", "moderator"},
            "report_notifications": True,
            "meeting_notifications": True,
            "forum_notifications": True,
            "message_notifications": True,
            "emergency_notifications": True,
        },
    )

planning_meeting = Meeting.objects.filter(title="Peace Education Curriculum Planning").first()
planning_meeting_id = planning_meeting.id if planning_meeting else None

notification_specs = [
    {
        "recipient": "moderator_amani",
        "notification_type": "report_status",
        "priority": "high",
        "title": "New High Priority Report",
        "message": "Water pump failure reported in Wau Market.",
        "report": reports[0].id if reports else None,
        "action_url": "/admin/peacelink_reports/report/",
    },
    {
        "recipient": "field_ambassador_juma",
        "notification_type": "meeting_invite",
        "priority": "medium",
        "title": "Invited: Peace Education Planning",
        "message": "Join scheduled coordination meeting on Friday.",
        "meeting_id": planning_meeting_id,
        "action_url": "/admin/peacelink_forums/meeting/",
    },
    {
        "recipient": "chief_makuei",
        "notification_type": "emergency_alert",
        "priority": "critical",
        "title": "Emergency: Cholera Alert",
        "message": "Health teams deploying to Torit IDP Camp.",
        "action_url": "/admin/peacelink_notifications/emergencyalert/",
    },
    {
        "recipient": "grace_achol",
        "notification_type": "forum_reply",
        "priority": "low",
        "title": "New comment on Water Access thread",
        "message": "Lina responded with spare parts availability.",
        "action_url": "/admin/peacelink_forums/forumpost/",
    },
]

for spec in notification_specs:
    recipient = users.get(spec["recipient"])
    if not recipient:
        continue
    Notification.objects.get_or_create(
        recipient=recipient,
        notification_type=spec["notification_type"],
        title=spec["title"],
        defaults={
            "priority": spec.get("priority", "medium"),
            "message": spec["message"],
            "report_id": spec.get("report"),
            "meeting_id": spec.get("meeting_id"),
            "action_url": spec.get("action_url", ""),
            "sent": True,
            "sent_at": now - timedelta(hours=1),
        },
    )

alert_specs = [
    {
        "title": "Flood Warning: Sobat River",
        "message": "Rising water levels around Nasir. Move livestock to higher ground within 12 hours.",
        "alert_type": "flood",
        "severity": "severe",
        "issued_by": "official_mary_adiar",
        "target_states": ["Upper Nile"],
    },
    {
        "title": "Security Advisory: Juba Market",
        "message": "Increased patrols scheduled after evening clashes. Traders advised to close by 7pm.",
        "alert_type": "conflict",
        "severity": "moderate",
        "issued_by": "moderator_amani",
        "target_states": ["Central Equatoria"],
    },
]

for spec in alert_specs:
    issued_by = users.get(spec["issued_by"])
    alert, created = EmergencyAlert.objects.get_or_create(
        title=spec["title"],
        defaults={
            "message": spec["message"],
            "alert_type": spec["alert_type"],
            "severity": spec["severity"],
            "issued_by": issued_by,
            "target_states": spec.get("target_states", []),
            "recipients_count": 420,
            "delivered_count": 389,
            "read_count": 310,
            "broadcast_all": False,
            "send_sms": True,
        },
    )
    if not created:
        alert.message = spec["message"]
        alert.alert_type = spec["alert_type"]
        alert.severity = spec["severity"]
        alert.issued_by = issued_by
        alert.target_states = spec.get("target_states", [])
        alert.recipients_count = 420
        alert.delivered_count = 389
        alert.read_count = 310
        alert.save()
    print(f"  {'✓ Created' if created else '• Updated'} emergency alert '{alert.title}'")

# Simple broadcast alerts
if admin_user:
    general_alert, _ = Alert.objects.get_or_create(
        message="System maintenance scheduled for Sunday 18:00 EAT.",
        sent_by=admin_user,
        defaults={"channel": "push", "verified": True},
    )
    general_alert.recipients.set(users.values())

# ---------------------------------------------------------------------------
# Community: polls, votes, events, conversations, achievements, stories
# ---------------------------------------------------------------------------
print("\n🌐 Populating community features...")
poll, _ = Poll.objects.get_or_create(
    title="What is the most urgent issue in your community?",
    defaults={
        "creator": users.get("sarah_nyandeng"),
        "description": "Help us understand your community priorities",
        "poll_type": "single",
        "start_date": now - timedelta(days=2),
        "end_date": now + timedelta(days=5),
        "total_votes": 0,
    },
)

options_text = [
    "Water access",
    "Healthcare services",
    "Security concerns",
    "Youth unemployment",
    "Education quality",
]

options = []
for order, text in enumerate(options_text, start=1):
    option, _ = PollOption.objects.get_or_create(poll=poll, text=text, defaults={"order": order})
    option.order = order
    option.save(update_fields=["order"])
    options.append(option)

votes_created = 0
for user in users.values():
    if user.username == "admin":
        continue
    chosen_option = random.choice(options)
    vote, created = PollVote.objects.get_or_create(
        poll=poll,
        user=user,
        defaults={"option": chosen_option},
    )
    if created:
        chosen_option.vote_count += 1
        chosen_option.save(update_fields=["vote_count"])
        votes_created += 1

poll.total_votes = sum(opt.vote_count for opt in options)
poll.save(update_fields=["total_votes"])
print(f"  • Poll votes recorded: {poll.total_votes}")

event_specs = [
    {
        "title": "Bentiu Reconciliation Dialogue",
        "description": "Two-day dialogue with 60 community representatives and elders.",
        "event_type": "dialogue",
        "organizer": "elder_nyakong",
        "location": "Bentiu Conference Hall",
        "start_time": now + timedelta(days=3),
        "end_time": now + timedelta(days=3, hours=4),
        "requires_rsvp": True,
        "is_public": False,
        "attendees": ["elder_nyakong", "moderator_deng", "field_ambassador_juma"],
        "interested": ["chief_makuei", "ngo_bol_awet"],
    },
    {
        "title": "Youth Peace Clubs Expo",
        "description": "Showcase of youth-led peace initiatives and entrepreneurship demos.",
        "event_type": "celebration",
        "organizer": "moderator_amani",
        "location": "Juba Cultural Center",
        "start_time": now + timedelta(days=7),
        "end_time": now + timedelta(days=7, hours=6),
        "requires_rsvp": False,
        "is_public": True,
        "attendees": ["moderator_amani", "grace_achol", "youth_kuol"],
        "interested": ["sarah_nyandeng", "james_lual"],
    },
]

for spec in event_specs:
    organizer = users.get(spec["organizer"])
    if not organizer:
        continue
    event, created = Event.objects.get_or_create(
        title=spec["title"],
        defaults={
            "description": spec["description"],
            "event_type": spec["event_type"],
            "organizer": organizer,
            "location": spec["location"],
            "start_time": spec["start_time"],
            "end_time": spec["end_time"],
            "requires_rsvp": spec.get("requires_rsvp", False),
            "is_public": spec.get("is_public", True),
        },
    )
    if not created:
        for field in ["description", "event_type", "organizer", "location", "start_time", "end_time", "requires_rsvp", "is_public"]:
            setattr(event, field, spec[field])
        event.save()
    event.attendees.set([users[name] for name in spec.get("attendees", []) if users.get(name)])
    event.interested.set([users[name] for name in spec.get("interested", []) if users.get(name)])
    print(f"  {'✓ Created' if created else '• Updated'} event '{event.title}'")

for event in Event.objects.all()[:2]:
    for attendee in event.attendees.all():
        EventReminder.objects.get_or_create(
            event=event,
            user=attendee,
            defaults={"reminder_time": event.start_time - timedelta(hours=6)},
        )

conversation, _ = Conversation.objects.get_or_create(is_group=True, group_name="Peacebuilders Coordination")
conversation.participants.set(
    [users[name] for name in ["moderator_amani", "moderator_deng", "sarah_nyandeng", "official_mary_adiar"] if users.get(name)]
)
if users.get("moderator_amani"):
    Message.objects.get_or_create(
        conversation=conversation,
        sender=users.get("moderator_amani"),
        content="Sharing latest incident summaries ahead of tomorrow's meeting.",
    )
if users.get("official_mary_adiar"):
    Message.objects.get_or_create(
        conversation=conversation,
        sender=users.get("official_mary_adiar"),
        content="Acknowledged. Ministry dispatching liaison officers to support.",
    )

achievement_specs = [
    {
        "name": "Peacemaker",
        "description": "Helped resolve a community conflict",
        "badge_type": "peacemaker",
        "points": 100,
        "required_actions": 1,
        "action_type": "resolve_conflict",
    },
    {
        "name": "Community Helper",
        "description": "Provided helpful information 10 times",
        "badge_type": "helper",
        "points": 50,
        "required_actions": 10,
        "action_type": "helpful_post",
    },
    {
        "name": "Active Contributor",
        "description": "Created 20 forum posts",
        "badge_type": "contributor",
        "points": 75,
        "required_actions": 20,
        "action_type": "create_post",
    },
    {
        "name": "Trusted Reporter",
        "description": "Submitted 5 verified reports",
        "badge_type": "reporter",
        "points": 60,
        "required_actions": 5,
        "action_type": "submit_report",
    },
]

achievements = {}
for spec in achievement_specs:
    achievement, _ = Achievement.objects.update_or_create(
        name=spec["name"],
        defaults={key: spec[key] for key in spec if key != "name"},
    )
    achievements[achievement.name] = achievement

user_achievement_specs = [
    ("chief_makuei", "Peacemaker", 100),
    ("grace_achol", "Community Helper", 60),
    ("moderator_amani", "Active Contributor", 80),
    ("ngo_lina_odongo", "Trusted Reporter", 40),
]
for username, achievement_name, progress in user_achievement_specs:
    user = users.get(username)
    achievement = achievements.get(achievement_name)
    if not user or not achievement:
        continue
    ua, created = UserAchievement.objects.get_or_create(user=user, achievement=achievement)
    if created or ua.progress != progress:
        ua.progress = progress
        ua.save(update_fields=["progress"])

if len(reports) >= 3:
    story, _ = SuccessStory.objects.get_or_create(
        title="Land Dispute Mediation Success in Gumbo",
        defaults={
            "description": "Farmers and herders agreed on rotational grazing after mediation session.",
            "related_report": reports[2],
            "submitted_by": users.get("moderator_amani"),
            "people_impacted": 120,
            "community_rating": 4.6,
            "verified": True,
            "featured": True,
            "view_count": 240,
        },
    )
    story.participants.set(
        [users.get("chief_makuei"), users.get("field_ambassador_juma"), users.get("moderator_deng")]
    )

Translation.objects.get_or_create(
    content_type="report",
    content_id=reports[0].id if reports else 1,
    field_name="description",
    target_language="ar",
    defaults={
        "original_text": "Main solar pump offline; 250 households queuing for water.",
        "translated_text": "المضخة الشمسية الرئيسية متوقفة؛ 250 أسرة تنتظر الماء.",
        "source_language": "en",
        "verified": True,
        "verified_by": users.get("moderator_amani"),
    },
)

OfflineData.objects.get_or_create(
    user=users.get("field_ambassador_juma"),
    action_type="submit_report",
    action_data={"draft": "Bentiu site supply request"},
    defaults={"synced": True, "synced_at": now - timedelta(hours=4)},
)

# ---------------------------------------------------------------------------
# Resources & bookmarks
# ---------------------------------------------------------------------------
print("\n📚 Adding knowledge resources...")
resource_specs = [
    {
        "title": "Community Mediation Toolkit",
        "description": "Step-by-step guide for facilitating inter-clan mediations.",
        "category": "peacebuilding",
        "resource_type": "pdf",
        "file_url": "https://example.org/resources/mediation_toolkit.pdf",
        "file_size": "2.3 MB",
        "uploaded_by": "moderator_amani",
        "verified": True,
        "featured": True,
        "language": "en",
        "download_count": 145,
        "view_count": 310,
    },
    {
        "title": "Radio Script: Cholera Prevention",
        "description": "15-minute radio awareness script translated to Juba Arabic.",
        "category": "health",
        "resource_type": "audio",
        "file_url": "https://example.org/resources/cholera_script.mp3",
        "uploaded_by": "ngo_lina_odongo",
        "verified": True,
        "featured": False,
        "language": "juba",
        "duration": "00:15:00",
        "download_count": 86,
        "view_count": 190,
    },
    {
        "title": "Youth Livelihood Grants Opportunities",
        "description": "Current grant opportunities for youth-led cooperatives.",
        "category": "employment",
        "resource_type": "link",
        "file_url": "https://example.org/resources/youth_grants",
        "uploaded_by": "sarah_nyandeng",
        "verified": False,
        "featured": True,
        "language": "en",
        "download_count": 0,
        "view_count": 215,
    },
]

resources = []
for spec in resource_specs:
    uploader = users.get(spec["uploaded_by"])
    defaults = {key: value for key, value in spec.items() if key not in {"title", "uploaded_by"}}
    defaults["uploaded_by"] = uploader
    resource, created = Resource.objects.get_or_create(title=spec["title"], defaults=defaults)
    if not created:
        for key, value in defaults.items():
            setattr(resource, key, value)
        resource.save()
    resources.append(resource)
    print(f"  {'✓ Created' if created else '• Updated'} resource '{resource.title}'")

for resource in resources:
    for username in random.sample([u for u in users if u != "admin"], k=min(3, len(users) - 1)):
        user = users[username]
        ResourceBookmark.objects.get_or_create(user=user, resource=resource)

# ---------------------------------------------------------------------------
# Analytics metrics
# ---------------------------------------------------------------------------
print("\n📈 Updating analytics metrics...")
analytics_metrics = {
    "active_users_7d": 128,
    "reports_last_30d": Report.objects.count(),
    "resolved_reports_total": Report.objects.filter(status__in=["resolved", "closed"]).count(),
    "alerts_sent_month": EmergencyAlert.objects.count() + Notification.objects.filter(notification_type="emergency_alert").count(),
    "resources_downloads": sum(r.download_count for r in resources),
}

for key, value in analytics_metrics.items():
    Analytics.objects.update_or_create(key=key, defaults={"value": float(value)})
    print(f"  • {key}: {value}")

print("\n✅ Demo data ready! Log into http://127.0.0.1:8000/admin/ to explore the populated dashboards.\n")
