from rest_framework import generics, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Resource, ResourceBookmark
from .serializers import ResourceSerializer, ResourceListSerializer
from django.db.models import Q

class ResourceListCreate(generics.ListCreateAPIView):
    def get_serializer_class(self):
        if self.request.method == 'GET':
            return ResourceListSerializer
        return ResourceSerializer
    
    def get_queryset(self):
        queryset = Resource.objects.filter(verified=True)
        category = self.request.query_params.get('category', None)
        resource_type = self.request.query_params.get('type', None)
        language = self.request.query_params.get('language', None)
        search = self.request.query_params.get('search', None)
        featured = self.request.query_params.get('featured', None)
        
        if category:
            queryset = queryset.filter(category=category)
        if resource_type:
            queryset = queryset.filter(resource_type=resource_type)
        if language:
            queryset = queryset.filter(language=language)
        if featured:
            queryset = queryset.filter(featured=True)
        if search:
            queryset = queryset.filter(
                Q(title__icontains=search) | 
                Q(description__icontains=search) |
                Q(tags__icontains=search) |
                Q(author__icontains=search)
            )
        
        return queryset

class ResourceRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Resource.objects.all()
    serializer_class = ResourceSerializer
    
    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        # Increment view count
        instance.view_count += 1
        instance.save(update_fields=['view_count'])
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

@api_view(['POST'])
def download_resource(request, resource_id):
    try:
        resource = Resource.objects.get(id=resource_id)
        resource.download_count += 1
        resource.save(update_fields=['download_count'])
        return Response({'success': True, 'download_count': resource.download_count})
    except Resource.DoesNotExist:
        return Response({'error': 'Resource not found'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
def bookmark_resource(request, resource_id):
    try:
        resource = Resource.objects.get(id=resource_id)
        bookmark, created = ResourceBookmark.objects.get_or_create(
            resource=resource,
            user=request.user
        )
        if not created:
            # Remove bookmark if already exists
            bookmark.delete()
            return Response({'bookmarked': False})
        return Response({'bookmarked': True})
    except Resource.DoesNotExist:
        return Response({'error': 'Resource not found'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
def my_bookmarks(request):
    bookmarks = Resource.objects.filter(bookmarks__user=request.user)
    serializer = ResourceListSerializer(bookmarks, many=True, context={'request': request})
    return Response(serializer.data)
