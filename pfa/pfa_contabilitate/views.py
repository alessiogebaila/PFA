from django.shortcuts import render,redirect
from django.core.exceptions import ValidationError
from django.core.mail import send_mail
from django.http import JsonResponse
from .models import Pfa



def home_view(request):
    return render(request, 'home.html')

def contact_view(request):
    return render(request,'contact.html')

def meet_us_view(request):
    if request.method == 'POST':
        try:
            id_client = request.POST.get('id')
            nume_client = request.POST.get('nume')
            firma_client = request.POST.get('firma')
            email_client = request.POST.get('email')
            telefon_client = request.POST.get('telefon')
            data_client = request.POST.get('data')
            ora_client = request.POST.get('ora')
            mesaj_client = request.POST.get('mesaj')
            
            client = Pfa(id=id_client, nume=nume_client, firma=firma_client, email=email_client, 
                         telefon=telefon_client, data=data_client, ora=ora_client, mesaj=mesaj_client)
            client.save()
            
            # Send email to the client
            send_mail(
                'Intalnire confirmata',
                f'''Va multumim, {nume_client} de la firma {firma_client}, pentru programarea intalnirii. Am primit cererea dumneavoatra pentru data de {data_client} la ora {ora_client}.
                Va asteptam cu drag!''',
                'alessio.andrei276@gmail.com',  # From email
                [email_client], 
                fail_silently=False,
            )
            
            # Send email to the host
            host_email = 'alessio.andrei276@gmail.com'  # my email
            send_mail(
                'Intalnire noua',
                f"O noua intalnire a fost programata de {nume_client} de la firma {firma_client} pentru data de {data_client} la ora {ora_client}.",
                'alessio.andrei276@gmail.com',
                [host_email],
                fail_silently=False,
            )
            
            return redirect('success')

        except ValidationError as e:
            return render(request, 'meet_us.html', {'error': str(e)})

    return render(request, 'meet_us.html')
def success_view(request):
    return render(request,"form_completed.html")

def our_services_view(request):
    return render(request,'our_services.html')

def prices_view(request):
    return render(request,'prices.html',{'active_page': 'prices'})

def check_availability(request):
    date = request.GET.get('date')
    time = request.GET.get('time')
    is_available = not Pfa.objects.filter(data=date, ora=time).exists()
    return JsonResponse({'available': is_available})


