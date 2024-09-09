export interface Reservation {
  id: string;
  boat_id: number;
  boat_name: string;
  first_name: string;
  last_name: string;
  cedula: number;
  email: string;
  phone: string;
  start_date: string;
  end_date: string;
  price: number;
  payment_method: string;
  status: string;
  created_at: string;
}

export enum ReservationStatus {
  processing = "processing",
  success = "success",
  canceled = "canceled",
  reserved = "reserved",
}