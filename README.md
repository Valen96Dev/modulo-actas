✨ Funcionalidades Principales
Autenticación de Usuarios: Sistema de login por roles (Administrador y Usuario Base) utilizando tokens JWT.

Gestión de Sesión: Creación y cierre de sesión (Logout).

Panel de Actas: Visualización de actas con filtros dinámicos por título, estado y fecha. Los permisos de visualización dependen del rol del usuario.

CRUD Completo:

Creación de Actas: Los administradores pueden crear nuevas actas, asignando participantes y adjuntando un PDF.

Creación de Compromisos: Se pueden añadir compromisos a un acta existente, asignando un responsable y una fecha límite.

Creación de Gestiones: Es posible registrar gestiones asociadas a un compromiso, con la opción de adjuntar un archivo (.pdf o .jpg).

Descarga Segura de Archivos: Los archivos adjuntos (tanto de actas como de gestiones) solo pueden ser descargados por usuarios autenticados, a través de endpoints protegidos en la API.

🛠️ Stack Tecnológico
Backend:

Python

Django

Django REST Framework

Simple JWT (para autenticación por Token)

Frontend:

React

React Router (para la navegación)

Axios (para las peticiones a la API)

Base de Datos:

SQLite (configurada para desarrollo local)

🚀 Instalación y Puesta en Marcha
Sigue estos pasos para poner el proyecto en funcionamiento en tu máquina local.

Prerrequisitos
Asegúrate de tener instalado:

Python 3.8 o superior

Node.js y npm

1. Configuración del Backend
Abre una terminal y ejecuta los siguientes comandos desde la raíz del proyecto.

Bash

# 1. (Opcional) Crea y activa un entorno virtual
python -m venv venv
source venv/bin/activate  # En Mac/Linux
# venv\Scripts\activate    # En Windows

# 2. Instala las dependencias del backend
pip install -r requirements.txt # (Asegúrate de haber creado un requirements.txt con 'pip freeze > requirements.txt')
# Si no, instala los paquetes manualmente:
# pip install django djangorestframework djangorestframework-simplejwt django-cors-headers

# 3. Aplica las migraciones para crear la base de datos
python manage.py migrate

# 4. Carga los datos iniciales (usuarios y ejemplos)
python manage.py seed

# 5. Inicia el servidor del backend
python manage.py runserver
El backend estará corriendo en http://127.0.0.1:8000.

2. Configuración del Frontend
Abre una segunda terminal (sin cerrar la del backend) y navega a la carpeta frontend.

Bash

# 1. Entra a la carpeta del frontend
cd frontend

# 2. Instala las dependencias
npm install

# 3. Inicia la aplicación de React
npm start
La aplicación se abrirá automáticamente en tu navegador en http://localhost:3000.

🧑‍💻 Credenciales de Prueba
La base de datos se inicia con dos usuarios para probar los diferentes niveles de permisos:

Administrador:

Usuario: admin@test.com

Contraseña: adminpass

Permisos: Puede ver y gestionar todas las actas, compromisos y gestiones.

Usuario Base:

Usuario: base@test.com

Contraseña: basepass

Permisos: Solo puede ver las actas en las que participa y gestionar los compromisos de los que es responsable.