from django.urls import path
from .views import *

urlpatterns = [
    path('',home_view,name='home'),
    path('contact/',contact_view,name='contact'),
    path('meet_us/',meet_us_view,name='meet_us'),
    path('success/',success_view,name='success'),
    path('our_services/',our_services_view,name='our_services'),
    path('prices/',prices_view,name='prices'),
    path('check_availability/', check_availability, name='check_availability'),
]
