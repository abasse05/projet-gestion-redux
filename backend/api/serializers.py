from dataclasses import field
from rest_framework import serializers
from .models import *
from django.db.models.signals import pre_save
from django.dispatch import receiver
from django.contrib.auth.hashers import make_password

@receiver(pre_save, sender=Personne)
def presave(sender, instance, *args, **kwargs):
    instance.password = make_password(instance.password)
    instance.first_name = instance.nom
    instance.last_name = instance.prenom
    instance.is_active = True


class PersonneSerializer(serializers.ModelSerializer):
    class Meta:
        model = Personne
        fields = ('id', 'username', 'first_name', 'last_name', 'email', 'genre', 'date_naissance', 'numero', 'tel', 'nom', 'prenom', 'nationalite', 'password')


class GetPersonneSerializer(serializers.ModelSerializer):
    nationalite = serializers.CharField(source='nationalite.libelle')
    class Meta:
        model = Personne
        fields = ('id', 'username', 'first_name', 'last_name', 'email', 'genre', 'date_naissance', 'numero', 'tel', 'nom', 'prenom', 'nationalite', 'password')

class NationaliteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Nationalite
        fields = '__all__'  # ('nom', 'prenom', ...)

