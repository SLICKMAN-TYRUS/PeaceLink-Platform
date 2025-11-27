#!/usr/bin/env python3
"""
Script to populate PeaceLink database with sample data
Run: python3 manage.py shell < create_sample_data.py
"""

from peacelink.users.models import User
from peacelink.forums.models import ForumTopic, ForumPost, Meeting
from peacelink.reports.models import Report
from peacelink.notifications.models import Notification, EmergencyAlert
from community.models import Achievement, Poll, PollOption, Event
from django.utils import timezone
from datetime import timedelta

print("Creating sample users...")

# Create sample users if they don't exist
users_data = [
    {'username': 'chief_makuei', 'email': 'makuei@example.com', 'role': 'elder', 'location': 'Juba, Central Equatoria', 'state': 'Central Equatoria', 'county': 'Juba'},
    {'username': 'sarah_nyandeng', 'email': 'sarah@ngo.org', 'role': 'ngo', 'location': 'Bor, Jonglei', 'state': 'Jonglei', 'county': 'Bor'},
    {'username': 'james_lual', 'email': 'james@example.com', 'role': 'citizen', 'location': 'Malakal, Upper Nile', 'state': 'Upper Nile', 'county': 'Malakal'},
    {'username': 'grace_achol', 'email': 'grace@example.com', 'role': 'citizen', 'location': 'Wau, Western Bahr el Ghazal', 'state': 'Western Bahr el Ghazal', 'county': 'Wau'},
]

users = {}
for user_data in users_data:
    user, created = User.objects.get_or_create(
        username=user_data['username'],
        defaults={
            'email': user_data['email'],
            'role': user_data['role'],
            'location': user_data.get('location', ''),
            'state': user_data.get('state', ''),
            'county': user_data.get('county', ''),
            'trust_score': 75,
        }
    )
    users[user_data['username']] = user
    if created:
        user.set_password('password123')
        user.save()
        print(f"✓ Created user: {user.username}")
    else:
        print(f"  User already exists: {user.username}")

print("\nCreating forum topics...")

# Create forum topics
topics_data = [
    {
        'title': 'Water Access Crisis in Rural Areas',
        'category': 'infrastructure',
        'author': 'grace_achol'
    },
    {
        'title': 'Youth Employment Opportunities in Juba',
        'category': 'youth',
        'author': 'james_lual'
    },
    {
        'title': 'Cattle Grazing Disputes Resolution',
        'category': 'conflict_resolution',
        'author': 'chief_makuei',
        'is_pinned': True
    }
]

topics = {}
for topic_data in topics_data:
    topic, created = ForumTopic.objects.get_or_create(
        title=topic_data['title'],
        defaults={
            'category': topic_data['category'],
            'author': users[topic_data['author']],
            'is_pinned': topic_data.get('is_pinned', False)
        }
    )
    topics[topic_data['title']] = topic
    if created:
        print(f"✓ Created topic: {topic.title}")
    else:
        print(f"  Topic already exists: {topic.title}")

print("\nCreating forum posts...")

# Create some posts in topics
posts_data = [
    {
        'topic': 'Water Access Crisis in Rural Areas',
        'user': 'chief_makuei',
        'content': 'We need urgent attention to the water situation in our villages. Many communities are walking 5km+ daily for clean water.'
    },
    {
        'topic': 'Youth Employment Opportunities in Juba',
        'user': 'sarah_nyandeng',
        'content': 'Our NGO is offering free vocational training in carpentry, plumbing, and electrical work. 50 spots available!'
    }
]

for post_data in posts_data:
    post, created = ForumPost.objects.get_or_create(
        topic=topics[post_data['topic']],
        user=users[post_data['user']],
        content=post_data['content']
    )
    if created:
        print(f"✓ Created post by {post.user.username}")

print("\nCreating achievements...")

# Create achievements
achievements_data = [
    {'name': 'Peacemaker', 'badge_type': 'peacemaker', 'points': 100, 'description': 'Helped resolve a community conflict', 'required_actions': 1},
    {'name': 'Community Helper', 'badge_type': 'helper', 'points': 50, 'description': 'Provided helpful information 10 times', 'required_actions': 10},
    {'name': 'Active Contributor', 'badge_type': 'contributor', 'points': 75, 'description': 'Created 20 forum posts', 'required_actions': 20},
]

for ach_data in achievements_data:
    achievement, created = Achievement.objects.get_or_create(
        name=ach_data['name'],
        defaults=ach_data
    )
    if created:
        print(f"✓ Created achievement: {achievement.name}")

print("\nCreating a community poll...")

# Create a sample poll
poll, created = Poll.objects.get_or_create(
    title='What is the most urgent issue in your community?',
    defaults={
        'creator': users['sarah_nyandeng'],
        'description': 'Help us understand your community priorities',
        'poll_type': 'single',
        'start_date': timezone.now(),
        'end_date': timezone.now() + timedelta(days=7)
    }
)

if created:
    print(f"✓ Created poll: {poll.title}")
    
    # Create poll options
    options = [
        'Water access',
        'Healthcare services',
        'Security concerns',
        'Youth unemployment',
        'Education quality'
    ]
    
    for idx, option_text in enumerate(options):
        PollOption.objects.create(
            poll=poll,
            text=option_text,
            order=idx + 1
        )
    print(f"  Added {len(options)} poll options")

print("\nCreating sample reports...")

# Create sample reports
reports_data = [
    {
        'user': 'grace_achol',
        'category': 'infrastructure',
        'location': 'Wau Market Area',
        'description': 'The main water pump has been broken for 3 days. Approximately 200 families affected.',
        'urgency': 'high',
        'people_affected': 200
    },
    {
        'user': 'james_lual',
        'category': 'security',
        'location': 'Malakal Town Center',
        'description': 'Dispute over cattle grazing near farmland. Tensions rising between two groups.',
        'urgency': 'medium'
    }
]

for report_data in reports_data:
    report, created = Report.objects.get_or_create(
        user=users[report_data['user']],
        location=report_data['location'],
        defaults={
            'category': report_data['category'],
            'description': report_data['description'],
            'urgency': report_data['urgency'],
            'people_affected': report_data.get('people_affected', 0),
            'status': 'submitted'
        }
    )
    if created:
        print(f"✓ Created report: {report.location}")

print("\nCreating sample meeting...")

# Create a sample admin meeting
meeting, created = Meeting.objects.get_or_create(
    title='Urgent: Water Infrastructure Crisis Response',
    defaults={
        'description': 'Emergency meeting to address water access issues across multiple regions',
        'scheduled_by': users['sarah_nyandeng'],
        'scheduled_time': timezone.now() + timedelta(days=2),
        'duration_minutes': 120,
        'status': 'scheduled',
        'urgency': 'high',
        'google_meet_link': 'https://meet.google.com/sample-link'
    }
)

if created:
    meeting.invited_leaders.add(users['chief_makuei'], users['sarah_nyandeng'])
    print(f"✓ Created meeting: {meeting.title}")

print("\n✅ Sample data creation complete!")
print("\nYou can now:")
print("1. Access the admin panel at http://127.0.0.1:8000/admin/")
print("2. Login with username: admin")
print("3. Explore the populated data")
print(f"\nCreated:")
print(f"  - {len(users)} users")
print(f"  - {len(topics)} forum topics")
print(f"  - {len(achievements_data)} achievements")
print(f"  - 1 community poll with 5 options")
print(f"  - {len(reports_data)} reports")
print(f"  - 1 scheduled meeting")
