from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json
from common.json import ModelEncoder
from .models import BinVO, Shoe

# Create your views here.

class BinVODetailEncoder(ModelEncoder):
    model = BinVO
    properties = ["id", "import_href"]

class ShoeListEncoder(ModelEncoder):
    model = Shoe
    properties = ["manufacturer", "name", "color", "picture_url", "id", "bin"]



    def get_extra_data(self, o):
        return {"bin": o.bin.id}

class ShoeDetailEncoder(ModelEncoder):
    model = Shoe
    properties = [
        "manufacturer",
        "name",
        "color",
        "picture_url",
        "bin",
    ]
    encoders = {
        "bin": BinVODetailEncoder(),
    }

    def get_extra_data(self, o):
        count = BinVO.objects.filter(name=o.name).count()
        return {"has_name": count > 0}


@require_http_methods(["GET", "POST"])
def api_list_shoes(request, bin_vo_id=None):

    if request.method == "GET":
        if bin_vo_id is not None:
            shoes = Shoe.objects.filter(bin=bin_vo_id)
        else:
            shoes = Shoe.objects.all()
        return JsonResponse(
            {"shoes": shoes},
            encoder=ShoeListEncoder,
        )
    else:
        content = json.loads(request.body)

        try:
            bin_id = content["bin"]
            bin = BinVO.objects.get(id=bin_id)
            content["bin"] = bin
        except BinVO.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid bin id"},
                status=400,
            )

        shoe = Shoe.objects.create(**content)
        return JsonResponse(
            shoe,
            encoder=ShoeDetailEncoder,
            safe=False,
        )

@require_http_methods(["GET", "DELETE"]) #PUT?
def api_show_shoe(request, pk):

    if request.method == "GET":
        shoe = Shoe.objects.get(id=pk)
        return JsonResponse(
            shoe,
            encoder=ShoeDetailEncoder,
            safe=False,
        )

    else: #DELETE
        try:
            shoe = Shoe.objects.get(id=pk)
            shoe.delete()
            return JsonResponse(
                shoe,
                encoder=ShoeDetailEncoder,
                safe=False,
            )
        except Shoe.DoesNotExist:
            return JsonResponse({"message": "Does not exist"})
    # else: # PUT
    #     try:
    #         content = json.loads(request.body)
    #         shoe = Shoe.objects.get(id=pk)

    #         props = ["manufacturer", "name", "color", "bin"]
    #         for prop in props:
    #             if prop in content:
    #                 setattr(shoe, prop, content[prop])
    #         shoe.save()
    #         return JsonResponse(
    #             shoe,
    #             encoder=ShoeDetailEncoder,
    #             safe=False,
    #         )
    #     except Shoe.DoesNotExist:
    #         response = JsonResponse({"message": "Does not exist"})
    #         response.status_code = 404
    #         return response
