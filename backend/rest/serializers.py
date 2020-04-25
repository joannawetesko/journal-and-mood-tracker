from rest_framework import serializers
from .models import JournalEntry, MoodEntry

class JournalSerializer(serializers.ModelSerializer):
    class Meta:
        model = JournalEntry
        fields = ('pk', 'title', 'body', 'created_at', 'user')


class MoodSerializer(serializers.ModelSerializer):
    class Meta:
        model = MoodEntry
        fields = ('pk', 'mood', 'created_at', 'user')
