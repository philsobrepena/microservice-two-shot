import django
import os
import sys
import time
import json
import requests

sys.path.append("shoes")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "shoes_project.settings")
django.setup()

# Import models from hats_rest, here.
# from shoes_rest.models import Something
from api.shoes_rest.models import BinVO

def get_bins():
    response = requests.get("http://wardrobe-api:8000/api/bins/")
    content = json.loads(response.content)
    for bin in content["bins"]:
        BinVO.objects.update_or_create(
            import_href=bin["href"],
            defaults={"id": bin["id"]},
        )


def poll():
    while True:
        print('Shoes poller polling for data')
        try:
            get_bins()
            print('Bins Gotten')
        except Exception as e:
            print(e, file=sys.stderr)
        time.sleep(60)


if __name__ == "__main__":
    poll()
