from rest_framework_json_api import serializers
from busreservation.reservations import models


class CustomMeta():
    fields = '__all__'


class BusSerializer(serializers.ModelSerializer):

    class Meta(CustomMeta):
        model = models.Bus


class CitySerializer(serializers.ModelSerializer):

    class Meta(CustomMeta):
        model = models.City


class ItinerarySerializer(serializers.ModelSerializer):

    class Meta(CustomMeta):
        model = models.Itinerary


class TripSerializer(serializers.ModelSerializer):

    class Meta(CustomMeta):
        model = models.Trip


class TicketSerializer(serializers.ModelSerializer):

    class Meta(CustomMeta):
        model = models.Ticket
