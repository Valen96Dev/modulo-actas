from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    LoginView, ActaViewSet, CompromisoViewSet, 
    GestionViewSet, UserListView
)

router = DefaultRouter()
router.register(r'actas', ActaViewSet, basename='acta')
router.register(r'compromisos', CompromisoViewSet, basename='compromiso')
router.register(r'gestiones', GestionViewSet, basename='gestion')

urlpatterns = [
    path('', include(router.urls)),
    path('login/', LoginView.as_view(), name='token_obtain_pair'),

    path('users/', UserListView.as_view(), name='user-list'),
]