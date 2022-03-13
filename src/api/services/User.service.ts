/* eslint-disable implicit-arrow-linebreak */
import { omit } from 'lodash';
import { FilterQuery } from 'mongoose';
import UserModel, { UserDocument, UserInput } from '../models/User';

export const CreateUser = async (input: UserInput) => {
  try {
    const user = await UserModel.create({ ...input, role: 'user' });

    return omit(user.toJSON(), 'password');
  } catch (e: any) {
    throw new Error(e);
  }
};

export const ValidatePassword = async ({
  email,
}: {
  email: string;
  password: string;
}) => {
  const user = await UserModel.findOne({ email });

  if (!user) {
    return false;
  }

  // const isValid = await user.comparePassword(password);

  // if (!isValid) return false;

  return omit(user.toJSON(), 'password');
};

export const FindUser = async (query: FilterQuery<UserDocument>) =>
  UserModel.findOne(query).lean();
