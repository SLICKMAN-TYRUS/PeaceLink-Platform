import os
import random
from typing import List

import django
from django.db import transaction
from django.utils.text import slugify
from faker import Faker

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'peacelink.settings')
django.setup()

from peacelink.users.models import User
from peacelink.reports.models import Report
from peacelink.forums.models import ForumPost
from peacelink.resources.models import Resource
from peacelink.analytics.models import Analytics
from peacelink.notifications.models import Alert

fake = Faker('en_US')

ROLE_COUNTS = {
    'admin': 2,
    'moderator': 4,
    'elder': 4,
    'ngo': 5,
    'youth': 10,
}

REPORT_STATUSES = ['pending', 'approved', 'flagged']
CATEGORIES = [choice[0] for choice in Report.CATEGORY_CHOICES]
LANGUAGES = ['en', 'ar', 'dik', 'juba', 'nuer', 'shiluk', 'bari']
RESOURCE_TOPICS = [
    'Conflict Mediation Toolkit',
    'Youth Empowerment Playbook',
    'Elder Mediation Scripts',
    'Community Trauma Support Guide',
    'Civic Education Curriculum',
]
ALERT_MESSAGES = [
    'Emergency meeting at the community hall',
    'Flood warning issued for Lower Nile ward',
    'Curfew lifted for verified zones',
    'Peace circle gathering in Juba central',
    'Security partners request status reports',
]
ANALYTIC_KEYS = {
    'reports_submitted': lambda: random.randint(20, 120),
    'reports_verified': lambda: random.randint(10, 90),
    'alerts_sent': lambda: random.randint(5, 40),
    'active_forum_threads': lambda: random.randint(3, 20),
    'resource_downloads': lambda: random.randint(50, 500),
}


def clear_existing_data() -> None:
    """Remove old seed data before re-populating to keep runs idempotent."""
    Alert.objects.all().delete()
    Analytics.objects.all().delete()
    Resource.objects.all().delete()
    ForumPost.objects.all().delete()
    Report.objects.all().delete()
    User.objects.exclude(is_superuser=True).delete()


def unique_username(base: str) -> str:
    slug = slugify(base)
    suffix = random.randint(100, 999)
    return f"{slug}-{suffix}"


def make_profile_photo(role: str) -> str:
    """Return a deterministic avatar placeholder based on role."""
    return f"https://cdn.peacelink.africa/avatars/{role}-{random.randint(1, 6)}.png"


def create_users() -> List[User]:
    users: List[User] = []

    for role, count in ROLE_COUNTS.items():
        for _ in range(count):
            full_name = fake.name()
            username = unique_username(full_name)
            user = User.objects.create_user(
                username=username,
                password='PeaceLink!23',
                role=role,
                verified=random.choice([True, False]) if role != 'admin' else True,
                phone=fake.phone_number(),
                location=fake.city(),
                avatar=make_profile_photo(role),
                national_id=fake.ssn(),
                residence_proof=f"{slugify(full_name)}-residence.pdf",
            )

            if role == 'admin':
                user.is_staff = True
                user.is_superuser = False
                user.email = fake.email()
                user.save(update_fields=['is_staff', 'is_superuser', 'email'])

            users.append(user)

    return users


def create_reports(users: List[User], count: int = 45) -> None:
    for _ in range(count):
        author = random.choice(users)
        Report.objects.create(
            user=author,
            category=random.choice(CATEGORIES),
            location=fake.address(),
            description=fake.paragraph(nb_sentences=3),
            status=random.choice(REPORT_STATUSES),
            photo=f"https://cdn.peacelink.africa/reports/{slugify(author.username)}-{random.randint(1000, 9999)}.jpg",
            trusted=random.choice([True, False]),
        )


def create_forum_posts(users: List[User], count: int = 35) -> None:
    themes = [
        'mediation success stories',
        'youth leadership tips',
        'community watch updates',
        'rapid response coordination',
        'resource requests',
    ]

    root_posts: List[ForumPost] = []

    for _ in range(count):
        poster = random.choice(users)
        topic = random.choice(themes)
        parent = random.choice(root_posts) if root_posts and random.random() < 0.4 else None

        post = ForumPost.objects.create(
            user=poster,
            content=f"[{topic.title()}] {fake.paragraph(nb_sentences=4)}",
            trusted=random.choice([True, False]),
            approved=random.choice([True, False]) if poster.role != 'admin' else True,
            language=random.choice(LANGUAGES),
            parent=parent,
        )

        if parent is None:
            root_posts.append(post)


def create_resources(users: List[User]) -> None:
    elders_and_ngos = [u for u in users if u.role in {'elder', 'ngo', 'moderator', 'admin'}]
    for topic in RESOURCE_TOPICS:
        uploader = random.choice(elders_and_ngos)
        Resource.objects.create(
            title=topic,
            description=fake.paragraph(nb_sentences=4),
            file_url=f"https://cdn.peacelink.africa/resources/{slugify(topic)}.pdf",
            uploaded_by=uploader,
            verified=uploader.role in {'admin', 'moderator'},
            language=random.choice(LANGUAGES),
        )


def create_analytics() -> None:
    for key, generator in ANALYTIC_KEYS.items():
        Analytics.objects.create(
            key=key,
            value=float(generator()),
        )


def create_alerts(users: List[User], count: int = 12) -> None:
    ngo_and_admin = [u for u in users if u.role in {'ngo', 'admin', 'moderator'}]
    for _ in range(count):
        sender = random.choice(ngo_and_admin)
        potential_recipients = [u for u in users if u != sender]
        recipients = random.sample(potential_recipients, k=min(len(potential_recipients), random.randint(2, 6)))

        alert = Alert.objects.create(
            message=random.choice(ALERT_MESSAGES),
            sent_by=sender,
            channel=random.choice(['push', 'sms', 'whatsapp']),
            verified=sender.role in {'admin', 'moderator'},
        )
        alert.recipients.set(recipients)


@transaction.atomic
def run_seed() -> None:
    clear_existing_data()
    users = create_users()
    create_reports(users)
    create_forum_posts(users)
    create_resources(users)
    create_analytics()
    create_alerts(users)
    print("✅ PeaceLink demo data refreshed")


if __name__ == "__main__":
    run_seed()
