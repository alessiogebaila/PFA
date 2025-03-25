from django.db import models
from django.core.exceptions import ValidationError


class Pfa(models.Model):
    nume = models.CharField(max_length=100,null=False,blank=False)
    firma = models.CharField(max_length=100,null=False,blank=False)
    email = models.EmailField(null=False,blank=False)
    telefon = models.CharField(max_length=15,null=False,blank=False)
    data = models.DateField(null=False,blank=False)
    ora = models.TimeField(null=False,blank=False)
    mesaj = models.TextField(blank=True, null=True)

    class Meta:
        unique_together = ['data', 'ora']

    def clean(self):
        if Pfa.objects.filter(data=self.data, ora=self.ora).exists():
            raise ValidationError("This time slot is already booked.")

    def save(self, *args, **kwargs):
        self.full_clean()
        super().save(*args, **kwargs)

    def __str__(self):
        formatted_date = self.data.strftime('%d/%m/%y')
        formatted_time = self.ora.strftime('%H:%M')
        return f"{self.nume} - {self.firma} (Meeting on {formatted_date} at {formatted_time})"