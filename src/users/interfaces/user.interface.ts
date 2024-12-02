import { Reservation } from 'src/reservations/interfaces/reservation.interface';

export interface IUser {
  _id?: string;
  firstName: string;
  lastName: string;
  age: number;
  reservations?: Reservation[];
}
