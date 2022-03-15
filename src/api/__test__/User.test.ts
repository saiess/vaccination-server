/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
import supertest from 'supertest';
import mongoose from 'mongoose';
import createServer from '../../utils/server';
import * as UserService from '../services/User.service';
import * as SessionService from '../services/Session.Service';
import { CreateSessionHandler } from '../controllers/Session.Controller';

const app = createServer();

const userId = new mongoose.Types.ObjectId().toString();

const userPayload = {
  _id: userId,
  email: 'saad@admin.com',
  name: 'said123',
};

const UserInput = {
  email: 'test@exemple.com',
  firstname: 'said',
  lastname: 'ess',
  password: 'said123',
  city: 'rabat',
  phone: '098765432',
  cin: 'gf4756',
};

const sessionPayload = {
  _id: new mongoose.Types.ObjectId().toString(),
  user: userId,
  valid: true,
  userAgent: 'PostmanRuntime/7.29.0',
  createdAt: new Date('2022-02-24T09:27:11.881Z'),
  updatedAt: new Date('2022-02-24T09:27:11.881Z'),
  __v: 0,
};

describe('user', () => {
  // * user registration **

  describe('user registration', () => {
    describe('given the username and password are valid', () => {
      it('should return the user payload', async () => {
        const createUserServiceMock = jest
          // @ts-ignore
          .spyOn(UserService, 'CreateUser')
          // @ts-ignore
          .mockReturnValueOnce(userPayload);

        const { statusCode, body } = await supertest(app)
          .post('/api/users')
          .send(UserInput);

        expect(statusCode).toBe(200);

        expect(body).toEqual(userPayload);

        expect(createUserServiceMock).toHaveBeenCalledWith(UserInput);
      });
    });

    describe('given the user service throws', () => {
      it('should return a 409', async () => {
        const createUserServiceMock = jest
          // @ts-ignore
          .spyOn(UserService, 'CreateUser')
          // @ts-ignore
          .mockRejectedValue('oh no ops :(');

        const { statusCode } = await supertest(app)
          .post('/api/users')
          .send(UserInput);

        expect(statusCode).toBe(409);

        expect(createUserServiceMock).toHaveBeenCalledWith(UserInput);
      });
    });
  });

  //* creating a user session
  describe('given user session', () => {
    describe('given the username and password are valid', () => {
      it('should return a signed accessToken & refresh token', async () => {
        jest
          .spyOn(UserService, 'ValidatePassword')
          // @ts-ignore
          .mockReturnValue(userPayload);

        jest
          // @ts-ignore
          .spyOn(SessionService, 'CreatSession')
          // @ts-ignore
          .mockReturnValue(sessionPayload);

        const req = {
          get: () => 'a user agent',
          body: {
            email: 'test@exemple.com',
            password: 'said123',
          },
        };

        const send = jest.fn();

        const res = {
          send,
        };

        // @ts-ignore
        await CreateSessionHandler(req, res);

        expect(send).toHaveBeenCalledWith({
          accessToken: expect.any(String),
          refreshToken: expect.any(String),
        });
      });
    });
  });
});

export default userPayload;
