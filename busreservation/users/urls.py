from django.urls.conf import path, include
from rest_framework.routers import DefaultRouter

from busreservation.users import views


router = DefaultRouter(trailing_slash=False)

router.register(r'users', views.UserViewSet)
router.register(r'user', views.UserCreateViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
