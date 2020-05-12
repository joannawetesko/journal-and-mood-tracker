from .models import JournalEntry, MoodEntry
from .serializers import JournalSerializer, MoodSerializer, UserSerializer
from rest_framework import permissions, generics

from django.contrib.auth import get_user_model


class JournalListCreateView(generics.ListCreateAPIView):
    serializer_class = JournalSerializer
    permission_classes = [
        permissions.IsAuthenticated
    ]
    #filterset_fields = {
    #    'body': ['exact', 'icontains'],
    #    'created_at': ['exact', 'lt', 'gt'],
    #    'user': ['exact']
    #}

    def get_queryset(self):
        queryset = JournalEntry.objects.all()
        created_at = self.request.query_params.get('date', None)
        if created_at is not None:
            queryset = queryset.filter(created_at=created_at)
        return queryset

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class JournalDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = JournalEntry.objects.all()
    serializer_class = JournalSerializer
    permission_classes = [
        permissions.IsAuthenticated
    ]

    def perform_update(self, serializer):
        serializer.save(user=self.request.user)


class MoodListCreateView(generics.ListCreateAPIView):
    serializer_class = MoodSerializer
    permission_classes = [
        permissions.IsAuthenticated
    ]
    #filterset_fields = {
    #    'created_at': ['exact', 'lt', 'gt'],
    #    'user': ['exact']
    #}

    def get_queryset(self):
        queryset = MoodEntry.objects.filter(user=self.request.user)
        created_at = self.request.query_params.get('date', None)
        if created_at is not None:
            queryset = queryset.filter(created_at=created_at)
        return queryset

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class MoodDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = MoodEntry.objects.all()
    serializer_class = MoodSerializer
    permission_classes = [
        permissions.IsAuthenticated
    ]

    def perform_update(self, serializer):
        serializer.save(user=self.request.user)


class UserCreateView(generics.CreateAPIView):
    model = get_user_model()
    permission_classes = [
        permissions.AllowAny

    ]
    serializer_class = UserSerializer