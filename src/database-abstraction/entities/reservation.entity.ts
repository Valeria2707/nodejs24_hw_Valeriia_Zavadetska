import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';

@Entity()
export class ReservationEntity {
  @PrimaryGeneratedColumn('uuid')
  _id: string;

  @Column()
  reservationTime: string;

  @Column({ default: 'reserved' })
  status: string;

  @ManyToOne(() => UserEntity, (user) => user.reservations, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  userId: string;
}
