from django.urls import path
from . import api_views

urlpatterns = [
    path('', api_views.ReportListCreate.as_view()),
    path('<int:pk>/', api_views.ReportRetrieveUpdateDestroy.as_view()),
]
