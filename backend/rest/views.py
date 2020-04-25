from .models import JournalEntry, MoodEntry
from .serializers import JournalSerializer, MoodSerializer, UserSerializer
from rest_framework import generics
from rest_framework import permissions

from django.contrib.auth import get_user_model


class JournalListCreateView(generics.ListCreateAPIView):
    queryset = JournalEntry.objects.all()
    serializer_class = JournalSerializer
    permission_classes = [
        permissions.IsAuthenticated
    ]
    filterset_fields = {
        'title': ['exact', 'icontains'],
        'body': ['exact', 'icontains'],
        'created_at': ['exact', 'lt', 'gt'],
        'user': ['exact']
    }

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class MoodListCreateView(generics.ListCreateAPIView):
    queryset = MoodEntry.objects.all()
    serializer_class = MoodSerializer
    permission_classes = [
        permissions.IsAuthenticated
    ]
    filterset_fields = {
        'created_at': ['exact', 'lt', 'gt'],
        'user': ['exact']
    }

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class UserCreateView(generics.CreateAPIView):
    model = get_user_model()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = UserSerializer