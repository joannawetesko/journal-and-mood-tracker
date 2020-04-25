from .models import JournalEntry, MoodEntry
from .serializers import JournalSerializer, MoodSerializer
from rest_framework import generics

class JournalListCreate(generics.ListCreateAPIView):
    queryset = JournalEntry.objects.all()
    serializer_class = JournalSerializer


class MoodListCreate(generics.ListCreateAPIView):
    queryset = MoodEntry.objects.all()
    serializer_class = MoodSerializer