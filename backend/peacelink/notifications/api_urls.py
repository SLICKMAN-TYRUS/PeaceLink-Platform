from django.urls import path
from . import api_views

urlpatterns = [
    path('', api_views.AlertListCreate.as_view()),
    path('<int:pk>/', api_views.AlertRetrieveUpdateDestroy.as_view()),
]
