import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ReservationEntity } from './reservation.entity';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  _id: string;

  @Column()
  age: number;

  @Column({ name: 'firstName' })
  firstName: string;

  @Column({ name: 'lastName' })
  lastName: string;

  @Column()
  isStudent: boolean;

  @OneToMany(() => ReservationEntity, (reservation) => reservation.userId)
  reservations: ReservationEntity[];
}
