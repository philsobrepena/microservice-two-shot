# Wardrobify

Team:

* Katelyn Chang -Hats
* Phil Sobrepena - Shoes

## Design

## Shoes microservice

Shoe models in the shoes microservice are assigned to a bin model when created.
Bins are created in the wardrobe microservice and assigned to a
bin id.
Poller.py will request bin information from wardrobe microservice to see if it matches any binVO information from shoes.
If a shoe is created, it will be assigned to the bin with the matching bin id.
Shoes can be viewed, created, and deleted through the browser.

## Hats microservice

Explain your models and integration with the wardrobe
microservice, here.
