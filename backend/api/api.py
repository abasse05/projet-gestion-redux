# from django.shortcuts import render
from .serializers import PersonneSerializer, NationaliteSerializer
from .models import Personne, Nationalite

from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response


class UserViewSet(viewsets.ViewSet):
    permission_classes = (IsAuthenticated, )

    def list(self, request):
        # print('username : ', request.user.id)
        user = Personne.objects.get(id=request.user.id)
        user_data = PersonneSerializer(user).data
        return Response(user_data)


class PersonneViewSet(viewsets.ModelViewSet):
    queryset = Personne.objects.all()  # les données reçues
    serializer_class = PersonneSerializer
    # filterset_fields = ['genre', 'nationalite']


class NationaliteViewSet(viewsets.ModelViewSet):
    queryset = Nationalite.objects.all()  # les données reçues
    serializer_class = NationaliteSerializer
