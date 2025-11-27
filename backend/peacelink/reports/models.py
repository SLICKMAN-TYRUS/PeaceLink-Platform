from django.db import models
from peacelink.users.models import User

class Report(models.Model):
    CATEGORY_CHOICES = [
        ('conflict', 'Conflict / Dispute'),
        ('infrastructure', 'Infrastructure'),
        ('health', 'Health / Sanitation'),
        ('security', 'Security Concern'),
        ('livelihoods', 'Livelihoods / Employment'),
        ('education', 'Education / School Issues'),
        ('environment', 'Environment / Water Access'),
        ('gender', 'Gender-Based Violence'),
        ('resources', 'Resource Access / Aid'),
        ('alerts', 'Emergency / Alerts'),
        ('other', 'Other'),
    ]
    
    LANGUAGE_CHOICES = [
        ('en', 'English'),
        ('ar', 'Arabic'),
        ('dik', 'Dinka'),
        ('juba', 'Juba Arabic'),
        ('nuer', 'Nuer'),
        ('shiluk', 'Shiluk'),
        ('bari', 'Bari'),
    ]
    
    URGENCY_CHOICES = [
        ('critical', 'Critical'),
        ('high', 'High'),
        ('medium', 'Medium'),
        ('low', 'Low'),
    ]
    
    STATUS_CHOICES = [
        ('submitted', 'Submitted'),
        ('under_review', 'Under Review'),
        ('verified', 'Verified'),
        ('assigned', 'Assigned'),
        ('in_progress', 'In Progress'),
        ('resolved', 'Resolved'),
        ('closed', 'Closed'),
        ('rejected', 'Rejected'),
        ('escalated', 'Escalated'),
    ]
    
    CONTACT_CHOICES = [
        ('phone', 'Phone Call'),
        ('whatsapp', 'WhatsApp'),
        ('in-person', 'In-Person'),
        ('none', 'Do Not Contact'),
    ]
    
    # Basic Information
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='reports')
    category = models.CharField(max_length=32, choices=CATEGORY_CHOICES)
    language = models.CharField(max_length=10, choices=LANGUAGE_CHOICES, default='en')
    
    # Location & Timing
    location = models.CharField(max_length=255)
    nearest_landmark = models.CharField(max_length=255, blank=True)
    incident_date = models.DateField(null=True, blank=True)
    urgency = models.CharField(max_length=20, choices=URGENCY_CHOICES, default='medium')
    
    # Description
    description = models.TextField()
    audio_recording = models.FileField(upload_to='reports/audio/', null=True, blank=True)
    
    # Impact
    people_affected = models.IntegerField(null=True, blank=True)
    
    # Contact Information
    contact_preference = models.CharField(max_length=20, choices=CONTACT_CHOICES, default='phone')
    contact_number = models.CharField(max_length=20, blank=True)
    
    # Related & Privacy
    related_report_id = models.CharField(max_length=50, blank=True)
    anonymous_report = models.BooleanField(default=False)
    
    # Media
    photo = models.URLField(blank=True)
    
    # Status & Trust
    status = models.CharField(max_length=32, choices=STATUS_CHOICES, default='submitted')
    trusted = models.BooleanField(default=False)
    assigned_to = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='assigned_reports')
    reviewed_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='reviewed_reports')
    reviewed_at = models.DateTimeField(null=True, blank=True)
    resolution_timeline = models.DateTimeField(null=True, blank=True)
    resolved_at = models.DateTimeField(null=True, blank=True)
    
    # Follow-up
    follower_count = models.IntegerField(default=0)
    satisfaction_rating = models.IntegerField(null=True, blank=True)  # 1-5 stars
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['-created_at']),
            models.Index(fields=['status']),
            models.Index(fields=['category']),
            models.Index(fields=['assigned_to']),
            models.Index(fields=['urgency']),
        ]

    def __str__(self):
        return f"{self.category} by {self.user.username if not self.anonymous_report else 'Anonymous'} at {self.location}"


class ReportStatusHistory(models.Model):
    """Track status changes for transparency and accountability"""
    report = models.ForeignKey(Report, on_delete=models.CASCADE, related_name='status_history')
    old_status = models.CharField(max_length=32)
    new_status = models.CharField(max_length=32)
    changed_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    notes = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['created_at']
    
    def __str__(self):
        return f"Report #{self.report.id}: {self.old_status} → {self.new_status}"


class ReportComment(models.Model):
    """Comments and updates on reports"""
    report = models.ForeignKey(Report, on_delete=models.CASCADE, related_name='comments')
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField()
    is_internal = models.BooleanField(default=False)  # Internal admin notes
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['created_at']
    
    def __str__(self):
        return f"Comment on Report #{self.report.id} by {self.user.username}"


class ReportFollower(models.Model):
    """Users following a report for updates"""
    report = models.ForeignKey(Report, on_delete=models.CASCADE, related_name='followers')
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        unique_together = ('report', 'user')
    
    def __str__(self):
        return f"{self.user.username} following Report #{self.report.id}"


class ReportMedia(models.Model):
    report = models.ForeignKey(Report, on_delete=models.CASCADE, related_name='media_files')
    file = models.FileField(upload_to='reports/media/')
    file_type = models.CharField(max_length=10, choices=[('image', 'Image'), ('video', 'Video')])
    uploaded_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.file_type} for Report #{self.report.id}"
