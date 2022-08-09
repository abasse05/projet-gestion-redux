from django.contrib.auth.forms import UserCreationForm, UserChangeForm

from .models import Personne


class PersonneCreationForm(UserCreationForm):

    class Meta:
        model = Personne
        fields = ('email',)


class PersonneChangeForm(UserChangeForm):

    class Meta:
        model = Personne
        fields = ('email',)