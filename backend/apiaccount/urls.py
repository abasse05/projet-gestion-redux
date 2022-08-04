from django.urls import path
from . import api 
from rest_framework_simplejwt.views import (
    TokenRefreshView
)
from .api import MyTokenObtainPairView

urlpatterns = [
    path('', api.getRoutes),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('user/<int:id>', api.getUser, name="get_user")
]