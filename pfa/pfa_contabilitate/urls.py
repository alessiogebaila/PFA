from django.urls import path
from .views import *
from .api_views import (
    PfaListCreateAPIView, 
    PfaRetrieveUpdateDestroyAPIView,
    check_availability as api_check_availability,
    get_booked_slots
)

urlpatterns = [
    # Traditional Django views (keep for backward compatibility)
    path('',home_view,name='home'),
    path('perfect_team_invest/',perfect_team_invest_view,name='perfect_team_invest'),
    path('perfect_team_finance/',perfect_team_finance_view,name='perfect_team_finance'),
    path('contact/',contact_view,name='contact'),
    path('meet_us/',meet_us_view,name='meet_us'),
    path('success/',success_view,name='success'),
    path('our_services/',our_services_view,name='our_services'),
    path('prices/',prices_view,name='prices'),
    path('check_availability/', check_availability, name='check_availability'),
    
    # API endpoints
    path('api/appointments/', PfaListCreateAPIView.as_view(), name='api-appointments-list'),
    path('api/appointments/<int:pk>/', PfaRetrieveUpdateDestroyAPIView.as_view(), name='api-appointments-detail'),
    path('api/check-availability/', api_check_availability, name='api-check-availability'),
    path('api/booked-slots/', get_booked_slots, name='api-booked-slots'),
]
