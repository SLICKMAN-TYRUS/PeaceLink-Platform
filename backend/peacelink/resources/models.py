from django.db import models
from peacelink.users.models import User

class Resource(models.Model):
    CATEGORY_CHOICES = [
        ('legal', 'Legal Guides'),
        ('mental_health', 'Mental Health'),
        ('education', 'Education'),
        ('employment', 'Employment & Jobs'),
        ('peacebuilding', 'Peacebuilding'),
        ('health', 'Health & Wellness'),
        ('agriculture', 'Agriculture & Livelihoods'),
        ('womens_rights', "Women's Rights"),
        ('child_protection', 'Child Protection'),
        ('conflict_resolution', 'Conflict Resolution'),
        ('cultural', 'Cultural Heritage'),
        ('emergency', 'Emergency Resources'),
    ]
    
    TYPE_CHOICES = [
        ('pdf', 'PDF Document'),
        ('audio', 'Audio'),
        ('video', 'Video'),
        ('link', 'External Link'),
        ('text', 'Text Guide'),
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
    
    title = models.CharField(max_length=255)
    description = models.TextField()
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES, default='legal')
    resource_type = models.CharField(max_length=20, choices=TYPE_CHOICES, default='pdf')
    file_url = models.URLField()
    file_size = models.CharField(max_length=20, blank=True)  # e.g., "2.5 MB"
    thumbnail_url = models.URLField(blank=True)
    
    uploaded_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='uploaded_resources')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    verified = models.BooleanField(default=False)
    featured = models.BooleanField(default=False)
    language = models.CharField(max_length=10, choices=LANGUAGE_CHOICES, default='en')
    
    # Engagement metrics
    download_count = models.IntegerField(default=0)
    view_count = models.IntegerField(default=0)
    
    # Additional metadata
    author = models.CharField(max_length=255, blank=True)  # Original author/organization
    tags = models.CharField(max_length=255, blank=True)  # Comma-separated tags
    duration = models.CharField(max_length=20, blank=True)  # For audio/video, e.g., "45 min"
    
    class Meta:
        ordering = ['-featured', '-created_at']
        indexes = [
            models.Index(fields=['-created_at']),
            models.Index(fields=['category']),
            models.Index(fields=['resource_type']),
            models.Index(fields=['verified']),
        ]

    def __str__(self):
        return self.title

class ResourceBookmark(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='bookmarked_resources')
    resource = models.ForeignKey(Resource, on_delete=models.CASCADE, related_name='bookmarks')
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        unique_together = ('user', 'resource')
    
    def __str__(self):
        return f"{self.user.username} bookmarked {self.resource.title}"
