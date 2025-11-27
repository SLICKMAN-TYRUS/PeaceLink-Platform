from django.contrib import admin
from .models import Alert, Notification, NotificationPreference, EmergencyAlert

@admin.register(Notification)
class NotificationAdmin(admin.ModelAdmin):
    list_display = ['recipient', 'notification_type', 'title', 'priority', 'read', 'created_at']
    list_filter = ['notification_type', 'priority', 'read', 'created_at']
    search_fields = ['recipient__username', 'title', 'message']
    readonly_fields = ['created_at']

@admin.register(NotificationPreference)
class NotificationPreferenceAdmin(admin.ModelAdmin):
    list_display = ['user', 'push_enabled', 'sms_enabled', 'email_enabled']
    search_fields = ['user__username']

@admin.register(EmergencyAlert)
class EmergencyAlertAdmin(admin.ModelAdmin):
    list_display = ['title', 'severity', 'alert_type', 'issued_by', 'is_active', 'created_at']
    list_filter = ['severity', 'alert_type', 'is_active', 'created_at']
    search_fields = ['title', 'message']
    readonly_fields = ['created_at', 'recipients_count', 'delivered_count', 'read_count']

admin.site.register(Alert)
