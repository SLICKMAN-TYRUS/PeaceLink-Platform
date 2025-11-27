from django.db import models

class Analytics(models.Model):
    key = models.CharField(max_length=64)
    value = models.FloatField()
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.key}: {self.value}"
