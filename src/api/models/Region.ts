/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable func-names */
import mongoose from 'mongoose';
import { customAlphabet } from 'nanoid';
import { string } from 'zod';
import { UserDocument } from './User';

const nanoid = customAlphabet('abcdefghijklmnopqrstvwz0123456789', 10);

export interface RegionDocument extends mongoose.Document {
  user: UserDocument['_id'];
  name: string;
  createdAt: Date;
  updatedAt: Date;
}
export const RegionSchema = new mongoose.Schema(
  {
    RegionId: {
      type: String,
      required: true,
      unique: true,
      default: () => `region_${nanoid()}`,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    name: { type: String, required: true },
  },
  { timestamps: true },
);

const RegionModel = mongoose.model<RegionDocument>('Region', RegionSchema);

export default RegionModel;
