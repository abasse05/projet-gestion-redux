from django.contrib.auth.models import BaseUserManager
from django.utils.translation import gettext_lazy as _



class CustomAccounManager(BaseUserManager):

    def create_superuser(self, username, email, password=None, **extra_fields):
        user = self.create_user(username, email, password, **extra_fields)
        user.is_superuser = True
        user.is_staff = True
        user.save(using=self._db)
        return user


    def create_user(self, username, email, password=None, **extra_fields):
    
        if not email:
            raise ValueError(_('You must provide an email address'))
        if not username:
            raise ValueError(_('The username field must be set'))
        if not password:
            raise ValueError(_('The password field must be set'))

        user = self.model(username=username, email=self.normalize_email(email))
        user.set_password(password)

        if extra_fields.get('nom') == '':
            user.nom = extra_fields.get('nom').capitalize()
        if extra_fields.get('prenom') == '':
            user.prenom = extra_fields.get('prenom').capitalize()

        user.save(using=self._db)

        return user