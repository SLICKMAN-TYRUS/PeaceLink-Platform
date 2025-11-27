from django.urls import path
from . import api_views

urlpatterns = [
    path('', api_views.AnalyticsListCreate.as_view()),
    path('<int:pk>/', api_views.AnalyticsRetrieveUpdateDestroy.as_view()),
]
