from rest_framework import serializers
from .models import Alert, Notification, NotificationPreference, EmergencyAlert

class AlertSerializer(serializers.ModelSerializer):
    class Meta:
        model = Alert
        fields = '__all__'


class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = ['id', 'notification_type', 'priority', 'title', 'message', 
                  'report_id', 'forum_post_id', 'meeting_id', 'message_id',
                  'action_url', 'read', 'read_at', 'created_at']
        read_only_fields = ['id', 'created_at']


class NotificationPreferenceSerializer(serializers.ModelSerializer):
    class Meta:
        model = NotificationPreference
        fields = ['push_enabled', 'sms_enabled', 'email_enabled',
                  'report_notifications', 'meeting_notifications', 
                  'forum_notifications', 'message_notifications',
                  'emergency_notifications', 'quiet_hours_enabled',
                  'quiet_hours_start', 'quiet_hours_end']


class EmergencyAlertSerializer(serializers.ModelSerializer):
    issued_by_name = serializers.CharField(source='issued_by.username', read_only=True)
    
    class Meta:
        model = EmergencyAlert
        fields = ['id', 'title', 'message', 'alert_type', 'severity',
                  'target_regions', 'target_counties', 'target_states',
                  'broadcast_all', 'issued_by', 'issued_by_name',
                  'issuing_organization', 'send_push', 'send_sms',
                  'recipients_count', 'delivered_count', 'read_count',
                  'is_active', 'expires_at', 'created_at']
        read_only_fields = ['issued_by', 'recipients_count', 'delivered_count', 
                           'read_count', 'created_at']
    
    def create(self, validated_data):
        validated_data['issued_by'] = self.context['request'].user
        return super().create(validated_data)
