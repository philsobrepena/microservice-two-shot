from django.db import models
from django.urls import reverse

# Create your models here.

class BinVO(models.Model):
    import_href = models.CharField(max_length=200, unique=True)
    name = models.CharField(max_length=200)

class Shoe(models.Model):
    manufacturer = models.CharField(max_length=200)
    name = models.CharField(max_length=200)
    color = models.CharField(max_length=200)
    picture_url = models.URLField(null=True)
    bin = models.ForeignKey(
        BinVO,
        related_name="shoes",
        on_delete=models.CASCADE
    )

    def __str__(self):
        return self.name

    # def get_api_url(self):
    #     return reverse("api_show_shoe", kwargs={"pk": self.pk})
