# from django.shortcuts import render
from .serializers import PersonneSerializer, NationaliteSerializer
from .models import Personne, Nationalite

from django.dispatch import receiver
from rest_framework import viewsets
from django.conf import settings
from django.db.models.signals import pre_save
# from django.contrib.auth.hashers import make_password
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response


# @receiver(pre_save, sender=settings.AUTH_USER_MODEL)
# def pre_save_receiver(sender, instance, **kwargs):
#     encryptedpassword = make_password(instance.password)
#     instance.password = encryptedpassword
#     instance.first_name = instance.nom
#     instance.last_name = instance.prenom
# Create your views here.

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
