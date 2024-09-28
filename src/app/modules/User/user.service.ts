import config from '../../config';
import { IUser } from './user.interface';
import { User } from './user.model';
import bcryptJs from 'bcryptjs';


const createUser = async (user: IUser) => {
  user.password = await bcryptJs.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  return await User.create(user);
};

const findUserById = async (userId: string) => {
  return await User.findById(userId);
};


const updateUserById = async (userId: string, payload: Partial<IUser>) => {
  const result = await User.findByIdAndUpdate({ _id: userId }, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};



export const UserService = {
  createUser,
  findUserById,
  updateUserById,
};
