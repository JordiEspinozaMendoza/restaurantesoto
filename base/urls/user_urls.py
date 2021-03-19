from django.urls import include, path
from base import views


urlpatterns = [
    path('users/login/', views.TokenObtainPairView.as_view(), name="login"),
    path('users/profile/', views.getUserProfile, name="user-profile")
]
