from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .emails import send_booking_emails
from .models import Pfa
from .serializers import PfaSerializer, AvailabilityCheckSerializer


class PfaListCreateAPIView(generics.ListCreateAPIView):
    queryset = Pfa.objects.all()
    serializer_class = PfaSerializer

    def perform_create(self, serializer):
        instance = serializer.save()
        try:
            send_booking_emails(instance)
        except Exception as e:
            # Log the error but don't fail the request
            print(f"Email sending failed: {e}")


class PfaRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Pfa.objects.all()
    serializer_class = PfaSerializer


@api_view(['GET'])
def check_availability(request):
    """
    Check if a specific date and time slot is available.
    """
    serializer = AvailabilityCheckSerializer(data=request.GET)
    if serializer.is_valid():
        date = serializer.validated_data['date']
        time = serializer.validated_data['time']
        
        is_available = not Pfa.objects.filter(data=date, ora=time).exists()
        
        return Response({
            'available': is_available,
            'date': date,
            'time': time
        })
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def get_booked_slots(request):
    """
    Get all booked time slots for calendar display.
    """
    date = request.GET.get('date')
    
    if date:
        # Get bookings for specific date
        bookings = Pfa.objects.filter(data=date).values('ora', 'nume', 'firma')
    else:
        # Get all bookings
        bookings = Pfa.objects.all().values('data', 'ora', 'nume', 'firma')
    
    return Response(list(bookings))
