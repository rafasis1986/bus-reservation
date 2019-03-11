from itertools import cycle
from django.utils.deconstruct import deconstructible
from django.core.validators import RegexValidator
from django.core.exceptions import ValidationError


@deconstructible
class RutValidator(RegexValidator):
    regex = r'^\d{1,10}((K){1}$|\d{1}$)'
    message = 'Enter a valid rut.'
    code = 'invalid'
    flags = 0

    def __call__(self, value):
        RegexValidator.__call__(self, value.upper())
        aux = value[:-1]
        dv = value[-1:]
        inverse = map(int, reversed(str(aux)))
        factors = cycle(range(2, 8))
        s = sum(d * f for d, f in zip(inverse, factors))
        res = (-s) % 11
        if str(res) == dv:
            pass
        elif dv == 'K' and res == 10:
            pass
        else:
            raise ValidationError(self.message, code=self.code)
