from django.db import models
from peacelink.users.models import User

class ForumTopic(models.Model):
    CATEGORY_CHOICES = [
        ('conflict_resolution', 'Conflict Resolution'),
        ('infrastructure', 'Infrastructure'),
        ('governance', 'Governance'),
        ('education', 'Education'),
        ('health', 'Health'),
        ('livelihoods', 'Livelihoods'),
        ('culture', 'Culture & Heritage'),
        ('youth', 'Youth Issues'),
        ('women', 'Women & Gender'),
        ('environment', 'Environment'),
        ('general', 'General Discussion'),
    ]
    
    TYPE_CHOICES = [
        ('community', 'Community Discussion'),
        ('formal', 'Formal Dialogue'),
    ]
    
    title = models.CharField(max_length=255)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    topic_type = models.CharField(max_length=20, choices=TYPE_CHOICES, default='community')
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='forum_topics')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_pinned = models.BooleanField(default=False)
    is_locked = models.BooleanField(default=False)
    view_count = models.IntegerField(default=0)
    
    # Formal dialogue specific fields
    scheduled_date = models.DateTimeField(null=True, blank=True)
    meeting_link = models.URLField(blank=True)
    is_live = models.BooleanField(default=False)
    max_participants = models.IntegerField(null=True, blank=True)
    
    class Meta:
        ordering = ['-is_pinned', '-updated_at']
        indexes = [
            models.Index(fields=['-created_at']),
            models.Index(fields=['category']),
            models.Index(fields=['topic_type']),
        ]
    
    def __str__(self):
        return self.title

class ForumPost(models.Model):
    topic = models.ForeignKey(ForumTopic, on_delete=models.CASCADE, related_name='posts', null=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='forum_posts')
    content = models.TextField(blank=True)  # Optional if audio is provided
    audio_recording = models.FileField(upload_to='forum_audio/', null=True, blank=True)
    attachment = models.FileField(upload_to='forum_attachments/', null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    trusted = models.BooleanField(default=False)
    approved = models.BooleanField(default=True)  # Auto-approve for now, can change later
    language = models.CharField(max_length=32, default='en')
    parent = models.ForeignKey('self', null=True, blank=True, on_delete=models.CASCADE, related_name='replies')
    view_count = models.IntegerField(default=0)
    is_highlighted = models.BooleanField(default=False)  # For featured/engaged posts
    
    class Meta:
        ordering = ['created_at']
    
    def __str__(self):
        return f"Post by {self.user.username} in {self.topic.title}"

class ForumLike(models.Model):
    post = models.ForeignKey(ForumPost, on_delete=models.CASCADE, related_name='likes')
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        unique_together = ('post', 'user')
    
    def __str__(self):
        return f"{self.user.username} likes post {self.post.id}"


class Meeting(models.Model):
    """Admin-scheduled meetings for urgent political intervention"""
    STATUS_CHOICES = [
        ('scheduled', 'Scheduled'),
        ('ongoing', 'Ongoing'),
        ('completed', 'Completed'),
        ('cancelled', 'Cancelled'),
    ]
    
    URGENCY_CHOICES = [
        ('critical', 'Critical'),
        ('high', 'High'),
        ('medium', 'Medium'),
        ('normal', 'Normal'),
    ]
    
    title = models.CharField(max_length=255)
    description = models.TextField()
    scheduled_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='scheduled_meetings')
    scheduled_time = models.DateTimeField()
    duration_minutes = models.IntegerField(default=60)
    google_meet_link = models.URLField(blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='scheduled')
    urgency = models.CharField(max_length=20, choices=URGENCY_CHOICES, default='medium')
    
    # Leader invitations
    invited_leaders = models.ManyToManyField(User, related_name='invited_meetings', blank=True)
    attendees = models.ManyToManyField(User, related_name='attended_meetings', blank=True)
    
    # Meeting notes/outcomes
    notes = models.TextField(blank=True)
    action_items = models.TextField(blank=True)
    
    # Related topic/issue
    related_topic = models.ForeignKey(ForumTopic, on_delete=models.SET_NULL, null=True, blank=True, related_name='meetings')
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-scheduled_time']
        indexes = [
            models.Index(fields=['-scheduled_time']),
            models.Index(fields=['status']),
            models.Index(fields=['urgency']),
        ]
    
    def __str__(self):
        return f"{self.title} - {self.scheduled_time.strftime('%Y-%m-%d %H:%M')}"
