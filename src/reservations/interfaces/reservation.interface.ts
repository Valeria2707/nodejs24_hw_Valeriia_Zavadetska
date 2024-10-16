export interface Reservation {
  id: number;
  restaurantId: number;
  userId: number;
  reservationTime: string;
  status: 'reserved' | 'canceled' | 'visited';
}
