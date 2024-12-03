import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class MenuEntity {
  @PrimaryGeneratedColumn('uuid')
  _id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column('decimal')
  price: number;
}
