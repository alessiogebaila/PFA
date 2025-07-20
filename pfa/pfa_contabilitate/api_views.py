from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.core.mail import send_mail
from django.conf import settings
from .models import Pfa
from .serializers import PfaSerializer, AvailabilityCheckSerializer


class PfaListCreateAPIView(generics.ListCreateAPIView):
    queryset = Pfa.objects.all()
    serializer_class = PfaSerializer
    
    def perform_create(self, serializer):
        # Save the instance
        instance = serializer.save()
        
        # Send email to the client
        try:
            send_mail(
                'Intalnire confirmata',
                f'''Va multumim, {instance.nume} de la firma {instance.firma}, pentru programarea intalnirii. Am primit cererea dumneavoatra pentru data de {instance.data} la ora {instance.ora}.
                Va asteptam cu drag!''',
                settings.EMAIL_HOST_USER,
                [instance.email], 
                fail_silently=False,
            )
            
            # Send email to the host
            send_mail(
                'Intalnire noua',
                f"O noua intalnire a fost programata de {instance.nume} de la firma {instance.firma} pentru data de {instance.data} la ora {instance.ora}.",
                settings.EMAIL_HOST_USER,
                [settings.EMAIL_HOST_USER],
                fail_silently=False,
            )
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
