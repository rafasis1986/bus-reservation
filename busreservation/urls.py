from django.conf import settings
from django.conf.urls import include
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, re_path, reverse_lazy
from django.views.generic.base import RedirectView
from rest_auth.views import LoginView

PREFIX_API = 'api/v1/'

urlpatterns = [
    path('admin/', admin.site.urls),
    path(PREFIX_API, include('busreservation.users.urls')),
    path(PREFIX_API,
         include('busreservation.reservations.urls')),
    path('{0}login/'.format(PREFIX_API), LoginView.as_view()),
    # the 'api-root' from django rest-frameworks default router
    # http://www.django-rest-framework.org/api-guide/routers/#defaultrouter
    re_path(r'^$', RedirectView.as_view(url=reverse_lazy('api-root'), permanent=False)),

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
