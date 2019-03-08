from django.conf.urls import include
from django.urls import path
from rest_framework.routers import DefaultRouter

from busreservation.reservations import views


router = DefaultRouter()
router.register('buses', views.BusViewSet)
router.register('cities', views.CityViewSet)
router.register('itineraries', views.ItineraryViewSet)
router.register('trips', views.TripViewSet)
router.register('tickets', views.TicketViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
