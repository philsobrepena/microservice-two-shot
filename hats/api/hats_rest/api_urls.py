from hats_rest.views import api_list_hats, api_show_hats
from django.urls import path, include

urlpatterns = [
    path("hat/", api_list_hats, name="api_list_hats"),
    path("hat/<int:pk>/",api_show_hats, name="api_show_hats")

]
