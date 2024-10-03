import { IsBoolean, IsInt, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  firstName: string;
  @IsString()
  lastName: string;
  @IsInt()
  age: number;
  @IsBoolean()
  isStudent: boolean;
  @IsString()
  password: string;
  @IsOptional()
  accessToken?: string;
  @IsOptional()
  refreshToken?: string;
}
