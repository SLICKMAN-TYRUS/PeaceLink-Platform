from django.contrib import admin
from .models import User, UserVerification

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ['username', 'email', 'role', 'verification_status', 'trust_score', 'is_ambassador']
    list_filter = ['role', 'verification_status', 'is_ambassador', 'created_at']
    search_fields = ['username', 'email', 'phone', 'location']
    readonly_fields = ['trust_score', 'contribution_count', 'helpful_count', 'created_at', 'last_active']
    fieldsets = (
        ('Basic Info', {'fields': ('username', 'email', 'phone', 'role')}),
        ('Verification', {'fields': ('verification_status', 'verification_date', 'verified_by', 'trust_score')}),
        ('Location', {'fields': ('state', 'county', 'payam', 'latitude', 'longitude')}),
        ('Profile', {'fields': ('bio', 'languages', 'preferred_language')}),
        ('Organization', {'fields': ('organization_name', 'organization_document', 'elder_endorsement')}),
        ('Stats', {'fields': ('contribution_count', 'helpful_count', 'is_ambassador', 'created_at', 'last_active')}),
    )

@admin.register(UserVerification)
class UserVerificationAdmin(admin.ModelAdmin):
    list_display = ['user', 'verification_type', 'status', 'endorser', 'reviewed_by', 'created_at']
    list_filter = ['verification_type', 'status', 'created_at']
    search_fields = ['user__username', 'endorser__username']
    readonly_fields = ['created_at', 'reviewed_at']
