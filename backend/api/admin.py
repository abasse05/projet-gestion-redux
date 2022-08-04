from django.contrib import admin
from .models import Personne, Nationalite
# Register your models here.


class AdminPersonne(admin.ModelAdmin):
    list_display = ('username', 'nom', 'prenom', 'genre', 'date_naissance', 'nationalite',
                    'numero', 'tel', 'date_enregistrement')
    list_filter = ('genre',)
    search_fields = ('nom', 'prenom', 'genre', 'date_naissance', 'nationalite',
                     'numero', 'tel', 'date_enregistrement')


class AdminNationalite(admin.ModelAdmin):
    list_display = ('libelle',)

    search_fields = ('libelle',)


admin.site.register(Personne, AdminPersonne)
admin.site.register(Nationalite, AdminNationalite)
