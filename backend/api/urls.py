from posixpath import basename
from rest_framework import routers
from .api import PersonneViewSet, NationaliteViewSet

router = routers.DefaultRouter()

router.register('personne', PersonneViewSet)
router.register('nationalite', NationaliteViewSet)
