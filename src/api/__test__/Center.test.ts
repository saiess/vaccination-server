/* eslint-disable no-underscore-dangle */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
import supertest from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import createServer from '../../utils/server';
import { CreatCenter } from '../services/Center.Service';
import { SignJwt } from '../../utils/Jwt.Utiles';

const app = createServer();

const userId = new mongoose.Types.ObjectId().toString();

const centerPayload = {
  user: userId,
  name: 'testores',
  region: 'safi',
};

const userPayload = {
  _id: userId,
  email: 'said@admin.com',
  password: 'said',
};

describe('center', () => {
  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create();

    await mongoose.connect(mongoServer.getUri());
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
  });

  describe('get center route', () => {
    describe('given the center does not exist', () => {
      it('should return a 404', async () => {
        const centerId = 'center-123';

        await supertest(app).get(`/api/centers/${centerId}`).expect(404);
      });
    });

    describe('given the center does exist', () => {
      it('should return a 200 and the center', async () => {
        const center = await CreatCenter(centerPayload);

        const { body, statusCode } = await supertest(app)
          .get(`/api/centers/${center._id}`)
          .expect(200);

        expect(statusCode).toBe(200);

        expect(body._id).toBe(center._id.toString());
      });
    });
  });

  describe('create center route', () => {
    describe('given the user is not logged in', () => {
      it('should return a 403', async () => {
        const { statusCode } = await supertest(app).post('/api/centers');

        expect(statusCode).toBe(403);
      });
    });

    describe('given the user is logged in', () => {
      it('should return a 200 and create the product', async () => {
        const jwt = SignJwt(userPayload);

        const { statusCode, body } = await supertest(app)
          .post('/api/centers')
          .set('Authorization', `Bearer ${jwt}`)
          .send(centerPayload);

        expect(statusCode).toBe(200);

        expect(body).toEqual({
          __v: 0,
          _id: expect.any(String),
          createdAt: expect.any(String),
          name: 'testores',
          region: 'safi',
          updatedAt: expect.any(String),
          user: expect.any(String),
        });
      });
    });
  });
});

export default centerPayload;
