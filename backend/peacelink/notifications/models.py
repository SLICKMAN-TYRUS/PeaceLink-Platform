from django.db import models
from peacelink.users.models import User

class Alert(models.Model):
    message = models.TextField()
    sent_at = models.DateTimeField(auto_now_add=True)
    sent_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    recipients = models.ManyToManyField(User, related_name='alerts')
    channel = models.CharField(max_length=32, default='push')  # push, sms, whatsapp
    verified = models.BooleanField(default=False)

    def __str__(self):
        return f"Alert: {self.message[:30]}..."


class EmergencyAlert(models.Model):
    """Critical emergency broadcasts"""
    SEVERITY_CHOICES = [
        ('critical', 'Critical - Immediate Action'),
        ('severe', 'Severe - Act Soon'),
        ('moderate', 'Moderate - Be Aware'),
        ('info', 'Informational'),
    ]
    
    ALERT_TYPE_CHOICES = [
        ('conflict', 'Armed Conflict'),
        ('flood', 'Flooding'),
        ('drought', 'Drought/Food Shortage'),
        ('disease', 'Disease Outbreak'),
        ('evacuation', 'Evacuation Order'),
        ('safety', 'Safety Warning'),
        ('resource', 'Resource Distribution'),
        ('meeting', 'Emergency Meeting'),
        ('other', 'Other Emergency'),
    ]
    
    title = models.CharField(max_length=255)
    message = models.TextField()
    alert_type = models.CharField(max_length=30, choices=ALERT_TYPE_CHOICES)
    severity = models.CharField(max_length=20, choices=SEVERITY_CHOICES)
    
    # Targeting
    target_regions = models.JSONField(default=list)  # ['Juba', 'Bor']
    target_counties = models.JSONField(default=list)
    target_states = models.JSONField(default=list)
    broadcast_all = models.BooleanField(default=False)
    
    # Sender
    issued_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='issued_alerts')
    issuing_organization = models.CharField(max_length=255, blank=True)
    
    # Channels
    send_push = models.BooleanField(default=True)
    send_sms = models.BooleanField(default=True)
    send_whatsapp = models.BooleanField(default=False)
    
    # Tracking
    recipients_count = models.IntegerField(default=0)
    delivered_count = models.IntegerField(default=0)
    read_count = models.IntegerField(default=0)
    
    # Status
    is_active = models.BooleanField(default=True)
    expires_at = models.DateTimeField(null=True, blank=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.severity.upper()}: {self.title}"


class Notification(models.Model):
    """Real-time notifications for users"""
    TYPE_CHOICES = [
        ('report_status', 'Report Status Update'),
        ('report_comment', 'Report Comment'),
        ('meeting_invite', 'Meeting Invitation'),
        ('meeting_reminder', 'Meeting Reminder'),
        ('forum_reply', 'Forum Reply'),
        ('forum_mention', 'Forum Mention'),
        ('forum_like', 'Forum Like'),
        ('message', 'Direct Message'),
        ('emergency_alert', 'Emergency Alert'),
        ('verification', 'Verification Update'),
        ('resource_added', 'New Resource Available'),
        ('system', 'System Notification'),
    ]
    
    PRIORITY_CHOICES = [
        ('critical', 'Critical'),
        ('high', 'High'),
        ('medium', 'Medium'),
        ('low', 'Low'),
    ]
    
    recipient = models.ForeignKey(User, on_delete=models.CASCADE, related_name='notifications')
    notification_type = models.CharField(max_length=30, choices=TYPE_CHOICES)
    priority = models.CharField(max_length=20, choices=PRIORITY_CHOICES, default='medium')
    title = models.CharField(max_length=255)
    message = models.TextField()
    
    # Related objects
    report_id = models.IntegerField(null=True, blank=True)
    forum_post_id = models.IntegerField(null=True, blank=True)
    meeting_id = models.IntegerField(null=True, blank=True)
    message_id = models.IntegerField(null=True, blank=True)
    
    # Action URL
    action_url = models.CharField(max_length=255, blank=True)
    
    # Status
    read = models.BooleanField(default=False)
    read_at = models.DateTimeField(null=True, blank=True)
    sent = models.BooleanField(default=False)
    sent_at = models.DateTimeField(null=True, blank=True)
    
    # Push notification
    push_sent = models.BooleanField(default=False)
    sms_sent = models.BooleanField(default=False)
    
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['recipient', '-created_at']),
            models.Index(fields=['recipient', 'read']),
            models.Index(fields=['notification_type']),
            models.Index(fields=['priority']),
        ]
    
    def __str__(self):
        return f"{self.notification_type} for {self.recipient.username}: {self.title}"
    
    def mark_as_read(self):
        from django.utils import timezone
        if not self.read:
            self.read = True
            self.read_at = timezone.now()
            self.save()


class NotificationPreference(models.Model):
    """User preferences for notifications"""
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='notification_preferences')
    
    # Channel preferences
    push_enabled = models.BooleanField(default=True)
    sms_enabled = models.BooleanField(default=False)
    email_enabled = models.BooleanField(default=False)
    
    # Type preferences
    report_notifications = models.BooleanField(default=True)
    meeting_notifications = models.BooleanField(default=True)
    forum_notifications = models.BooleanField(default=True)
    message_notifications = models.BooleanField(default=True)
    emergency_notifications = models.BooleanField(default=True)
    
    # Quiet hours
    quiet_hours_enabled = models.BooleanField(default=False)
    quiet_hours_start = models.TimeField(null=True, blank=True)
    quiet_hours_end = models.TimeField(null=True, blank=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"Notification preferences for {self.user.username}"
