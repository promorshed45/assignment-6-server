import { USER_ROLE } from "../User/user.constant";

export type TLoginUser = {
  name: string;
  email: string;
  password?: string;
  role: keyof typeof USER_ROLE;
  address?: string;
  mobileNumber?: string;
};

