import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class CreateFavoriteDto {
  @ApiProperty({
    type: Number,
    description: 'This is a required property',
    example: 1,
  })
  @IsNumber()
  userId: number;

  @ApiProperty({
    type: Number,
    description: 'This is a required property',
    example: 1,
  })
  @IsNumber()
  restaurantId: number;
}
