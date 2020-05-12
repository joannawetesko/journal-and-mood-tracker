from django.db import models
from django.contrib.auth import get_user_model


class JournalEntry(models.Model):
    body = models.TextField(blank=True, null=True)
    created_at = models.DateField(auto_now_add=True)
    updated_at = models.DateField(auto_now=True)
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)

    class Meta:
        ordering = ['-created_at']


class MoodEntry(models.Model):

    MOOD_RATING_CHOICES = (
        (-2, "Awful"),
        (-1, "Bad"),
        (0,  "Neutral"),
        (1,  "Good"),
        (2,  "Awesome")
    )

    mood = models.IntegerField(choices=MOOD_RATING_CHOICES)
    created_at = models.DateField(auto_now_add=True)
    updated_at = models.DateField(auto_now=True)
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)

    class Meta:
        ordering = ['-created_at']