/* eslint-disable no-underscore-dangle */
import config from 'config';
import { get } from 'lodash';
import { FilterQuery, UpdateQuery } from 'mongoose';
import { SignJwt, VerifyJwt } from '../../utils/Jwt.Utiles';
import SessionModel, { SessionDocument } from '../models/Session';
import { FindUser } from './User.service';

export const CreatSession = async (userId: string, userAgent: string) => {
  const session = await SessionModel.create({ user: userId, userAgent });

  return session.toJSON();
};

export async function FindSessions(query: FilterQuery<SessionDocument>) {
  return SessionModel.find(query).lean();
}

export async function UpdateSessions(
  query: FilterQuery<SessionDocument>,
  update: UpdateQuery<SessionDocument>,
) {
  return SessionModel.updateOne(query, update);
}

export async function reIssueAccessToken({
  refreshToken,
}: {
  refreshToken: string;
}) {
  const { decoded } = VerifyJwt(refreshToken);

  if (!decoded || !get(decoded, 'session')) return false;

  const session = await SessionModel.findById(get(decoded, 'session'));

  if (!session || !session.valid) return false;

  const user = await FindUser({ _id: session.user });

  if (!user) return false;

  const accessToken = SignJwt(
    { ...user, session: session._id },
    { expiresIn: config.get('accessTokentl') }, // 15 houres
  );

  return accessToken;
}
