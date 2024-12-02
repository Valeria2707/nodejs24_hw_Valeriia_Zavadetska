import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsIn, IsDateString, IsString } from 'class-validator';

export class CreateReservationDto {
  @ApiProperty({
    type: String,
    description: 'User ID associated with the reservation',
    example: '1',
  })
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({
    type: String,
    description: 'Reservation time in ISO 8601 format',
    example: '2024-10-20T18:00:00Z',
  })
  @IsDateString()
  @IsNotEmpty()
  reservationTime: string;

  @ApiProperty({
    enum: ['reserved', 'canceled', 'visited'],
    description: 'Status of the reservation',
    example: 'reserved',
  })
  @IsIn(['reserved', 'canceled', 'visited'])
  @IsNotEmpty()
  status: 'reserved' | 'canceled' | 'visited';
}
