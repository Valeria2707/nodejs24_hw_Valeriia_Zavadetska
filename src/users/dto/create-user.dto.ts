import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    type: String,
    description: 'MongoDB document ID',
    example: '64c9bfea8e4c3f4d12345678',
  })
  @IsOptional()
  @IsString()
  _id?: string;

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
}
