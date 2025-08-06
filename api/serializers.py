from rest_framework import serializers
from .models import User, Acta, Compromiso, Gestion

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'rol']

class GestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Gestion
        fields = '__all__'
        read_only_fields = ['creador']

class CompromisoReadSerializer(serializers.ModelSerializer):
    """Este serializer es SOLO para LEER y mostrar info de los compromisos."""
    responsable = UserSerializer(read_only=True)
    gestiones = GestionSerializer(many=True, read_only=True)

    class Meta:
        model = Compromiso
        fields = ['id', 'descripcion', 'responsable', 'fecha_limite', 'gestiones']

class CompromisoWriteSerializer(serializers.ModelSerializer):
    """Este serializer es SOLO para ESCRIBIR (crear/actualizar) compromisos."""
    responsable_id = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(), source='responsable', write_only=True
    )

    class Meta:
        model = Compromiso
        fields = ['id', 'descripcion', 'responsable_id', 'fecha_limite', 'acta']


class ActaSerializer(serializers.ModelSerializer):
    creador = UserSerializer(read_only=True)
    participantes = UserSerializer(many=True, read_only=True)
    compromisos = CompromisoReadSerializer(many=True, read_only=True)

    class Meta:
        model = Acta
        fields = ['id', 'titulo', 'estado', 'fecha', 'creador', 'participantes', 'compromisos', 'archivo_pdf']