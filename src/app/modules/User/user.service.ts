import { QueryBuilder } from '../../builder/QueryBuilder';
import { UserSearchableFields } from './user.constant';
import { TUser } from './user.interface';
import { User } from './user.model';

const createUser = async (payload: TUser) => {
  const user = await User.create(payload);

  return user;
};

const getAllUsersFromDB = async (query: Record<string, unknown>) => {
  const users = new QueryBuilder(User.find(), query)
    .fields()
    .paginate()
    .sort()
    .filter()
    .search(UserSearchableFields);

  const result = await users.modelQuery;
  return result;
};

const getSingleUserFromDB = async (id: string) => {
  const user = await User.findById(id);
  return user;
};

//update profile
const updateProfile = async  (userId:string , payload: Partial<TUser>) => {
  const result = await User.updateOne({_id: userId}, payload, {
    new: true,
  });
  return result;
};

const deleteUser = async (userId: string) => {
  const result = await User.findOneAndDelete({ _id: userId });
  return result;
};

export const UserServices = {
  createUser,
  getAllUsersFromDB,
  getSingleUserFromDB,
  updateProfile,
  deleteUser
};
