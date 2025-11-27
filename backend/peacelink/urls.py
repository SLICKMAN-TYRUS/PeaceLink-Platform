from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/users/', include('peacelink.users.api_urls')),
    path('api/reports/', include('peacelink.reports.api_urls')),
    path('api/forums/', include('peacelink.forums.api_urls')),
    path('api/resources/', include('peacelink.resources.api_urls')),
    path('api/analytics/', include('peacelink.analytics.api_urls')),
    path('api/alerts/', include('peacelink.notifications.api_urls')),
]
