from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.exceptions import AuthenticationFailed
from rest_framework import status, permissions
from rest_framework.permissions import IsAuthenticated
import jwt

from api.models import Personne
from api.serializers import GetPersonneSerializer


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        # ...

        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

@permission_classes([IsAuthenticated])
@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/token/',
        '/api/token/refresh'
    ]

    return Response(routes)

@permission_classes([IsAuthenticated])
@api_view(['GET'])
def getUser(request, id):

    if request.method == 'GET':
        # token = request.COOKIES.get('jwt')
        user = Personne.objects.get(id=id)
        serializer = GetPersonneSerializer(user)

        return Response(serializer.data, status=status.HTTP_200_OK)

    return Response(serializer.errors, status=status.HTTP_204_NO_CONTENT)
