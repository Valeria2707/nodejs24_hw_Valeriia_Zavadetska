import { Injectable } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';

import { Reservation } from './interfaces/reservation.interface';

@Injectable()
export class ReservationsService {
  private reservations: Reservation[] = [
    {
      id: 1,
      restaurantId: 1,
      userId: 1,
      reservationTime: '2024-10-20 18:00',
      status: 'reserved',
    },
    {
      id: 2,
      restaurantId: 2,
      userId: 2,
      reservationTime: '2024-10-21 19:00',
      status: 'canceled',
    },
  ];
  create(createReservationDto: CreateReservationDto) {
    const newReservation: Reservation = {
      id: this.reservations.length + 1,
      ...createReservationDto,
    };
    this.reservations.push(newReservation);
    return newReservation;
  }

  findAllForUser(userId: number): Reservation[] {
    return this.reservations.filter(
      (reservation) => reservation.userId === userId,
    );
  }

  cancelReservation(id: number) {
    const reservation = this.reservations.find((res) => res.id === id);
    reservation.status = 'canceled';
    return reservation;
  }
}
