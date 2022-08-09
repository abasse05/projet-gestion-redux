from datetime import timezone
from django.db import models
from django.utils import timezone

# Create your models here.
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.utils.translation import gettext_lazy as _
from .manager import CustomAccounManager

class Nationalite(models.Model):
    libelle = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        ordering = ('libelle',)

    def __str__(self):
        return self.libelle

class Personne(AbstractBaseUser, PermissionsMixin):
    GENRE = (
        ("M", "Masculin"),
        ("F", "Feminin")
    )
    email = models.EmailField(_('email address'), blank=True, null=True)
    username = models.CharField(max_length=150, unique=True)
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
    is_staff = models.BooleanField(default=False)
    is_superuser =  models.BooleanField(default=False) 
    is_active = models.BooleanField(default=True)
    date_joined = models.DateTimeField(default=timezone.now)

    objects = CustomAccounManager()

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email']

    class Meta:
        ordering = ('-date_joined',)  # ranger par ordre decroissant

    def __str__(self):
        return "user : {}, {} {}".format(self.username, self.nom, self.prenom)

    def has_perm(self, perm, obj=None):
        return True

    def has_module_perms(self, app_label):
        return True