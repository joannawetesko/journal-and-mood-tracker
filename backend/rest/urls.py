from django.urls import path
from . import views

urlpatterns = [
    path('api/journal/', views.JournalListCreate.as_view()),
    path('api/mood/', views.MoodListCreate.as_view()),
]
