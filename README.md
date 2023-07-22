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

First thing I did was create the back-end. I worked from the back-end to the front-end. Created the models, registered them, then worked on the views which allows you to see the list of hats and hat details. Then registered the view in the urls. The hat microservice pulls from the wardrobe microservice to pull the location of which closet name the hat is in. Once the functionality of the microservice was working correctly I moved onto the front end and used React to build out the pages.
