import {
  DocumentDefinition, FilterQuery, QueryOptions, UpdateQuery,
} from 'mongoose';
import RegionModel, { RegionDocument } from '../models/Region';

export async function CreatRegion(input: DocumentDefinition<Omit<RegionDocument, 'createdAt' | 'updatedAt'>>) {
  return RegionModel.create(input);
}

export async function FindRegion(
  query: FilterQuery<RegionDocument>,
  options: QueryOptions = { lean: true },
) {
  return RegionModel.findOne(query, {}, options);
}

export async function FindAndUpdateRegion(
  query: FilterQuery<RegionDocument>,
  update: UpdateQuery<RegionDocument>,
  options: QueryOptions,
) {
  return RegionModel.findOneAndUpdate(query, update, options);
}

export async function DeleteRegion(query: FilterQuery<RegionDocument>) {
  return RegionModel.deleteOne(query);
}
