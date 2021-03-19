from django.db import models
from cloudinary.models import CloudinaryField

# Create your models here.
class Food(models.Model):
    name =  models.CharField(max_length=200, blank=True, default = "", null = True)
    description = models.TextField(blank=True, null=True)
    price = models.DecimalField(decimal_places = 2, max_digits=8, blank=True, null=True)
    img =  CloudinaryField('image')

    def __str__(self):
        return self.name
    
