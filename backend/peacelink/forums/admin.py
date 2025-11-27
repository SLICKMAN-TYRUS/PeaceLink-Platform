from django.contrib import admin
from .models import ForumPost, ForumTopic, ForumLike, Meeting

@admin.register(ForumTopic)
class ForumTopicAdmin(admin.ModelAdmin):
    list_display = ['title', 'category', 'topic_type', 'author', 'is_pinned', 'created_at']
    list_filter = ['category', 'topic_type', 'is_pinned', 'created_at']
    search_fields = ['title']
    readonly_fields = ['view_count']

@admin.register(ForumPost)
class ForumPostAdmin(admin.ModelAdmin):
    list_display = ['topic', 'user', 'is_highlighted', 'approved', 'created_at']
    list_filter = ['is_highlighted', 'approved', 'created_at']
    search_fields = ['content', 'user__username']
    readonly_fields = ['view_count']

@admin.register(ForumLike)
class ForumLikeAdmin(admin.ModelAdmin):
    list_display = ['post', 'user', 'created_at']
    list_filter = ['created_at']
    search_fields = ['user__username']

@admin.register(Meeting)
class MeetingAdmin(admin.ModelAdmin):
    list_display = ['title', 'scheduled_by', 'scheduled_time', 'status', 'urgency']
    list_filter = ['status', 'urgency', 'scheduled_time']
    search_fields = ['title', 'description']
    filter_horizontal = ['invited_leaders', 'attendees']
