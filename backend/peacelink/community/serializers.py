from rest_framework import serializers
from peacelink.users.models import User
from .models import (Conversation, Message, Poll, PollOption, PollVote, Event, 
                     EventReminder, Achievement, UserAchievement, SuccessStory, 
                     Translation, OfflineData)

class UserBasicSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'role', 'location', 'avatar', 'verified', 'trust_score']


class MessageSerializer(serializers.ModelSerializer):
    sender_info = UserBasicSerializer(source='sender', read_only=True)
    
    class Meta:
        model = Message
        fields = ['id', 'conversation', 'sender', 'sender_info', 'content', 
                  'audio_message', 'attachment', 'encrypted', 'created_at', 'edited_at']
        read_only_fields = ['sender', 'created_at']
    
    def create(self, validated_data):
        validated_data['sender'] = self.context['request'].user
        return super().create(validated_data)


class ConversationSerializer(serializers.ModelSerializer):
    participants_info = UserBasicSerializer(source='participants', many=True, read_only=True)
    mediator_info = UserBasicSerializer(source='mediator', read_only=True)
    last_message = serializers.SerializerMethodField()
    unread_count = serializers.SerializerMethodField()
    
    def get_last_message(self, obj):
        last = obj.messages.order_by('-created_at').first()
        if last:
            return MessageSerializer(last).data
        return None
    
    def get_unread_count(self, obj):
        request = self.context.get('request')
        if request and request.user:
            return obj.messages.exclude(read_by=request.user).count()
        return 0
    
    class Meta:
        model = Conversation
        fields = ['id', 'participants', 'participants_info', 'is_group', 
                  'group_name', 'group_avatar', 'is_mediation', 'mediator',
                  'mediator_info', 'last_message', 'unread_count', 'created_at', 'updated_at']


class PollOptionSerializer(serializers.ModelSerializer):
    percentage = serializers.SerializerMethodField()
    
    def get_percentage(self, obj):
        if obj.poll.total_votes > 0:
            return round((obj.vote_count / obj.poll.total_votes) * 100, 1)
        return 0
    
    class Meta:
        model = PollOption
        fields = ['id', 'text', 'order', 'vote_count', 'percentage']


class PollSerializer(serializers.ModelSerializer):
    creator_info = UserBasicSerializer(source='creator', read_only=True)
    options = PollOptionSerializer(many=True, read_only=True)
    user_voted = serializers.SerializerMethodField()
    user_vote = serializers.SerializerMethodField()
    time_remaining = serializers.SerializerMethodField()
    
    def get_user_voted(self, obj):
        request = self.context.get('request')
        if request and request.user:
            return PollVote.objects.filter(poll=obj, user=request.user).exists()
        return False
    
    def get_user_vote(self, obj):
        request = self.context.get('request')
        if request and request.user:
            vote = PollVote.objects.filter(poll=obj, user=request.user).first()
            if vote:
                return vote.option.id if vote.option else None
        return None
    
    def get_time_remaining(self, obj):
        from django.utils import timezone
        if obj.end_date > timezone.now():
            delta = obj.end_date - timezone.now()
            return delta.total_seconds()
        return 0
    
    class Meta:
        model = Poll
        fields = ['id', 'creator', 'creator_info', 'title', 'description', 
                  'poll_type', 'target_region', 'target_roles', 'anonymous_voting',
                  'allow_comments', 'multiple_votes', 'start_date', 'end_date',
                  'is_active', 'total_votes', 'options', 'user_voted', 'user_vote',
                  'time_remaining', 'created_at']
        read_only_fields = ['creator', 'total_votes', 'created_at']


class PollVoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = PollVote
        fields = ['id', 'poll', 'option', 'text_response', 'rating_value', 'created_at']
        read_only_fields = ['user', 'created_at']
    
    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)


class EventSerializer(serializers.ModelSerializer):
    organizer_info = UserBasicSerializer(source='organizer', read_only=True)
    attendee_count = serializers.SerializerMethodField()
    interested_count = serializers.SerializerMethodField()
    user_status = serializers.SerializerMethodField()
    
    def get_attendee_count(self, obj):
        return obj.attendees.count()
    
    def get_interested_count(self, obj):
        return obj.interested.count()
    
    def get_user_status(self, obj):
        request = self.context.get('request')
        if request and request.user:
            if obj.attendees.filter(id=request.user.id).exists():
                return 'attending'
            if obj.interested.filter(id=request.user.id).exists():
                return 'interested'
        return 'none'
    
    class Meta:
        model = Event
        fields = ['id', 'title', 'description', 'event_type', 'organizer', 
                  'organizer_info', 'location', 'latitude', 'longitude',
                  'start_time', 'end_time', 'max_participants', 'attendee_count',
                  'interested_count', 'user_status', 'requires_rsvp', 'is_public',
                  'meeting_link', 'related_forum_topic', 'created_at']
        read_only_fields = ['organizer', 'created_at']


class AchievementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Achievement
        fields = ['id', 'name', 'description', 'badge_type', 'icon', 'points',
                  'required_actions', 'action_type']


class UserAchievementSerializer(serializers.ModelSerializer):
    achievement_info = AchievementSerializer(source='achievement', read_only=True)
    
    class Meta:
        model = UserAchievement
        fields = ['id', 'achievement', 'achievement_info', 'earned_at', 'progress']


class SuccessStorySerializer(serializers.ModelSerializer):
    submitted_by_info = UserBasicSerializer(source='submitted_by', read_only=True)
    participants_info = UserBasicSerializer(source='participants', many=True, read_only=True)
    
    class Meta:
        model = SuccessStory
        fields = ['id', 'title', 'description', 'related_report', 'related_forum_topic',
                  'submitted_by', 'submitted_by_info', 'participants', 'participants_info',
                  'before_photo', 'after_photo', 'video_url', 'people_impacted',
                  'community_rating', 'verified', 'featured', 'view_count', 'created_at']
        read_only_fields = ['submitted_by', 'view_count', 'created_at']


class TranslationSerializer(serializers.ModelSerializer):
    verified_by_info = UserBasicSerializer(source='verified_by', read_only=True)
    
    class Meta:
        model = Translation
        fields = ['id', 'content_type', 'content_id', 'field_name', 'original_text',
                  'translated_text', 'source_language', 'target_language', 'verified',
                  'verified_by', 'verified_by_info', 'created_at']


class OfflineDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = OfflineData
        fields = ['id', 'action_type', 'action_data', 'synced', 'synced_at', 'created_at']
        read_only_fields = ['user', 'synced', 'synced_at', 'created_at']
    
    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)
