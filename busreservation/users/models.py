import uuid

from django.conf import settings
from django.contrib.auth.models import AbstractUser, UserManager
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token

from busreservation.users.snippets.validators import RutValidator


class CustomUserManager(UserManager):

    def create_user(self, username, email, password=None, **extra_fields):
        if not email:
            raise ValueError('The given email must be set')
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)
        extra_fields.setdefault('is_active', False)
        return self._create_user(username, email, password, **extra_fields)


class User(AbstractUser):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    username_validator = RutValidator()

    username = models.CharField(
        name='username',
        max_length=11,
        unique=True,
        help_text='Required. 11 characters or fewer. digits only.',
        validators=[username_validator],
        error_messages={
            'unique': 'A user with that rut already exists.',
        },
    )

    objects = CustomUserManager()

    class JSONAPIMeta:
        resource_name = 'user'


@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)
