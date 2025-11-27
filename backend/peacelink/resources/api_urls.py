from django.urls import path
from . import api_views

urlpatterns = [
    path('', api_views.ResourceListCreate.as_view()),
    path('<int:pk>/', api_views.ResourceRetrieveUpdateDestroy.as_view()),
]
