import { IsNumber } from 'class-validator';
import { Transform } from 'class-transformer';

export class RemoveFavoriteDto {
  @Transform(({ value }) => Number(value))
  @IsNumber()
  userId: number;

  @Transform(({ value }) => Number(value))
  @IsNumber()
  restaurantId: number;
}
