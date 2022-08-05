from django import urls
from django.contrib import admin
from django.urls import path, include
from api.urls import router as api_urls
from apiaccount import urls as apiaccount_urls
from rest_framework import routers, permissions
from django.urls import re_path as url

from drf_yasg.views import get_schema_view
from drf_yasg import openapi

schema_view = get_schema_view(
   openapi.Info(
      title="Application Gestion Django React Redux API",
      default_version='v1',
      description="Cette API est utilisée pour la gestion des utilisateurs de notre application Gestion Django React Redux",
      contact=openapi.Contact(email="logicieldpi@gmail.com"),
      license=openapi.License(name="BSD License"),
   ),
   public=True,
   permission_classes=[permissions.AllowAny],
)

router = routers.DefaultRouter()
router.registry.extend(api_urls.registry)

urlpatterns = [
    path("i18n/", include("django.conf.urls.i18n")),
    path('admin/', admin.site.urls),

    path('api/', include(router.urls)),
    path('apiaccount/', include(apiaccount_urls)),

    #URL to show my Swagger and Redoc API (Documentation API)
    url(r'^swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    url(r'^swagger/$', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    url(r'^redoc/$', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
]
