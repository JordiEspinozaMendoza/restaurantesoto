from django.shortcuts import render
from .models import Food
from .serializers import FoodSerializer
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.decorators import api_view, permission_classes
from django.contrib.auth import authenticate, login
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from base.serializers import UserSerializer, UserSerializerWithToken
from rest_framework import status

# Create your views here.

# EP Para conseguir todas las comidas
@api_view(['GET'])
def getFoods(request):
    foods = Food.objects.all()
    serializer = FoodSerializer(foods, many=True)
    return Response(serializer.data)

#EP para actualizar la ultima comida seleccionada
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def updateFood(request):
    try:
        #Obtenemos la info
        data = request.data
        print(data)
        #Hacemos una consulta a la ultima comida
        food = Food.objects.all().last()
        #Actualizamos los datos
        food.name = data['name']
        food.description = data['description']
        food.price = data['price']
        #Salvamos
        food.save()
        serializer = FoodSerializer(food, many=False)
        return Response("Alimento subido correctamente")
    except:
        content = {'detail': "Alimento no subido correctamente"}
        return Response(content, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

#Actualizamos una comida en especifico
@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateFoodWithId(request):
    try:
        #Obtenemos la info de la request
        data = request.data
        food = Food.objects.get(id=data['_id'])
        #Actualizamos
        food.name = data['name']
        food.description = data['description']
        food.price = data['price']
        #Salvamos
        food.save()
        serializer = FoodSerializer(food, many=False)
        content = {'detail': "Alimento subido correctamente"}
        return Response(content, status=status.HTTP_200_OK)
    except:
        content = {'detail': "Alimento no subido correctamente"}
        return Response(content, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

#Creamos la comida por default a la hora de que el usuario seleccione la opcion de crear
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createFood(request):
    #Creamos unos valores prederteminados
    food = Food.objects.create(
        name="Sample name",
        price=0,
        description="Description"
    )
    #Salvamos
    food.save()
    return Response("Comida creada")

#EP para subir una imagen a la ultima comida creada
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def uploadImage(request):
    #Obtenemos la info
    try:
        food = Food.objects.all().last()
        print(request.FILES.get("image"))
        food.img = request.FILES.get("image")
        food.save()
        content = {'detail': "Imagen subida correctamente"}
        return Response(content, status=status.HTTP_200_OK)
    except:
        content = {'detail': "Imagen no subida correctamente"}

        return Response(content, status=status.HTTP_400_BAD_REQUEST)

#Actualizamos una imagen
@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateImage(request):
    try:
        data = request.data
        print(data)
        print(request.FILES.get("image"))

        food = Food.objects.get(id=data['_id'])
        food.img = request.FILES.get("image")
        food.save()

        content = {'detail': "Imagen actualizada correctamente"}
        return Response(content, status=status.HTTP_200_OK)
    except:
        content = {'detail': "Imagen no actualizada correctamente"}

        return Response(content, status=status.HTTP_400_BAD_REQUEST)

#EP para eliminar alguna comida
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteFood(request):
    data = request.data
    foodToDelete = Food.objects.get(id=data['_id'])
    foodToDelete.delete()

    return Response("Food Deleted")

# @api_view(['POST'])
# def login(request):
#     data = request.data
#     print(data)
#     username = data['username']
#     password = data['password']

#     user = authenticate(request._request, username=username, password=password)
#     if user is not None:
#         login(request, user)
#         return Response("Inicio de sesión correcto")
#     else:
#         return Response("Inicio de sesión incorrecto")

#Class para validar el login y regresar el token de acceso al frontend
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        serializer = UserSerializerWithToken(self.user).data

        for k, v in serializer.items():
            data[k] = v
        return data

#Class para hacer login
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


#EP para obtener la informacion del usuario administrador
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserProfile(request):
    user = request.user

    serializer = UserSerializer(user, many=False)

    return Response(serializer.data)
