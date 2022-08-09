from django.contrib import admin
from .models import Personne, Nationalite
from django.contrib.auth.admin import UserAdmin
from .forms import PersonneCreationForm, PersonneChangeForm


class PersonneAdmin(UserAdmin):
    add_form = PersonneCreationForm
    form = PersonneChangeForm
    model = Personne
    list_display = ('username', 'nom', 'prenom', 'genre', 'date_naissance', 'nationalite',
                    'numero', 'tel', 'is_staff', 'is_active')
    list_filter = ('is_staff', 'is_active', 'genre')
    fieldsets = (
        (None, {'fields': ('username', 'password', 'nom', 'prenom', 'genre', 'date_naissance', 
                    'nationalite', 'numero', 'tel', 'date_joined')}),
        ('Permissions', {'fields': ('is_staff', 'is_active')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username', 'password1', 'password2', 'is_staff', 'is_active')}
        ),
    )
    search_fields = ('username','nom', 'prenom', 'date_naissance', 'nationalite')
    ordering = ('username',)


class AdminNationalite(admin.ModelAdmin):
    list_display = ('libelle',)

    search_fields = ('libelle',)



admin.site.register(Personne, PersonneAdmin)
admin.site.register(Nationalite, AdminNationalite)
