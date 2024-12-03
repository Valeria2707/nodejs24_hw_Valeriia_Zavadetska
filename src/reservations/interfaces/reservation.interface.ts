export interface Reservation {
  id: number;
  userId: number;
  reservationTime: string;
  status: 'reserved' | 'canceled' | 'visited';
}
