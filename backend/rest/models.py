from django.db import models
from django.conf import settings


class JournalEntry(models.Model):
    title = models.CharField(max_length=255)
    body = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.created_at} - {self.title}"

    def __repr__(self):
        return f"{self.created_at} - {self.title}"


class MoodEntry(models.Model):

    MOOD_RATING_CHOICES = (
        (-2, "Terrible"),
        (-1, "Bad"),
        (0,  "Neutral"),
        (1,  "Good"),
        (2,  "Great")
    )

    mood = models.IntegerField(choices=MOOD_RATING_CHOICES)
    created_at = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

    class Meta:
        ordering = ['-created_at']