from django.shortcuts import render, redirect
from base.models import Food


# Create your views here.
def homeScreen(request):
    return render(request, "HomeScreen.html")


def FoodList(request):
    return render(request, "FoodList.html")


def foodUploadScreen(request):

    return render(request, "FoodUpload.html")


def editFoodScreen(request, pk):
    food = Food.objects.get(id=pk)

    context = {'food': food}
    return render(request, "EditFood.html", context)


def loginScreen(request):
    return render(request, 'Login.html')
def fullMenu(request):
    return render(request, 'FullMenu.html')
