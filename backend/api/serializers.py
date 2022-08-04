from dataclasses import field
from rest_framework import serializers
from .models import *


class PersonneSerializer(serializers.ModelSerializer):
    nationalite = serializers.ReadOnlyField(source='nationalite.libelle')
    class Meta:
        model = Personne
        fields = ('id', 'username', 'first_name', 'last_name', 'email', 'genre', 'date_naissance', 'numero', 'tel', 'nom', 'prenom', 'nationalite')
        
        def create(self, validated_data):
            password = validated_data.pop('password', None)
            instance = self.Meta.model(**validated_data)
            if password is not None:
                instance.set_password(password)
            instance.first_name = instance.nom
            instance.last_name = instance.prenom
            instance.save()
            return instance

class NationaliteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Nationalite
        fields = '__all__'  # ('nom', 'prenom', ...)

