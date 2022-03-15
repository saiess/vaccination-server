"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-underscore-dangle */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
const supertest_1 = __importDefault(require("supertest"));
const mongodb_memory_server_1 = require("mongodb-memory-server");
const mongoose_1 = __importDefault(require("mongoose"));
const server_1 = __importDefault(require("../../utils/server"));
const Center_Service_1 = require("../services/Center.Service");
const Jwt_Utiles_1 = require("../../utils/Jwt.Utiles");
const app = (0, server_1.default)();
const userId = new mongoose_1.default.Types.ObjectId().toString();
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
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const mongoServer = yield mongodb_memory_server_1.MongoMemoryServer.create();
        yield mongoose_1.default.connect(mongoServer.getUri());
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield mongoose_1.default.disconnect();
        yield mongoose_1.default.connection.close();
    }));
    describe('get center route', () => {
        describe('given the center does not exist', () => {
            it('should return a 404', () => __awaiter(void 0, void 0, void 0, function* () {
                const centerId = 'center-123';
                yield (0, supertest_1.default)(app).get(`/api/centers/${centerId}`).expect(404);
            }));
        });
        describe('given the center does exist', () => {
            it('should return a 200 and the center', () => __awaiter(void 0, void 0, void 0, function* () {
                const center = yield (0, Center_Service_1.CreatCenter)(centerPayload);
                const { body, statusCode } = yield (0, supertest_1.default)(app)
                    .get(`/api/centers/${center._id}`)
                    .expect(200);
                expect(statusCode).toBe(200);
                expect(body._id).toBe(center._id.toString());
            }));
        });
    });
    describe('create center route', () => {
        describe('given the user is not logged in', () => {
            it('should return a 403', () => __awaiter(void 0, void 0, void 0, function* () {
                const { statusCode } = yield (0, supertest_1.default)(app).post('/api/centers');
                expect(statusCode).toBe(403);
            }));
        });
        describe('given the user is logged in', () => {
            it('should return a 200 and create the product', () => __awaiter(void 0, void 0, void 0, function* () {
                const jwt = (0, Jwt_Utiles_1.SignJwt)(userPayload);
                const { statusCode, body } = yield (0, supertest_1.default)(app)
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
            }));
        });
    });
});
exports.default = centerPayload;
