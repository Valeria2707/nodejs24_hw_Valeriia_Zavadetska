export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  password: string;
  accessToken?: string;
  refreshToken?: string;
}
