import { FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';
import CenterModel, { CenterDocument, CenterInput } from '../models/Center';

export async function CreatCenter(input: CenterInput) {
  return CenterModel.create(input);
}

export async function FindCenterById(
  centerId: string,
  options: QueryOptions = { lean: true },
): Promise<CenterDocument | null> {
  try {
    return await CenterModel.findById(centerId, {}, options);
  } catch {
    return null;
  }
}

export async function FindCenter(
  query: FilterQuery<CenterDocument> = {},
  options: QueryOptions = { lean: true },
) {
  return CenterModel.find(query, {}, options);
}

export async function FindAndUpdateCenter(
  // query: FilterQuery<CenterDocument>,
  centerId: string,
  update: UpdateQuery<CenterDocument>,
  options: QueryOptions,
) {
  return CenterModel.findByIdAndUpdate(centerId, update, options);
}

export async function DeleteCenter(centerId: string) {
  return CenterModel.findByIdAndDelete(centerId);
}
