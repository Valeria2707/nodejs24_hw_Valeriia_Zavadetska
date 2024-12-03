import { Injectable, NotFoundException } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { IAbstractDatabaseService } from 'src/database-abstraction/types/database-abstraction-service.interface';
import { ReservationEntity } from 'src/database-abstraction/entities/reservation.entity';
import { UserEntity } from 'src/database-abstraction/entities/user.entity';
import { v4 as uuidv4 } from 'uuid';
import { PostgresEntityMapEnum } from 'src/database-abstraction/types/enums/postgres-entity-map.enum';

@Injectable()
export class ReservationsService {
  constructor(
    @Inject('DATABASE_CONNECTION')
    private readonly databaseService: IAbstractDatabaseService<ReservationEntity>,
    @Inject('DATABASE_CONNECTION')
    private readonly userService: IAbstractDatabaseService<UserEntity>,
  ) {}

  async create(
    createReservationDto: CreateReservationDto,
  ): Promise<ReservationEntity> {
    const user = await this.userService.findOne(PostgresEntityMapEnum.USER, {
      _id: createReservationDto.userId,
    });

    if (!user) {
      throw new NotFoundException(
        `User with ID ${createReservationDto.userId} not found`,
      );
    }

    const newReservation = new ReservationEntity();
    newReservation._id = uuidv4();
    newReservation.reservationTime = createReservationDto.reservationTime;
    newReservation.status = createReservationDto.status;
    newReservation.userId = user._id;

    await this.databaseService.insertOne(
      PostgresEntityMapEnum.RESERVATION,
      newReservation,
    );

    return newReservation;
  }

  async findAllForUser(userId: string): Promise<ReservationEntity[]> {
    const user = await this.userService.findOne(PostgresEntityMapEnum.USER, {
      _id: userId,
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const reservations = await this.databaseService.findAll(
      PostgresEntityMapEnum.RESERVATION,
      { userId },
    );

    return reservations;
  }

  async cancelReservation(_id: string): Promise<{ message: string }> {
    const reservation = await this.databaseService.findOne(
      PostgresEntityMapEnum.RESERVATION,
      { _id },
    );

    if (!reservation) {
      throw new NotFoundException(`Reservation with ID ${_id} not found`);
    }

    reservation.status = 'canceled';

    await this.databaseService.updateOne(
      PostgresEntityMapEnum.RESERVATION,
      { _id },
      reservation,
    );

    return {
      message: `Reservation with ID ${_id} has been canceled successfully`,
    };
  }

  async findAll(): Promise<ReservationEntity[]> {
    const reservations = await this.databaseService.findAll(
      PostgresEntityMapEnum.RESERVATION,
    );
    return reservations;
  }
}
