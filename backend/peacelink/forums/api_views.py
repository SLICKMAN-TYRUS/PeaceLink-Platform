from rest_framework import generics, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser
from .models import ForumTopic, ForumPost, ForumLike, Meeting
from .serializers import (ForumTopicSerializer, ForumTopicDetailSerializer, 
                          ForumPostSerializer, MeetingSerializer)
from django.db.models import Q, Count, F

class ForumTopicListCreate(generics.ListCreateAPIView):
    serializer_class = ForumTopicSerializer
    
    def get_queryset(self):
        queryset = ForumTopic.objects.all()
        topic_type = self.request.query_params.get('type', None)
        category = self.request.query_params.get('category', None)
        search = self.request.query_params.get('search', None)
        
        if topic_type:
            queryset = queryset.filter(topic_type=topic_type)
        if category:
            queryset = queryset.filter(category=category)
        if search:
            queryset = queryset.filter(
                Q(title__icontains=search) | Q(posts__content__icontains=search)
            ).distinct()
        
        return queryset

class ForumTopicDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = ForumTopic.objects.all()
    serializer_class = ForumTopicDetailSerializer
    
    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        # Increment view count
        instance.view_count += 1
        instance.save(update_fields=['view_count'])
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

class ForumPostListCreate(generics.ListCreateAPIView):
    serializer_class = ForumPostSerializer
    
    def get_queryset(self):
        topic_id = self.request.query_params.get('topic', None)
        if topic_id:
            return ForumPost.objects.filter(topic_id=topic_id, parent=None)
        return ForumPost.objects.all()

class ForumPostRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = ForumPost.objects.all()
    serializer_class = ForumPostSerializer

@api_view(['POST'])
def like_post(request, post_id):
    try:
        post = ForumPost.objects.get(id=post_id)
        like, created = ForumLike.objects.get_or_create(
            post=post,
            user=request.user
        )
        if not created:
            # Unlike if already liked
            like.delete()
            return Response({'liked': False, 'like_count': post.likes.count()})
        return Response({'liked': True, 'like_count': post.likes.count()})
    except ForumPost.DoesNotExist:
        return Response({'error': 'Post not found'}, status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
def highlighted_posts(request):
    """Get most engaged posts based on likes, replies, and views"""
    # Calculate engagement score: (likes * 2) + replies + (views / 10)
    posts = ForumPost.objects.annotate(
        like_count=Count('likes'),
        reply_count=Count('replies'),
        engagement_score=F('like_count') * 2 + F('reply_count') + F('view_count') / 10
    ).filter(
        parent=None,  # Only top-level posts
        approved=True
    ).order_by('-engagement_score', '-created_at')[:10]
    
    serializer = ForumPostSerializer(posts, many=True, context={'request': request})
    return Response(serializer.data)


# Meeting Management Views (Admin only)
class MeetingListCreate(generics.ListCreateAPIView):
    serializer_class = MeetingSerializer
    
    def get_queryset(self):
        queryset = Meeting.objects.all()
        status_filter = self.request.query_params.get('status', None)
        urgency = self.request.query_params.get('urgency', None)
        
        if status_filter:
            queryset = queryset.filter(status=status_filter)
        if urgency:
            queryset = queryset.filter(urgency=urgency)
        
        # Non-admin users only see meetings they're invited to
        if not self.request.user.role == 'admin':
            queryset = queryset.filter(invited_leaders=self.request.user)
        
        return queryset
    
    def perform_create(self, serializer):
        # Only admins can create meetings
        if self.request.user.role != 'admin':
            return Response({'error': 'Only admins can schedule meetings'}, 
                          status=status.HTTP_403_FORBIDDEN)
        serializer.save()


class MeetingDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Meeting.objects.all()
    serializer_class = MeetingSerializer
    
    def get_queryset(self):
        queryset = super().get_queryset()
        # Non-admin users only see meetings they're invited to
        if not self.request.user.role == 'admin':
            queryset = queryset.filter(invited_leaders=self.request.user)
        return queryset


@api_view(['POST'])
@permission_classes([IsAdminUser])
def generate_meet_link(request, meeting_id):
    """Generate or update Google Meet link for a meeting"""
    try:
        meeting = Meeting.objects.get(id=meeting_id)
        # In production, integrate with Google Calendar API
        # For now, generate a placeholder link
        meet_link = f"https://meet.google.com/xxx-xxxx-xxx"  # Placeholder
        meeting.google_meet_link = meet_link
        meeting.save()
        return Response({'meet_link': meet_link})
    except Meeting.DoesNotExist:
        return Response({'error': 'Meeting not found'}, status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
def my_meetings(request):
    """Get meetings for the current user"""
    meetings = Meeting.objects.filter(
        Q(invited_leaders=request.user) | Q(scheduled_by=request.user)
    ).distinct().order_by('-scheduled_time')
    
    serializer = MeetingSerializer(meetings, many=True, context={'request': request})
    return Response(serializer.data)
