# En api/models.py
from django.db import models
from django.contrib.auth.models import AbstractUser

# Modelo de Usuario personalizado para incluir el rol [cite: 8]
class User(AbstractUser):
    ROLES = (('admin', 'Administrador'), ('base', 'Usuario Base'))
    rol = models.CharField(max_length=10, choices=ROLES, default='base')

class Acta(models.Model):
    ESTADOS = (('abierta', 'Abierta'), ('cerrada', 'Cerrada'))
    titulo = models.CharField(max_length=200)
    estado = models.CharField(max_length=10, choices=ESTADOS, default='abierta')
    fecha = models.DateField()
    creador = models.ForeignKey(User, on_delete=models.CASCADE, related_name='actas_creadas')
    participantes = models.ManyToManyField(User, related_name='actas_participadas')
    archivo_pdf = models.FileField(upload_to='actas/')

    def __str__(self):
        return self.titulo

class Compromiso(models.Model):
    descripcion = models.TextField()
    acta = models.ForeignKey(Acta, on_delete=models.CASCADE, related_name='compromisos')
    responsable = models.ForeignKey(User, on_delete=models.CASCADE, related_name='compromisos_asignados')
    fecha_limite = models.DateField()

    def __str__(self):
        return self.descripcion[:50]

class Gestion(models.Model):
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    descripcion = models.TextField()
    archivo_adjunto = models.FileField(upload_to='gestiones/') # [cite: 36]
    compromiso = models.ForeignKey(Compromiso, on_delete=models.CASCADE, related_name='gestiones')
    creador = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return f"Gestión de {self.creador.username} en {self.fecha_creacion.strftime('%Y-%m-%d')}"