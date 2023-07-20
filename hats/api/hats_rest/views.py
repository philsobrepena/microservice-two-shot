from django.shortcuts import render
from .models import Hat, LocationVO
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json
from common.json import ModelEncoder

# Create your views here.

class LocationVODetailEncoder(ModelEncoder):
    model = LocationVO
    properties = ["name", "import_href"]

class HatListEncoder(ModelEncoder):
    model = Hat
    properties = [
        "fabric",
        "name",
        "color",
        "picture",

    ]

class HatDetailEncoder(ModelEncoder):
    model = Hat
    properties = [
        "fabric"
        "name"
        "color"
        "picture"
    ]


@require_http_methods(["GET", "POST"])
def api_list_hats(request, location_vo_id=None):
    if request.method == "GET":
        if(location_vo_id is not None):
            hat = Hat.objects.filter(location=location_vo_id)
        else:
            hat = Hat.objects.all()
        return JsonResponse(
            {"hat": hat},
            encoder = HatListEncoder)
    else:
        content = json.loads(request.body)

        try:
            location_href = content["location"]
            location = LocationVO.objects.get(import_href=location_href)
            content["location"] = location
        except LocationVO.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid conference id"},
                status=400,
            )

        hat = Hat.objects.create(**content)
        return JsonResponse(
            hat,
            encoder=HatDetailEncoder,
            safe=False,
        )

def api_show_hats(request, pk):

    hat = Hat.objects.get(id=pk)
    return JsonResponse(
        hat,
        encoder=HatDetailEncoder,
        safe=False,
    )
