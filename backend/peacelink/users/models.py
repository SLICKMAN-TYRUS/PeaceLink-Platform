from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    ROLES = [
        ('youth', 'Youth'),
        ('elder', 'Elder'),
        ('moderator', 'Moderator'),
        ('ngo', 'NGO/Government'),
        ('admin', 'Admin'),
    ]
    
    VERIFICATION_STATUS = [
        ('unverified', 'Unverified'),
        ('pending', 'Pending Verification'),
        ('verified', 'Verified'),
        ('rejected', 'Verification Rejected'),
    ]
    
    role = models.CharField(max_length=16, choices=ROLES, default='youth')
    verified = models.BooleanField(default=False)
    verification_status = models.CharField(max_length=20, choices=VERIFICATION_STATUS, default='unverified')
    verification_date = models.DateTimeField(null=True, blank=True)
    verified_by = models.ForeignKey('self', on_delete=models.SET_NULL, null=True, blank=True, related_name='verified_users')
    
    # Trust and reputation
    trust_score = models.IntegerField(default=50)  # 0-100 scale
    contribution_count = models.IntegerField(default=0)
    helpful_count = models.IntegerField(default=0)
    
    # Contact info
    phone = models.CharField(max_length=32, blank=True)
    alternative_phone = models.CharField(max_length=32, blank=True)
    whatsapp_number = models.CharField(max_length=32, blank=True)
    
    # Location
    location = models.CharField(max_length=128, blank=True)
    state = models.CharField(max_length=64, blank=True)
    county = models.CharField(max_length=64, blank=True)
    payam = models.CharField(max_length=64, blank=True)
    latitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    longitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    
    # Profile
    avatar = models.URLField(blank=True)
    bio = models.TextField(blank=True)
    languages = models.JSONField(default=list, blank=True)  # ['en', 'ar', 'dik']
    preferred_language = models.CharField(max_length=10, default='en')
    
    # Verification documents
    national_id = models.CharField(max_length=64, blank=True)
    residence_proof = models.CharField(max_length=128, blank=True)
    organization_name = models.CharField(max_length=255, blank=True)  # For NGOs
    organization_document = models.FileField(upload_to='verification_docs/', null=True, blank=True)
    elder_endorsement = models.FileField(upload_to='verification_docs/', null=True, blank=True)  # Letter from community
    
    # Preferences
    offline_mode_enabled = models.BooleanField(default=False)
    text_to_speech_enabled = models.BooleanField(default=False)
    
    # Activity
    last_active = models.DateTimeField(null=True, blank=True)
    is_ambassador = models.BooleanField(default=False)  # Community representative
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.username} ({self.role})"
    
    def update_trust_score(self):
        """Recalculate trust score based on activity"""
        base_score = 50
        contribution_bonus = min(self.contribution_count * 2, 30)
        helpful_bonus = min(self.helpful_count * 3, 20)
        verification_bonus = 10 if self.verified else 0
        
        self.trust_score = min(base_score + contribution_bonus + helpful_bonus + verification_bonus, 100)
        self.save()


class UserVerification(models.Model):
    """Track verification requests and history"""
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='verification_requests')
    verification_type = models.CharField(max_length=30)  # 'elder', 'ngo', 'youth_leader'
    documents_submitted = models.JSONField(default=dict)
    endorser = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='endorsed_verifications')
    status = models.CharField(max_length=20, default='pending')
    reviewed_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='reviewed_verifications')
    reviewed_at = models.DateTimeField(null=True, blank=True)
    notes = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return f"Verification request for {self.user.username} - {self.status}"
