import { IsString } from 'class-validator';

export class SignInUserDto {
  @IsString()
  firstName: string;
  @IsString()
  password: string;
}
