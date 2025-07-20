export interface Appointment {
  id?: number;
  nume: string;
  firma: string;
  email: string;
  telefon: string;
  data: string; // ISO date string
  ora: string; // Time string in HH:MM format
  mesaj?: string;
}

export interface AvailabilityCheck {
  date: string;
  time: string;
}

export interface AvailabilityResponse {
  available: boolean;
  date: string;
  time: string;
}

export interface BookedSlot {
  data?: string;
  ora: string;
  nume: string;
  firma: string;
}

export interface ApiError {
  [key: string]: string[];
}
