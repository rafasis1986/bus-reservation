from django.contrib import admin
from busreservation.reservations import models

admin.site.register(models.Bus)
admin.site.register(models.City)
admin.site.register(models.Itinerary)
admin.site.register(models.Ticket)
admin.site.register(models.Trip)
