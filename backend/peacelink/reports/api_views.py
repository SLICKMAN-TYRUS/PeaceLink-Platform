from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from .models import Report, ReportMedia
from .serializers import ReportSerializer, ReportListSerializer
from django.db.models import Q

class ReportListCreate(generics.ListCreateAPIView):
    parser_classes = (MultiPartParser, FormParser)
    
    def get_serializer_class(self):
        if self.request.method == 'GET':
            return ReportListSerializer
        return ReportSerializer
    
    def get_queryset(self):
        queryset = Report.objects.all()
        status_filter = self.request.query_params.get('status', None)
        category_filter = self.request.query_params.get('category', None)
        user_id = self.request.query_params.get('user_id', None)
        
        if status_filter:
            queryset = queryset.filter(status=status_filter)
        if category_filter:
            queryset = queryset.filter(category=category_filter)
        if user_id:
            queryset = queryset.filter(user_id=user_id)
            
        return queryset
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        report = serializer.save()
        
        # Handle multiple media files
        files = request.FILES.getlist('media_files')
        for file in files:
            file_type = 'image' if file.content_type.startswith('image/') else 'video'
            ReportMedia.objects.create(report=report, file=file, file_type=file_type)
        
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

class ReportRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Report.objects.all()
    serializer_class = ReportSerializer
    parser_classes = (MultiPartParser, FormParser)
