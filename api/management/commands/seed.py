from django.core.management.base import BaseCommand
from api.models import User, Acta, Compromiso
from django.utils import timezone

class Command(BaseCommand):
    help = 'Puebla la base de datos con datos de prueba'

    def handle(self, *args, **kwargs):
        self.stdout.write('Limpiando la base de datos...')
        
        Compromiso.objects.all().delete()
        Acta.objects.all().delete()
        User.objects.filter(is_superuser=False).delete() 
        User.objects.filter(is_superuser=True).delete() 

        self.stdout.write('Creando usuarios...')

        

        # Crear Usuario Admin
        User.objects.create_superuser(
            username='admin@test.com',
            email='admin@test.com',
            password='adminpass',  
            rol='admin'
        )

        
        User.objects.create_user(
            username='base@test.com',
            email='base@test.com',
            password='basepass',   
            rol='base'
        )
        

        self.stdout.write('Usuarios creados. Creando datos de ejemplo...')

        
        admin_user = User.objects.get(username='admin@test.com')
        base_user = User.objects.get(username='base@test.com')

        acta1 = Acta.objects.create(
            titulo='Acta de Reunión de Inicio de Proyecto',
            fecha=timezone.now().date(),
            creador=admin_user
        )
        acta1.participantes.add(admin_user, base_user)

        acta2 = Acta.objects.create(
            titulo='Acta de Seguimiento Semanal Q3',
            fecha=timezone.now().date() - timezone.timedelta(days=7),
            creador=base_user
        )
        acta2.participantes.add(base_user)

        Compromiso.objects.create(
            descripcion='Desarrollar módulo de autenticación con JWT',
            acta=acta1,
            responsable=base_user,
            fecha_limite=timezone.now().date() + timezone.timedelta(days=15)
        )

        Compromiso.objects.create(
            descripcion='Preparar presentación de avance para el cliente',
            acta=acta1,
            responsable=admin_user,
            fecha_limite=timezone.now().date() + timezone.timedelta(days=5)
        )

        self.stdout.write(self.style.SUCCESS('¡Base de datos poblada con éxito!'))
        self.stdout.write('Credenciales listas para usar:')
        self.stdout.write(self.style.WARNING('  Admin -> Usuario: admin@test.com | Contraseña: adminpass'))
        self.stdout.write(self.style.WARNING('  Base  -> Usuario: base@test.com  | Contraseña: basepass'))