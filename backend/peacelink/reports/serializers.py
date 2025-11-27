from rest_framework import serializers
from .models import Report, ReportMedia
from peacelink.users.models import User

class ReportMediaSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReportMedia
        fields = ['id', 'file', 'file_type', 'uploaded_at']

class UserBasicSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'role', 'location']

class ReportSerializer(serializers.ModelSerializer):
    user_info = UserBasicSerializer(source='user', read_only=True)
    media_files = ReportMediaSerializer(many=True, read_only=True)
    reviewed_by_info = UserBasicSerializer(source='reviewed_by', read_only=True)
    
    class Meta:
        model = Report
        fields = [
            'id', 'user', 'user_info', 'category', 'language', 'location', 
            'nearest_landmark', 'incident_date', 'urgency', 'description', 
            'audio_recording', 'people_affected', 'contact_preference', 
            'contact_number', 'related_report_id', 'anonymous_report', 
            'photo', 'status', 'trusted', 'reviewed_by', 'reviewed_by_info',
            'reviewed_at', 'created_at', 'updated_at', 'media_files'
        ]
        read_only_fields = ['user', 'created_at', 'updated_at', 'reviewed_at']
    
    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)

class ReportListSerializer(serializers.ModelSerializer):
    user_info = UserBasicSerializer(source='user', read_only=True)
    media_count = serializers.SerializerMethodField()
    
    def get_media_count(self, obj):
        return obj.media_files.count()
    
    class Meta:
        model = Report
        fields = [
            'id', 'user_info', 'category', 'location', 'urgency', 
            'description', 'status', 'trusted', 'anonymous_report',
            'created_at', 'people_affected', 'media_count'
        ]
