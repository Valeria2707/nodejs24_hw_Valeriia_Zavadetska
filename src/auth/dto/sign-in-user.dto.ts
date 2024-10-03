import { IsString } from 'class-validator';
import { ISignInUser } from '../interface/sign-in-user.interface';

export class SignInUserDto implements ISignInUser {
  @IsString()
  firstName: string;
  @IsString()
  password: string;
}
