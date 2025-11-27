from rest_framework import generics
from .models import Analytics
from .serializers import AnalyticsSerializer

class AnalyticsListCreate(generics.ListCreateAPIView):
    queryset = Analytics.objects.all()
    serializer_class = AnalyticsSerializer

class AnalyticsRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Analytics.objects.all()
    serializer_class = AnalyticsSerializer
