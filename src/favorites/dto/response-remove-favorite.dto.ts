import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ResponseRemoveFavoriteDto {
  @ApiProperty()
  @IsString()
  message?: string;
}
