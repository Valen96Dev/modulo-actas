from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.views import APIView
from rest_framework import generics
from django.http import FileResponse, HttpResponseForbidden, HttpResponseNotFound
from django.conf import settings
import os

from .models import User, Acta, Compromiso, Gestion
from .serializers import (
    UserSerializer, ActaSerializer, CompromisoReadSerializer, 
    CompromisoWriteSerializer, GestionSerializer
)


class LoginView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        if response.status_code == 200:
            user = User.objects.get(username=request.data['username'])
            serializer = UserSerializer(user)
            response.data['user'] = serializer.data
        return response

class ActaViewSet(viewsets.ModelViewSet):
    queryset = Acta.objects.all()
    serializer_class = ActaSerializer
    permission_classes = [permissions.IsAuthenticated] # Solo usuarios autenticados

    def get_queryset(self):
        user = self.request.user
        if user.rol == 'admin' or user.rol == 'base':
            return Acta.objects.all()
        # Se aplica para que usuarios base solo pueden ver actas donde son participantes o creadores
        return Acta.objects.filter(participantes=user) | Acta.objects.filter(creador=user).distinct()

    def perform_create(self, serializer):
        serializer.save(creador=self.request.user)

class UserListView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

class CompromisoViewSet(viewsets.ModelViewSet):
    queryset = Compromiso.objects.all()
    serializer_class = CompromisoReadSerializer
    permission_classes = [permissions.IsAuthenticated]

    # Aqui se define para que actue el serializer correcto dependiendo de la acción
    def get_serializer_class(self):
        if self.action in ['create', 'update', 'partial_update']:
            return CompromisoWriteSerializer
        return CompromisoReadSerializer

class GestionViewSet(viewsets.ModelViewSet):
    queryset = Gestion.objects.all()
    serializer_class = GestionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(creador=self.request.user)

    
    @action(detail=True, methods=['get'])
    def download(self, request, pk=None):
        """
        Endpoint personalizado para descargar el archivo adjunto de una gestión.
        URL: /api/gestiones/{id}/download/
        """
        gestion = self.get_object()
        if not gestion.archivo_adjunto:
            return HttpResponseNotFound("Esta gestión no tiene un archivo adjunto.")

        file_handle = gestion.archivo_adjunto.open()
        response = FileResponse(file_handle, content_type='application/octet-stream')
        response['Content-Disposition'] = f'attachment; filename="{gestion.archivo_adjunto.name}"'
        return response

    
    def create(self, request, *args, **kwargs):
        file = request.data.get('archivo_adjunto')
        if file:
            # Aquí se hace la validación de tipo de archivo 
            if not file.name.endswith(('.pdf', '.jpg')):
                return Response({'error': 'Formato de archivo no válido. Solo se permiten .pdf y .jpg.'}, status=status.HTTP_400_BAD_REQUEST)
            # Aquí validación de tamaño de archivo 
            if file.size > 5 * 1024 * 1024: 
                return Response({'error': 'El archivo es demasiado grande. El máximo es 5MB.'}, status=status.HTTP_400_BAD_REQUEST)
        return super().create(request, *args, **kwargs)

    def perform_create(self, serializer):
        serializer.save(creador=self.request.user)


def protected_media_view(request, file_path):
    if not request.user.is_authenticated:
        return HttpResponseForbidden("Acceso denegado. Debes iniciar sesión.")

    file_full_path = os.path.join(settings.MEDIA_ROOT, file_path)

    if os.path.exists(file_full_path):
        return FileResponse(open(file_full_path, 'rb'))
    else:
        return HttpResponseNotFound("El archivo no fue encontrado en el servidor.")