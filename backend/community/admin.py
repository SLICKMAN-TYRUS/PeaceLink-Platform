from django.contrib import admin
from .models import (
    Conversation, Message, Poll, PollOption, PollVote,
    Event, EventReminder, Achievement, UserAchievement,
    SuccessStory, Translation, OfflineData
)

@admin.register(Conversation)
class ConversationAdmin(admin.ModelAdmin):
    list_display = ['id', 'is_group', 'group_name', 'is_mediation', 'created_at']
    list_filter = ['is_group', 'is_mediation', 'created_at']
    search_fields = ['group_name']
    filter_horizontal = ['participants']

@admin.register(Message)
class MessageAdmin(admin.ModelAdmin):
    list_display = ['conversation', 'sender', 'encrypted', 'created_at']
    list_filter = ['encrypted', 'created_at']
    search_fields = ['content', 'sender__username']
    readonly_fields = ['created_at']

@admin.register(Poll)
class PollAdmin(admin.ModelAdmin):
    list_display = ['title', 'creator', 'poll_type', 'start_date', 'end_date', 'total_votes']
    list_filter = ['poll_type', 'start_date', 'end_date']
    search_fields = ['title', 'description']
    readonly_fields = ['total_votes']

@admin.register(PollOption)
class PollOptionAdmin(admin.ModelAdmin):
    list_display = ['poll', 'text', 'order', 'vote_count']
    list_filter = ['poll']
    search_fields = ['text']

@admin.register(PollVote)
class PollVoteAdmin(admin.ModelAdmin):
    list_display = ['poll', 'user', 'option', 'created_at']
    list_filter = ['created_at']
    search_fields = ['user__username', 'poll__title']

@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ['title', 'event_type', 'organizer', 'start_time', 'location']
    list_filter = ['event_type', 'start_time', 'requires_rsvp', 'is_public']
    search_fields = ['title', 'description', 'location']
    filter_horizontal = ['attendees', 'interested']

@admin.register(EventReminder)
class EventReminderAdmin(admin.ModelAdmin):
    list_display = ['event', 'user', 'reminder_time', 'sent']
    list_filter = ['sent', 'reminder_time']
    search_fields = ['user__username', 'event__title']

@admin.register(Achievement)
class AchievementAdmin(admin.ModelAdmin):
    list_display = ['name', 'badge_type', 'points', 'required_actions']
    list_filter = ['badge_type']
    search_fields = ['name', 'description']

@admin.register(UserAchievement)
class UserAchievementAdmin(admin.ModelAdmin):
    list_display = ['user', 'achievement', 'progress', 'earned_at']
    list_filter = ['earned_at']
    search_fields = ['user__username', 'achievement__name']

@admin.register(SuccessStory)
class SuccessStoryAdmin(admin.ModelAdmin):
    list_display = ['title', 'submitted_by', 'verified', 'featured', 'view_count', 'created_at']
    list_filter = ['verified', 'featured', 'created_at']
    search_fields = ['title', 'description']
    filter_horizontal = ['participants']
    readonly_fields = ['view_count', 'created_at']

@admin.register(Translation)
class TranslationAdmin(admin.ModelAdmin):
    list_display = ['content_type', 'field_name', 'source_language', 'target_language', 'verified']
    list_filter = ['source_language', 'target_language', 'verified']
    search_fields = ['original_text', 'translated_text']

@admin.register(OfflineData)
class OfflineDataAdmin(admin.ModelAdmin):
    list_display = ['user', 'action_type', 'synced', 'created_at', 'synced_at']
    list_filter = ['synced', 'action_type', 'created_at']
    search_fields = ['user__username']
    readonly_fields = ['created_at', 'synced_at']
