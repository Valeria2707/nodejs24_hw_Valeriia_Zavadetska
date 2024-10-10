import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  age: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  isStudent: boolean;
}
