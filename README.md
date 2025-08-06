# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
Prueba Técnica: Gestión de Actas y Compromisos
Este proyecto es una aplicación web full-stack construida como solución a una prueba técnica. Implementa un módulo independiente para gestionar actas, compromisos y gestiones, con un backend en Django y un frontend en React.

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