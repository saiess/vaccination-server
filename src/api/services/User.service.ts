import { omit } from 'lodash';
import { DocumentDefinition, FilterQuery } from 'mongoose';
import UserModel, { UserDocument } from '../models/User';

const CreateUser = async (input: DocumentDefinition<Omit<UserDocument, 'createdAt' | 'updatedAt'>>) => {
  try {
    return await UserModel.create(input);
  } catch (e: any) {
    throw new Error(e);
  }
};

export const ValidatePassword = async ({ email }:{email: string, password: string}) => {
  const user = await UserModel.findOne({ email });

  if (!user) {
    return false;
  }

  // const isValid = await user.comparePassword(password);

  // if (!isValid) return false;

  return omit(user.toJSON(), 'password');
};

export const FindUser = async (query: FilterQuery<UserDocument>) => UserModel.findOne(query).lean();

export default CreateUser;
