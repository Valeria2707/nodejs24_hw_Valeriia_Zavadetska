import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    type: String,
    description: 'This is a required property',
    example: 'John',
  })
  @IsString()
  firstName: string;

  @ApiProperty({
    type: String,
    description: 'This is a required property',
    example: 'Smith',
  })
  @IsString()
  lastName: string;

  @ApiProperty({
    type: Number,
    description: 'This is a required property',
    example: 40,
  })
  @IsInt()
  age: number;

  @ApiProperty({
    type: String,
    description: 'This is a required property',
    example: 'StrongPassword123',
  })
  @IsString()
  password: string;

  @ApiPropertyOptional({
    type: String,
    description: 'This is a optional property',
    example: 'eyJhbGciOiJIUzI1NiIsInR...',
  })
  @IsOptional()
  accessToken?: string;

  @ApiPropertyOptional({
    type: String,
    description: 'This is a optional property',
    example: 'eyJhbGciOiJIUzI1NiIsInR...',
  })
  @IsOptional()
  refreshToken?: string;
}
