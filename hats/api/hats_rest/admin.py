from django.contrib import admin

# Register your models here.
from.models import Hat, LocationVO

@admin.register(Hat)
class Hatadmin(admin.ModelAdmin):
    list_display= ()


@admin.register(LocationVO)
class LocationVOadmin(admin.ModelAdmin):
    list_display= ()
