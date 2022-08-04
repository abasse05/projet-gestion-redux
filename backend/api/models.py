from datetime import timezone
from tkinter import CASCADE
from django.db import models
from django.utils import timezone
from django.contrib.auth.models import AbstractUser
# Create your models here.


class Nationalite(models.Model):
    libelle = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        ordering = ('libelle',)

    def __str__(self):
        return self.libelle


class Personne(AbstractUser):
    GENRE = (
        ("M", "Masculin"),
        ("F", "Feminin")
    )
    nom = models.CharField(max_length=255, null=True,
                           blank=True, verbose_name="Nom")
    prenom = models.CharField(
        max_length=255, null=True, blank=True, verbose_name="Prenom")
    genre = models.CharField(max_length=255, choices=GENRE, null=True,
                             blank=True, verbose_name="Genre")
    date_naissance = models.DateField(
        default=timezone.now, null=True, blank=True, verbose_name="Date de Naissance")
    nationalite = models.ForeignKey(
        to=Nationalite, null=True, on_delete=models.CASCADE)
    numero = models.CharField(
        max_length=255, null=True, blank=True, verbose_name="Numero")
    tel = models.CharField(max_length=255, null=True,
                           blank=True, verbose_name="Telephone")
    archive = models.BooleanField(
        default=False, null=True, blank=True, verbose_name="Archive")
    date_enregistrement = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ('-date_enregistrement',)  # ranger par ordre decroissant

    def __str__(self):
        return "{} {}".format(self.nom, self.prenom)
