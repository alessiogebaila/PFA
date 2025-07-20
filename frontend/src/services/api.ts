import axios from 'axios';
import { Appointment, AvailabilityCheck, AvailabilityResponse, BookedSlot } from '../types';

const API_BASE_URL = 'http://127.0.0.1:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const appointmentAPI = {
  // Get all appointments
  getAppointments: () => 
    api.get<Appointment[]>('/api/appointments/'),

  // Create new appointment
  createAppointment: (appointment: Omit<Appointment, 'id'>) =>
    api.post<Appointment>('/api/appointments/', appointment),

  // Get appointment by ID
  getAppointment: (id: number) =>
    api.get<Appointment>(`/api/appointments/${id}/`),

  // Update appointment
  updateAppointment: (id: number, appointment: Omit<Appointment, 'id'>) =>
    api.put<Appointment>(`/api/appointments/${id}/`, appointment),

  // Delete appointment
  deleteAppointment: (id: number) =>
    api.delete(`/api/appointments/${id}/`),

  // Check availability
  checkAvailability: (params: AvailabilityCheck) =>
    api.get<AvailabilityResponse>('/api/check-availability/', { params }),

  // Get booked slots
  getBookedSlots: (date?: string) => {
    const params = date ? { date } : {};
    return api.get<BookedSlot[]>('/api/booked-slots/', { params });
  },
};

export default api;
