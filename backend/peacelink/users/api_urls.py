from django.urls import path
from . import api_views

urlpatterns = [
    path('', api_views.UserListCreate.as_view()),
    path('<int:pk>/', api_views.UserRetrieveUpdateDestroy.as_view()),
]
