import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsNotEmpty, IsIn } from 'class-validator';

export class CreateReservationDto {
  @ApiProperty({
    type: Number,
    description: 'This is a required property',
    example: 1,
  })
  @IsNumber()
  restaurantId: number;

  @ApiProperty({
    type: Number,
    description: 'This is a required property',
    example: 1,
  })
  @IsNumber()
  userId: number;

  @ApiProperty({
    type: String,
    description: 'This is a required property',
    example: '2024-10-20 18:00',
  })
  @IsString()
  @IsNotEmpty()
  reservationTime: string;

  @ApiProperty({
    type: ['reserved', 'canceled', 'visited'],
    description: 'This is a required property',
    example: 'reserved',
  })
  @IsIn(['reserved', 'canceled', 'visited'])
  status: 'reserved' | 'canceled' | 'visited';
}
