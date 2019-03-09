from django.db import models

from busreservation.users.models import User


class Bus(models.Model):
    code = models.CharField(max_length=20, unique=True, db_index=True)
    driver = models.ForeignKey(User, on_delete=models.CASCADE)
    capacity = models.PositiveSmallIntegerField(default=10)

    class Meta:
        db_table = 'bus'
        verbose_name_plural = 'buses'

    class JSONAPIMeta:
        resource_name = 'bus'

    def __str__(self):
        return self.code


class City(models.Model):
    name = models.CharField(max_length=255, unique=True)

    class Meta:
        db_table = 'city'
        verbose_name_plural = 'cities'

    class JSONAPIMeta:
        resource_name = 'city'

    def __str__(self):
        return self.name


class Itinerary(models.Model):
    origin = models.ForeignKey(City, related_name='origin', on_delete=models.CASCADE)
    destination = models.ForeignKey(City, related_name='destination', on_delete=models.CASCADE)
    start = models.DateTimeField()

    class Meta:
        db_table = 'itinerary'
        verbose_name_plural = 'itineraries'
        unique_together = (('origin', 'destination', 'start'),)

    class JSONAPIMeta:
        resource_name = 'itinerary'


class Trip(models.Model):
    bus = models.ForeignKey(Bus, on_delete=models.CASCADE)
    itinerary = models.ForeignKey(Itinerary, on_delete=models.CASCADE)

    class Meta:
        db_table = 'trip'
        unique_together = (('bus', 'itinerary'),)

    class JSONAPIMeta:
        resource_name = 'trip'


class Ticket(models.Model):
    passenger = models.ForeignKey(User, on_delete=models.CASCADE)
    trip = models.ForeignKey(Trip, on_delete=models.CASCADE)
    seat = models.PositiveSmallIntegerField()

    class Meta:
        db_table = 'ticket'
        unique_together = (('trip', 'seat'),)

    class JSONAPIMeta:
        resource_name = 'ticket'
