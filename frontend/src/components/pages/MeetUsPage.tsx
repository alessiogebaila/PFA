import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, Button, Input } from '../ui';
import { Calendar, Clock, User, Building2, Mail, Phone, MessageSquare } from 'lucide-react';
import { appointmentAPI } from '../../services/api';

export const MeetUsPage: React.FC = () => {
  const [formData, setFormData] = useState({
    nume: '',
    firma: '',
    email: '',
    telefon: '',
    data: '',
    ora: '',
    mesaj: ''
  });

  const [timeOptions, setTimeOptions] = useState<string[]>([]);

  useEffect(() => {
    // Generate time options from 9:00 to 16:30
    const times: string[] = [];
    for (let hour = 9; hour <= 16; hour++) {
      const hourStr = hour.toString().padStart(2, '0');
      times.push(`${hourStr}:00`);
      times.push(`${hourStr}:30`);
    }
    setTimeOptions(times);

    // Set minimum date to today
    const today = new Date();
    const minDate = today.toISOString().split('T')[0];
    const dateInput = document.getElementById('data') as HTMLInputElement;
    if (dateInput) {
      dateInput.min = minDate;
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Phone number validation - only numbers
    if (name === 'telefon') {
      const numericValue = value.replace(/[^0-9]/g, '');
      setFormData(prev => ({ ...prev, [name]: numericValue }));
      return;
    }

    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = new Date(e.target.value);
    const day = selectedDate.getUTCDay();

    if (day === 0 || day === 6) {
      alert('Vă rugăm să selectați o zi lucrătoare (Luni - Vineri).');
      setFormData(prev => ({ ...prev, data: '' }));
      return;
    }

    setFormData(prev => ({ ...prev, data: e.target.value }));
    checkAvailability(e.target.value, formData.ora);
  };

  const checkAvailability = async (date: string, time: string) => {
    if (date && time) {
      try {
        const response = await appointmentAPI.checkAvailability({ date, time });
        if (!response.data.available) {
          alert('Acest interval orar este deja rezervat. Vă rugăm să alegeți altul.');
          setFormData(prev => ({ ...prev, ora: '' }));
        }
      } catch (error) {
        console.error('Error checking availability:', error);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate phone number
    if (formData.telefon.length < 10) {
      alert('Numărul de telefon trebuie să aibă cel puțin 10 cifre.');
      return;
    }

    try {
      // Create appointment object matching the Django model
      const appointmentData = {
        nume: formData.nume,
        firma: formData.firma,
        email: formData.email,
        telefon: formData.telefon,
        data: formData.data,
        ora: formData.ora,
        mesaj: formData.mesaj
      };

      await appointmentAPI.createAppointment(appointmentData);
      alert('Cererea de programare a fost trimisă cu succes!');
      
      // Reset form
      setFormData({
        nume: '',
        firma: '',
        email: '',
        telefon: '',
        data: '',
        ora: '',
        mesaj: ''
      });
    } catch (error: any) {
      console.error('Error creating appointment:', error);
      if (error.response?.data) {
        const errorMessages = Object.values(error.response.data).flat();
        alert(`Eroare: ${errorMessages.join(', ')}`);
      } else {
        alert('A apărut o eroare. Vă rugăm să încercați din nou.');
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen py-8"
         style={{
           backgroundImage: `url('/assets/birou.jpeg')`,
           backgroundRepeat: 'no-repeat',
           backgroundSize: 'cover',
           backgroundPosition: 'center'
         }}>
      <Card className="w-full max-w-2xl bg-white shadow-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-[#4a0e4e] mb-2">
            Doriți să colaborăm? Programați o întâlnire.
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div className="space-y-2">
              <label htmlFor="nume" className="flex items-center text-sm font-medium text-gray-700">
                <User className="w-4 h-4 mr-2 text-[#4a0e4e]" />
                Nume:
              </label>
              <Input
                type="text"
                id="nume"
                name="nume"
                value={formData.nume}
                onChange={handleInputChange}
                placeholder="Introduceți numele"
                required
              />
            </div>

            {/* Company */}
            <div className="space-y-2">
              <label htmlFor="firma" className="flex items-center text-sm font-medium text-gray-700">
                <Building2 className="w-4 h-4 mr-2 text-[#4a0e4e]" />
                Numele firmei:
              </label>
              <Input
                type="text"
                id="firma"
                name="firma"
                value={formData.firma}
                onChange={handleInputChange}
                placeholder="Introduceți numele firmei"
                required
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label htmlFor="email" className="flex items-center text-sm font-medium text-gray-700">
                <Mail className="w-4 h-4 mr-2 text-[#4a0e4e]" />
                Email:
              </label>
              <Input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Introduceți adresa de email"
                required
              />
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <label htmlFor="telefon" className="flex items-center text-sm font-medium text-gray-700">
                <Phone className="w-4 h-4 mr-2 text-[#4a0e4e]" />
                Număr de telefon:
              </label>
              <Input
                type="tel"
                id="telefon"
                name="telefon"
                value={formData.telefon}
                onChange={handleInputChange}
                placeholder="Introduceți numărul de telefon"
                required
              />
            </div>

            {/* Date */}
            <div className="space-y-2">
              <label htmlFor="data" className="flex items-center text-sm font-medium text-gray-700">
                <Calendar className="w-4 h-4 mr-2 text-[#4a0e4e]" />
                Data întâlnirii:
              </label>
              <Input
                type="date"
                id="data"
                name="data"
                value={formData.data}
                onChange={handleDateChange}
                required
              />
            </div>

            {/* Time */}
            <div className="space-y-2">
              <label htmlFor="ora" className="flex items-center text-sm font-medium text-gray-700">
                <Clock className="w-4 h-4 mr-2 text-[#4a0e4e]" />
                Ora întâlnirii:
              </label>
              <select
                id="ora"
                name="ora"
                value={formData.ora}
                onChange={handleInputChange}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                required
              >
                <option value="">Alegeți o oră</option>
                {timeOptions.map(time => (
                  <option key={time} value={time}>{time}</option>
                ))}
              </select>
            </div>

            {/* Message */}
            <div className="space-y-2">
              <label htmlFor="mesaj" className="flex items-center text-sm font-medium text-gray-700">
                <MessageSquare className="w-4 h-4 mr-2 text-[#4a0e4e]" />
                Mesaj suplimentar:
              </label>
              <textarea
                id="mesaj"
                name="mesaj"
                value={formData.mesaj}
                onChange={handleInputChange}
                rows={4}
                placeholder="Scrieți un mesaj suplimentar pentru a vă descrie activitatea (opțional)"
                className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>

            <Button type="submit" className="w-full bg-[#4a0e4e] hover:bg-[#4a0e4e]/90">
              Trimite
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
