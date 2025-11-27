from rest_framework import serializers
from .models import Resource, ResourceBookmark
from peacelink.users.models import User

class UserBasicSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'role']

class ResourceSerializer(serializers.ModelSerializer):
    uploaded_by_info = UserBasicSerializer(source='uploaded_by', read_only=True)
    is_bookmarked = serializers.SerializerMethodField()
    tags_list = serializers.SerializerMethodField()
    
    def get_is_bookmarked(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            return obj.bookmarks.filter(user=request.user).exists()
        return False
    
    def get_tags_list(self, obj):
        if obj.tags:
            return [tag.strip() for tag in obj.tags.split(',')]
        return []
    
    class Meta:
        model = Resource
        fields = ['id', 'title', 'description', 'category', 'resource_type', 
                  'file_url', 'file_size', 'thumbnail_url', 'uploaded_by', 
                  'uploaded_by_info', 'created_at', 'updated_at', 'verified', 
                  'featured', 'language', 'download_count', 'view_count', 
                  'author', 'tags', 'tags_list', 'duration', 'is_bookmarked']
        read_only_fields = ['uploaded_by', 'created_at', 'updated_at', 'download_count', 'view_count']

class ResourceListSerializer(serializers.ModelSerializer):
    is_bookmarked = serializers.SerializerMethodField()
    
    def get_is_bookmarked(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            return obj.bookmarks.filter(user=request.user).exists()
        return False
    
    class Meta:
        model = Resource
        fields = ['id', 'title', 'description', 'category', 'resource_type', 
                  'file_size', 'thumbnail_url', 'verified', 'featured', 'language', 
                  'download_count', 'author', 'duration', 'is_bookmarked']
