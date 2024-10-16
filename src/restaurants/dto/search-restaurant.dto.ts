import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class SearchRestaurantDto {
  @ApiPropertyOptional({
    type: String,
    description: 'This is a optional property',
    example: 'St Kyiv 673',
  })
  @IsString()
  @IsOptional()
  location?: string;

  @ApiPropertyOptional({
    type: String,
    description: 'This is a optional property',
    example: 'Italian',
  })
  @IsString()
  @IsOptional()
  cuisine?: string;

  @ApiPropertyOptional({
    type: Number,
    description: 'This is a optional property',
    example: 4.5,
  })
  @Transform(({ value }) => parseFloat(value))
  @IsNumber()
  @IsOptional()
  rating?: number;
}
