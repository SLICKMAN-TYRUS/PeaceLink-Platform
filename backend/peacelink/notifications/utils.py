"""
Utility functions for sending notifications across different channels
"""
from django.utils import timezone
from .models import Notification, NotificationPreference, EmergencyAlert

def create_notification(recipient, notification_type, title, message, priority='medium', 
                       report_id=None, forum_post_id=None, meeting_id=None, action_url=''):
    """Create a notification for a user"""
    notification = Notification.objects.create(
        recipient=recipient,
        notification_type=notification_type,
        priority=priority,
        title=title,
        message=message,
        report_id=report_id,
        forum_post_id=forum_post_id,
        meeting_id=meeting_id,
        action_url=action_url,
    )
    
    # Check user preferences and send via appropriate channels
    try:
        prefs = recipient.notification_preferences
    except NotificationPreference.DoesNotExist:
        # Create default preferences
        prefs = NotificationPreference.objects.create(user=recipient)
    
    # Send push notification if enabled
    if prefs.push_enabled:
        send_push_notification(notification)
    
    # Send SMS if enabled and critical
    if prefs.sms_enabled and priority in ['critical', 'high']:
        send_sms_notification(notification)
    
    return notification


def send_push_notification(notification):
    """Send push notification via Firebase/OneSignal"""
    # TODO: Integrate with Firebase Cloud Messaging or OneSignal
    # For now, just mark as sent
    notification.push_sent = True
    notification.sent = True
    notification.sent_at = timezone.now()
    notification.save()
    pass


def send_sms_notification(notification):
    """Send SMS via Africa's Talking or similar"""
    # TODO: Integrate with SMS gateway
    notification.sms_sent = True
    notification.save()
    pass


def notify_report_status_change(report, old_status, new_status):
    """Notify report author of status change"""
    from peacelink.reports.models import ReportFollower
    
    # Notify author
    create_notification(
        recipient=report.user,
        notification_type='report_status',
        title=f"Report Status Updated: {new_status.title()}",
        message=f"Your report about {report.category} has been updated to {new_status}.",
        priority='high' if new_status in ['assigned', 'resolved'] else 'medium',
        report_id=report.id,
        action_url=f"/reports/{report.id}"
    )
    
    # Notify followers
    followers = ReportFollower.objects.filter(report=report).exclude(user=report.user)
    for follower in followers:
        create_notification(
            recipient=follower.user,
            notification_type='report_status',
            title=f"Followed Report Updated",
            message=f"Report you're following has been updated to {new_status}.",
            priority='medium',
            report_id=report.id,
            action_url=f"/reports/{report.id}"
        )


def notify_meeting_invitation(meeting, invited_users):
    """Notify users about meeting invitation"""
    for user in invited_users:
        create_notification(
            recipient=user,
            notification_type='meeting_invite',
            title=f"Meeting Invitation: {meeting.title}",
            message=f"You've been invited to a {meeting.urgency} priority meeting on {meeting.scheduled_time.strftime('%B %d at %H:%M')}.",
            priority='high' if meeting.urgency in ['critical', 'high'] else 'medium',
            meeting_id=meeting.id,
            action_url=f"/meetings/{meeting.id}"
        )


def notify_forum_reply(post, reply, mentioned_users=None):
    """Notify about forum replies and mentions"""
    # Notify post author
    if post.user != reply.user:
        create_notification(
            recipient=post.user,
            notification_type='forum_reply',
            title=f"New Reply to Your Post",
            message=f"{reply.user.username} replied to your post in {post.topic.title if post.topic else 'a discussion'}.",
            priority='low',
            forum_post_id=post.id,
            action_url=f"/forums/topics/{post.topic.id if post.topic else ''}"
        )
    
    # Notify mentioned users
    if mentioned_users:
        for user in mentioned_users:
            if user != reply.user:
                create_notification(
                    recipient=user,
                    notification_type='forum_mention',
                    title=f"You Were Mentioned",
                    message=f"{reply.user.username} mentioned you in a forum post.",
                    priority='medium',
                    forum_post_id=reply.id,
                    action_url=f"/forums/topics/{post.topic.id if post.topic else ''}"
                )


def notify_forum_like(post, liker):
    """Notify when someone likes a post"""
    if post.user != liker:
        create_notification(
            recipient=post.user,
            notification_type='forum_like',
            title=f"Someone Liked Your Post",
            message=f"{liker.username} liked your post.",
            priority='low',
            forum_post_id=post.id,
            action_url=f"/forums/topics/{post.topic.id if post.topic else ''}"
        )


def send_emergency_alert(alert):
    """Broadcast emergency alert to targeted regions"""
    from peacelink.users.models import User
    
    # Determine recipients
    if alert.broadcast_all:
        recipients = User.objects.filter(is_active=True)
    else:
        recipients = User.objects.filter(is_active=True)
        if alert.target_states:
            recipients = recipients.filter(state__in=alert.target_states)
        if alert.target_regions:
            recipients = recipients.filter(location__in=alert.target_regions)
    
    alert.recipients_count = recipients.count()
    alert.save()
    
    # Send to each recipient
    for user in recipients:
        notification = create_notification(
            recipient=user,
            notification_type='emergency_alert',
            title=f"🚨 {alert.severity.upper()}: {alert.title}",
            message=alert.message,
            priority='critical',
            action_url='/alerts'
        )
        
        # Force SMS for critical alerts
        if alert.severity == 'critical' and alert.send_sms and user.phone:
            send_sms_notification(notification)
        
        alert.delivered_count += 1
    
    alert.save()


def send_meeting_reminder(meeting, hours_before=2):
    """Send reminder for upcoming meetings"""
    for user in meeting.invited_leaders.all():
        create_notification(
            recipient=user,
            notification_type='meeting_reminder',
            title=f"Meeting Reminder: {meeting.title}",
            message=f"Your meeting starts in {hours_before} hours. Click to join via Google Meet.",
            priority='high',
            meeting_id=meeting.id,
            action_url=meeting.google_meet_link if meeting.google_meet_link else f"/meetings/{meeting.id}"
        )


def batch_notify_users(users, notification_type, title, message, priority='medium'):
    """Send same notification to multiple users"""
    notifications = []
    for user in users:
        notification = Notification(
            recipient=user,
            notification_type=notification_type,
            priority=priority,
            title=title,
            message=message,
        )
        notifications.append(notification)
    
    Notification.objects.bulk_create(notifications)
    
    # Send push notifications
    for notification in notifications:
        try:
            prefs = notification.recipient.notification_preferences
            if prefs.push_enabled:
                send_push_notification(notification)
        except NotificationPreference.DoesNotExist:
            pass
