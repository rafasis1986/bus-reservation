from rest_framework import viewsets
from busreservation.reservations import models
from busreservation.reservations import serializers
from rest_framework.permissions import AllowAny


class BusViewSet(viewsets.ModelViewSet):
    permission_classes = (AllowAny,)
    serializer_class = serializers.BusSerializer
    queryset = models.Bus.objects.all()


class CityViewSet(viewsets.ModelViewSet):
    permission_classes = (AllowAny,)
    serializer_class = serializers.CitySerializer
    queryset = models.City.objects.all()


class ItineraryViewSet(viewsets.ModelViewSet):
    permission_classes = (AllowAny,)
    serializer_class = serializers.ItinerarySerializer
    queryset = models.Itinerary.objects.all()


class TripViewSet(viewsets.ModelViewSet):
    permission_classes = (AllowAny,)
    serializer_class = serializers.TripSerializer
    queryset = models.Trip.objects.all()


class TicketViewSet(viewsets.ModelViewSet):
    permission_classes = (AllowAny,)
    serializer_class = serializers.TicketSerializer
    queryset = models.Ticket.objects.all()
