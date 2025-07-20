from rest_framework import serializers
from .models import Pfa


class PfaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pfa
        fields = ['id', 'nume', 'firma', 'email', 'telefon', 'data', 'ora', 'mesaj']
        
    def validate(self, data):
        """
        Check that the time slot is not already booked.
        """
        data_value = data.get('data')
        ora_value = data.get('ora')
        
        if data_value and ora_value:
            # Check if this is an update (instance exists)
            instance_id = self.instance.id if self.instance else None
            
            # Check for existing bookings, excluding the current instance if updating
            existing_booking = Pfa.objects.filter(data=data_value, ora=ora_value)
            if instance_id:
                existing_booking = existing_booking.exclude(id=instance_id)
                
            if existing_booking.exists():
                raise serializers.ValidationError("This time slot is already booked.")
        
        return data


class AvailabilityCheckSerializer(serializers.Serializer):
    date = serializers.DateField()
    time = serializers.TimeField()
