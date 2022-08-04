from django.contrib import admin
from django.urls import path, include
from api.urls import router as api_urls
from apiaccount import urls as apiaccount_urls
from rest_framework import routers

router = routers.DefaultRouter()
router.registry.extend(api_urls.registry)


urlpatterns = [
    path("i18n/", include("django.conf.urls.i18n")),
    path('admin/', admin.site.urls),

    path('api/', include(router.urls)),
    path('apiaccount/', include(apiaccount_urls)),
]
