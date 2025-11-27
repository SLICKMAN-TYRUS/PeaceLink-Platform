from django.contrib import admin
from .models import Report, ReportStatusHistory, ReportComment, ReportFollower

@admin.register(Report)
class ReportAdmin(admin.ModelAdmin):
    list_display = ['description', 'user', 'status', 'urgency', 'assigned_to', 'created_at']
    list_filter = ['status', 'urgency', 'created_at']
    search_fields = ['description', 'location', 'user__username']
    readonly_fields = ['created_at', 'resolved_at']

@admin.register(ReportStatusHistory)
class ReportStatusHistoryAdmin(admin.ModelAdmin):
    list_display = ['report', 'old_status', 'new_status', 'changed_by', 'created_at']
    list_filter = ['old_status', 'new_status', 'created_at']
    readonly_fields = ['created_at']

@admin.register(ReportComment)
class ReportCommentAdmin(admin.ModelAdmin):
    list_display = ['report', 'user', 'is_internal', 'created_at']
    list_filter = ['is_internal', 'created_at']
    search_fields = ['content', 'user__username']

@admin.register(ReportFollower)
class ReportFollowerAdmin(admin.ModelAdmin):
    list_display = ['report', 'user', 'created_at']
    list_filter = ['created_at']
    search_fields = ['user__username']
