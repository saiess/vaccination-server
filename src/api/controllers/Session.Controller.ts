/* eslint-disable no-underscore-dangle */
import config from 'config';
import { Request, Response } from 'express';
import { SignJwt } from '../../utils/Jwt.Utiles';
import {
  CreatSession,
  FindSessions,
  UpdateSessions,
} from '../services/Session.Service';
import { ValidatePassword } from '../services/User.service';

export const CreateSessionHandler = async (req: Request, res: Response) => {
  // Validate the user's password
  const user = await ValidatePassword(req.body);

  if (!user) {
    return res.status(401).send('invalid email or password');
  }

  //  create a session
  const session = await CreatSession(user._id, req.get('user-agent') || '');
  //  create an access token

  const accessToken = SignJwt(
    { ...user, session: session._id },
    { expiresIn: config.get('accessTokentl') }, // 15 houres
  );
  // create a refresh token

  const refreshToken = SignJwt(
    { ...user, session: session._id },
    { expiresIn: config.get('refreshTokentl') }, // 1 year
  );
  //   return access & refresh tokens

  res.cookie('accessToken', accessToken, {
    maxAge: 900000, //* 15 mins *
    httpOnly: true,
    domain: 'localhost',
    path: '/',
    sameSite: 'strict',
    secure: false,
  });

  res.cookie('refreshToken', refreshToken, {
    maxAge: 3.154e10, //* 1 year *
    httpOnly: true,
    domain: 'localhost',
    path: '/',
    sameSite: 'strict',
    secure: false,
  });

  return res.send({ accessToken, refreshToken });
};

export const GetUserSessionHandler = async (req: Request, res: Response) => {
  const userId = res.locals.user._id;

  console.log(userId);

  const sessions = await FindSessions({ user: userId, valid: true });

  console.log(sessions);
  return res.send(sessions);
};

export const DeleteSessionHandler = async (req: Request, res: Response) => {
  const sessionId = res.locals.user.session;

  await UpdateSessions({ _id: sessionId }, { valid: false });

  return res.send({
    accessToken: null,
    refreshToken: null,
  });
};
