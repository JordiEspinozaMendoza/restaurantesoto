"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from frontend import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/foods/', include('base.urls.food_urls')),
    path('api/', include('base.urls.user_urls')),

    path('', views.homeScreen, name="home"),
    path('login/', views.loginScreen, name="loginScreen"),
    path('menu/', views.fullMenu, name="menu"),
    path('editFood/', views.foodUploadScreen, name="foodUploadScreen"),
    path('foodList/', views.FoodList, name="FoodList"),
    path('editFood/<int:pk>', views.editFoodScreen, name="editFoodScreen"),
]
