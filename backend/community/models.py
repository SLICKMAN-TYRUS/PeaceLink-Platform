from django.db import models
from peacelink.users.models import User

class Conversation(models.Model):
    """Direct messaging conversations"""
    participants = models.ManyToManyField(User, related_name='conversations')
    is_group = models.BooleanField(default=False)
    group_name = models.CharField(max_length=255, blank=True)
    group_avatar = models.URLField(blank=True)
    is_mediation = models.BooleanField(default=False)  # Facilitated mediation chat
    mediator = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='mediated_conversations')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        if self.is_group:
            return self.group_name or f"Group chat with {self.participants.count()} members"
        return f"Conversation {self.id}"


class Message(models.Model):
    """Individual messages in conversations"""
    conversation = models.ForeignKey(Conversation, on_delete=models.CASCADE, related_name='messages')
    sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name='sent_messages')
    content = models.TextField(blank=True)
    audio_message = models.FileField(upload_to='messages/audio/', null=True, blank=True)
    attachment = models.FileField(upload_to='messages/attachments/', null=True, blank=True)
    
    # Encryption
    encrypted = models.BooleanField(default=False)
    
    # Status
    read_by = models.ManyToManyField(User, related_name='read_messages', blank=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    edited_at = models.DateTimeField(null=True, blank=True)
    
    class Meta:
        ordering = ['created_at']
    
    def __str__(self):
        return f"Message from {self.sender.username} at {self.created_at}"


class Poll(models.Model):
    """Community polls and surveys"""
    POLL_TYPE_CHOICES = [
        ('single', 'Single Choice'),
        ('multiple', 'Multiple Choice'),
        ('rating', 'Rating Scale'),
        ('text', 'Text Response'),
    ]
    
    creator = models.ForeignKey(User, on_delete=models.CASCADE, related_name='created_polls')
    title = models.CharField(max_length=255)
    description = models.TextField()
    poll_type = models.CharField(max_length=20, choices=POLL_TYPE_CHOICES, default='single')
    
    # Targeting
    target_region = models.CharField(max_length=100, blank=True)
    target_roles = models.JSONField(default=list, blank=True)  # ['elder', 'youth']
    
    # Settings
    anonymous_voting = models.BooleanField(default=True)
    allow_comments = models.BooleanField(default=True)
    multiple_votes = models.BooleanField(default=False)
    
    # Timing
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()
    is_active = models.BooleanField(default=True)
    
    # Stats
    total_votes = models.IntegerField(default=0)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.title


class PollOption(models.Model):
    """Options for a poll"""
    poll = models.ForeignKey(Poll, on_delete=models.CASCADE, related_name='options')
    text = models.CharField(max_length=255)
    order = models.IntegerField(default=0)
    vote_count = models.IntegerField(default=0)
    
    class Meta:
        ordering = ['order']
    
    def __str__(self):
        return f"{self.poll.title} - {self.text}"


class PollVote(models.Model):
    """Individual votes on polls"""
    poll = models.ForeignKey(Poll, on_delete=models.CASCADE, related_name='votes')
    option = models.ForeignKey(PollOption, on_delete=models.CASCADE, related_name='votes')
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='poll_votes')
    text_response = models.TextField(blank=True)  # For text response polls
    rating_value = models.IntegerField(null=True, blank=True)  # For rating polls
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        unique_together = ('poll', 'user')  # Prevent duplicate votes unless multiple_votes=True
    
    def __str__(self):
        return f"Vote by {self.user.username} on {self.poll.title}"


