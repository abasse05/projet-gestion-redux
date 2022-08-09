from dataclasses import field
from rest_framework import serializers
from .models import *

class PersonneSerializer(serializers.ModelSerializer):
    class Meta:
        model = Personne
        fields = '__all__'
        # extra_kwargs = {'password': {'write_only': True, 'required': False}}

    def create(self, validated_data):
        user = Personne.objects.create_user(**validated_data)
        return user


class GetPersonneSerializer(serializers.ModelSerializer):
    nationalite = serializers.CharField(source='nationalite.libelle')
    class Meta:
        model = Personne
        fields = ('id', 'username', 'nom', 'prenom', 'email', 'genre', 'date_naissance', 'numero', 'tel', 'nationalite', 'password')

class NationaliteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Nationalite
        fields = '__all__'  # ('id', 'libelle', ...)

