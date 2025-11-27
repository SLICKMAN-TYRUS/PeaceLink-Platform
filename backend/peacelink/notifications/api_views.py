from rest_framework import generics, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser
from django.utils import timezone
from .models import Alert, Notification, NotificationPreference, EmergencyAlert
from .serializers import (AlertSerializer, NotificationSerializer, 
                          NotificationPreferenceSerializer, EmergencyAlertSerializer)
from .utils import send_emergency_alert

class AlertListCreate(generics.ListCreateAPIView):
    queryset = Alert.objects.all()
    serializer_class = AlertSerializer

class AlertRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Alert.objects.all()
    serializer_class = AlertSerializer


# Notification Views
class NotificationList(generics.ListAPIView):
    serializer_class = NotificationSerializer
    
    def get_queryset(self):
        user = self.request.user
        queryset = Notification.objects.filter(recipient=user)
        
        # Filter by read status
        read_status = self.request.query_params.get('read', None)
        if read_status == 'true':
            queryset = queryset.filter(read=True)
        elif read_status == 'false':
            queryset = queryset.filter(read=False)
        
        # Filter by type
        notification_type = self.request.query_params.get('type', None)
        if notification_type:
            queryset = queryset.filter(notification_type=notification_type)
        
        # Filter by priority
        priority = self.request.query_params.get('priority', None)
        if priority:
            queryset = queryset.filter(priority=priority)
        
        return queryset.order_by('-created_at')


@api_view(['POST'])
def mark_notification_read(request, pk):
    """Mark a notification as read"""
    try:
        notification = Notification.objects.get(pk=pk, recipient=request.user)
        notification.mark_as_read()
        return Response({'status': 'marked as read'})
    except Notification.DoesNotExist:
        return Response({'error': 'Notification not found'}, status=status.HTTP_404_NOT_FOUND)


@api_view(['POST'])
def mark_all_read(request):
    """Mark all notifications as read for current user"""
    Notification.objects.filter(recipient=request.user, read=False).update(
        read=True,
        read_at=timezone.now()
    )
    return Response({'status': 'all notifications marked as read'})


@api_view(['GET'])
def unread_count(request):
    """Get count of unread notifications"""
    count = Notification.objects.filter(recipient=request.user, read=False).count()
    return Response({'unread_count': count})


@api_view(['DELETE'])
def clear_notifications(request):
    """Clear all read notifications"""
    Notification.objects.filter(recipient=request.user, read=True).delete()
    return Response({'status': 'read notifications cleared'})


# Notification Preferences
class NotificationPreferenceDetail(generics.RetrieveUpdateAPIView):
    serializer_class = NotificationPreferenceSerializer
    
    def get_object(self):
        user = self.request.user
        obj, created = NotificationPreference.objects.get_or_create(user=user)
        return obj


# Emergency Alerts (Admin only)
class EmergencyAlertListCreate(generics.ListCreateAPIView):
    serializer_class = EmergencyAlertSerializer
    
    def get_queryset(self):
        queryset = EmergencyAlert.objects.all()
        
        # Non-admin users only see active alerts for their region
        if not self.request.user.role == 'admin':
            queryset = queryset.filter(is_active=True)
            user_state = self.request.user.state
            user_location = self.request.user.location
            queryset = queryset.filter(
                broadcast_all=True
            ) | queryset.filter(
                target_states__contains=[user_state]
            ) | queryset.filter(
                target_regions__contains=[user_location]
            )
        
        return queryset.order_by('-created_at')
    
    def perform_create(self, serializer):
        # Only admins can create emergency alerts
        if self.request.user.role != 'admin':
            return Response({'error': 'Only admins can create emergency alerts'}, 
                          status=status.HTTP_403_FORBIDDEN)
        
        alert = serializer.save()
        
        # Send the alert immediately
        send_emergency_alert(alert)


class EmergencyAlertDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = EmergencyAlert.objects.all()
    serializer_class = EmergencyAlertSerializer
    permission_classes = [IsAdminUser]


@api_view(['POST'])
@permission_classes([IsAdminUser])
def deactivate_alert(request, pk):
    """Deactivate an emergency alert"""
    try:
        alert = EmergencyAlert.objects.get(pk=pk)
        alert.is_active = False
        alert.save()
        return Response({'status': 'alert deactivated'})
    except EmergencyAlert.DoesNotExist:
        return Response({'error': 'Alert not found'}, status=status.HTTP_404_NOT_FOUND)
