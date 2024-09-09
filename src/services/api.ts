import { Reservation } from '@/interfaces/reservation.interface'
import supabase from '../../utils/supabase'

export const fetchReservations = async (): Promise<Reservation[]> => {
  const { data, error } = await supabase
    .from<string, Reservation[]>('reservations')
    .select('*');

  if (error) {
    console.error('Error fetching reservations:', error);
    throw error;
  }

  return data as Reservation[] || [];
};