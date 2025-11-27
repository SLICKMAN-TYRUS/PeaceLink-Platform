from rest_framework import serializers
from .models import ForumTopic, ForumPost, ForumLike, Meeting
from peacelink.users.models import User

class UserBasicSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'role', 'location', 'avatar']

class ForumPostSerializer(serializers.ModelSerializer):
    user_info = UserBasicSerializer(source='user', read_only=True)
    reply_count = serializers.SerializerMethodField()
    like_count = serializers.SerializerMethodField()
    is_liked = serializers.SerializerMethodField()
    replies = serializers.SerializerMethodField()
    
    def get_reply_count(self, obj):
        return obj.replies.count()
    
    def get_like_count(self, obj):
        return obj.likes.count()
    
    def get_is_liked(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            return obj.likes.filter(user=request.user).exists()
        return False
    
    def get_replies(self, obj):
        if obj.parent is None:  # Only get replies for top-level posts
            replies = obj.replies.all()[:5]  # Limit to 5 most recent
            return ForumPostSerializer(replies, many=True, context=self.context).data
        return []
    
    class Meta:
        model = ForumPost
        fields = ['id', 'topic', 'user', 'user_info', 'content', 'audio_recording', 
                  'attachment', 'created_at', 'updated_at', 'trusted', 'approved', 
                  'language', 'parent', 'view_count', 'is_highlighted',
                  'reply_count', 'like_count', 'is_liked', 'replies']
        read_only_fields = ['user', 'created_at', 'updated_at', 'view_count']
    
    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)

class ForumTopicSerializer(serializers.ModelSerializer):
    author_info = UserBasicSerializer(source='author', read_only=True)
    post_count = serializers.SerializerMethodField()
    latest_post = serializers.SerializerMethodField()
    participant_count = serializers.SerializerMethodField()
    
    def get_post_count(self, obj):
        return obj.posts.count()
    
    def get_latest_post(self, obj):
        latest = obj.posts.order_by('-created_at').first()
        if latest:
            return {
                'user': latest.user.username,
                'created_at': latest.created_at
            }
        return None
    
    def get_participant_count(self, obj):
        return obj.posts.values('user').distinct().count()
    
    class Meta:
        model = ForumTopic
        fields = ['id', 'title', 'category', 'topic_type', 'author', 'author_info',
                  'created_at', 'updated_at', 'is_pinned', 'is_locked', 'view_count',
                  'scheduled_date', 'meeting_link', 'is_live', 'max_participants',
                  'post_count', 'latest_post', 'participant_count']
        read_only_fields = ['author', 'created_at', 'updated_at', 'view_count']
    
    def create(self, validated_data):
        validated_data['author'] = self.context['request'].user
        return super().create(validated_data)

class ForumTopicDetailSerializer(ForumTopicSerializer):
    posts = serializers.SerializerMethodField()
    
    def get_posts(self, obj):
        # Get only top-level posts (parent=None), replies are nested in ForumPostSerializer
        posts = obj.posts.filter(parent=None).order_by('created_at')
        return ForumPostSerializer(posts, many=True, context=self.context).data
    
    class Meta(ForumTopicSerializer.Meta):
        fields = ForumTopicSerializer.Meta.fields + ['posts']


class MeetingSerializer(serializers.ModelSerializer):
    scheduled_by_info = UserBasicSerializer(source='scheduled_by', read_only=True)
    invited_leaders_info = UserBasicSerializer(source='invited_leaders', many=True, read_only=True)
    attendees_info = UserBasicSerializer(source='attendees', many=True, read_only=True)
    invited_count = serializers.SerializerMethodField()
    attendee_count = serializers.SerializerMethodField()
    
    def get_invited_count(self, obj):
        return obj.invited_leaders.count()
    
    def get_attendee_count(self, obj):
        return obj.attendees.count()
    
    class Meta:
        model = Meeting
        fields = ['id', 'title', 'description', 'scheduled_by', 'scheduled_by_info',
                  'scheduled_time', 'duration_minutes', 'google_meet_link', 'status',
                  'urgency', 'invited_leaders', 'invited_leaders_info', 'attendees',
                  'attendees_info', 'invited_count', 'attendee_count', 'notes',
                  'action_items', 'related_topic', 'created_at', 'updated_at']
        read_only_fields = ['scheduled_by', 'created_at', 'updated_at']
    
    def create(self, validated_data):
        validated_data['scheduled_by'] = self.context['request'].user
        invited_leaders = validated_data.pop('invited_leaders', [])
        meeting = Meeting.objects.create(**validated_data)
        if invited_leaders:
            meeting.invited_leaders.set(invited_leaders)
        return meeting
