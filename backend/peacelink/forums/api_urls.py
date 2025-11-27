from django.urls import path
from . import api_views

urlpatterns = [
    path('topics/', api_views.ForumTopicListCreate.as_view()),
    path('topics/<int:pk>/', api_views.ForumTopicDetail.as_view()),
    path('posts/', api_views.ForumPostListCreate.as_view()),
    path('posts/<int:pk>/', api_views.ForumPostRetrieveUpdateDestroy.as_view()),
    path('posts/<int:post_id>/like/', api_views.like_post),
    path('posts/highlighted/', api_views.highlighted_posts),
    path('meetings/', api_views.MeetingListCreate.as_view()),
    path('meetings/<int:pk>/', api_views.MeetingDetail.as_view()),
    path('meetings/<int:meeting_id>/generate-link/', api_views.generate_meet_link),
    path('meetings/my/', api_views.my_meetings),
]
