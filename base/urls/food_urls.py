from django.urls import include, path
from base import views

urlpatterns = [
    path('', views.getFoods, name = "foods"),
    path('uploadFood/', views.updateFood, name = "upload-food"),
    path('createFood/', views.createFood, name="create-food"),
    path('uploadImage/', views.uploadImage, name="image-food"),
    path('deleteFood/', views.deleteFood, name="delete-food"),
    path('updateFood/', views.updateFoodWithId, name="update-food"),
    path('updateImage/', views.updateImage, name="update-image"),
]