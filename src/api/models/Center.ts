/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable func-names */
import mongoose from 'mongoose';
import { customAlphabet } from 'nanoid';
import { UserDocument } from './User';

export interface CenterInput {
  user: UserDocument['_id'];
  name: string;
  region: string;
}

export interface CenterDocument extends CenterInput, mongoose.Document {
  user: UserDocument['_id'];
  createdAt: Date;
  updatedAt: Date;
}
export const CenterSchema = new mongoose.Schema<CenterDocument>(
  {
    // centerId: {
    //   type: String,
    //   required: true,
    //   unique: true,
    //   default: () => `center_${nanoid()}`,
    // },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    name: { type: String, required: true },
    region: { type: String, required: true },
  },
  { timestamps: true },
);

const CenterModel = mongoose.model<CenterDocument>('Center', CenterSchema);

export default CenterModel;
