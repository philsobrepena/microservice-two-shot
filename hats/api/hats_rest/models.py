from django.db import models

# Create your models here.

class LocationVO(models.Model):
    import_href = models.CharField(max_length=200, unique=True)
    name = models.CharField(max_length=200)

    def __str__(self):
        return self.name

class Hat(models.Model):
    fabric = models.CharField(max_length=200)
    name = models.CharField(max_length=200)
    color = models.CharField(max_length=255)
    picture = models.URLField(max_length=200, null=True)