class Event(models.Model):
    """Community events and meetings"""
    EVENT_TYPE_CHOICES = [
        ('meeting', 'Community Meeting'),
        ('ceremony', 'Traditional Ceremony'),
        ('training', 'Training Session'),
        ('market', 'Market Day'),
        ('dialogue', 'Peace Dialogue'),
        ('celebration', 'Celebration'),
        ('other', 'Other'),
    ]
    
    title = models.CharField(max_length=255)
    description = models.TextField()
    event_type = models.CharField(max_length=30, choices=EVENT_TYPE_CHOICES)
    organizer = models.ForeignKey(User, on_delete=models.CASCADE, related_name='organized_events')
    
    # Location
    location = models.CharField(max_length=255)
    latitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    longitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    
    # Timing
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    
    # Participants
    max_participants = models.IntegerField(null=True, blank=True)
    attendees = models.ManyToManyField(User, related_name='attending_events', blank=True)
    interested = models.ManyToManyField(User, related_name='interested_events', blank=True)
    
    # Settings
    requires_rsvp = models.BooleanField(default=False)
    is_public = models.BooleanField(default=True)
    
    # Related
    meeting_link = models.URLField(blank=True)
    related_forum_topic = models.IntegerField(null=True, blank=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['start_time']
    
    def __str__(self):
        return f"{self.title} on {self.start_time.strftime('%Y-%m-%d')}"


class EventReminder(models.Model):
    """Reminders for events"""
    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name='reminders')
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    reminder_time = models.DateTimeField()
    sent = models.BooleanField(default=False)
    
    def __str__(self):
        return f"Reminder for {self.user.username} - {self.event.title}"


class Achievement(models.Model):
    """Gamification achievements and badges"""
    BADGE_TYPE_CHOICES = [
        ('peacemaker', 'Peacemaker'),
        ('helper', 'Community Helper'),
        ('contributor', 'Active Contributor'),
        ('mediator', 'Skilled Mediator'),
        ('reporter', 'Trusted Reporter'),
        ('leader', 'Community Leader'),
        ('mentor', 'Elder Mentor'),
        ('innovator', 'Innovator'),
    ]
    
    name = models.CharField(max_length=100)
    description = models.TextField()
    badge_type = models.CharField(max_length=30, choices=BADGE_TYPE_CHOICES)
    icon = models.URLField(blank=True)
    points = models.IntegerField(default=10)
    
    # Criteria
    required_actions = models.IntegerField(default=1)
    action_type = models.CharField(max_length=50)  # 'resolve_conflict', 'helpful_post', etc.
    
    def __str__(self):
        return self.name


class UserAchievement(models.Model):
    """Track user achievements"""
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='achievements')
    achievement = models.ForeignKey(Achievement, on_delete=models.CASCADE)
    earned_at = models.DateTimeField(auto_now_add=True)
    progress = models.IntegerField(default=0)  # For multi-step achievements
    
    class Meta:
        unique_together = ('user', 'achievement')
        ordering = ['-earned_at']
    
    def __str__(self):
        return f"{self.user.username} earned {self.achievement.name}"


class SuccessStory(models.Model):
    """Document resolved conflicts and positive outcomes"""
    title = models.CharField(max_length=255)
    description = models.TextField()
    related_report = models.ForeignKey('reports.Report', on_delete=models.SET_NULL, null=True, blank=True)
    related_forum_topic = models.IntegerField(null=True, blank=True)
    
    # Participants
    submitted_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='submitted_stories')
    participants = models.ManyToManyField(User, related_name='story_participations', blank=True)
    
    # Media
    before_photo = models.URLField(blank=True)
    after_photo = models.URLField(blank=True)
    video_url = models.URLField(blank=True)
    
    # Impact
    people_impacted = models.IntegerField(default=0)
    community_rating = models.DecimalField(max_digits=3, decimal_places=2, default=0)  # Average rating
    
    # Status
    verified = models.BooleanField(default=False)
    featured = models.BooleanField(default=False)
    view_count = models.IntegerField(default=0)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.title


class Translation(models.Model):
    """Store translations for content"""
    content_type = models.CharField(max_length=50)  # 'report', 'forum_post', 'resource'
    content_id = models.IntegerField()
    field_name = models.CharField(max_length=50)  # 'title', 'description', 'content'
    original_text = models.TextField()
    translated_text = models.TextField()
    source_language = models.CharField(max_length=10)
    target_language = models.CharField(max_length=10)
    
    # Quality
    verified = models.BooleanField(default=False)
    verified_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        unique_together = ('content_type', 'content_id', 'field_name', 'target_language')
    
    def __str__(self):
        return f"Translation: {self.source_language} → {self.target_language}"


class OfflineData(models.Model):
    """Queue for offline actions"""
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='offline_queue')
    action_type = models.CharField(max_length=50)  # 'create_report', 'post_comment', etc.
    action_data = models.JSONField()
    synced = models.BooleanField(default=False)
    synced_at = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['created_at']
    
    def __str__(self):
        return f"{self.action_type} by {self.user.username} (synced: {self.synced})"
