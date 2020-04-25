from django.urls import path
from . import views

from rest_framework_simplejwt import views as jwt_views

urlpatterns = [
    path('api/journal/', views.JournalListCreateView.as_view()),
    path('api/mood/', views.MoodListCreateView.as_view()),
    path('api/user/', views.UserCreateView.as_view()),
    path('api/token/', jwt_views.TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
]
