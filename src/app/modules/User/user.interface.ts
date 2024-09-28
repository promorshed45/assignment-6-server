import { USER_ROLE } from './user.constant';

export interface IUser {
  name: string;
  email: string;
  password: string;
  role: keyof typeof USER_ROLE;
  address: string;
  mobileNumber: string;
}
