from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from api.views import protected_media_view

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
    # URL para servir archivos protegidos
    path('media/<path:file_path>', protected_media_view, name='protected_media'),
]