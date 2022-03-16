"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
const supertest_1 = __importDefault(require("supertest"));
const mongoose_1 = __importDefault(require("mongoose"));
const server_1 = __importDefault(require("../../utils/server"));
const UserService = __importStar(require("../services/User.service"));
const SessionService = __importStar(require("../services/Session.Service"));
const Session_Controller_1 = require("../controllers/Session.Controller");
const app = (0, server_1.default)();
const userId = new mongoose_1.default.Types.ObjectId().toString();
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
    _id: new mongoose_1.default.Types.ObjectId().toString(),
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
            it('should return the user payload', () => __awaiter(void 0, void 0, void 0, function* () {
                const createUserServiceMock = jest
                    // @ts-ignore
                    .spyOn(UserService, 'CreateUser')
                    // @ts-ignore
                    .mockReturnValueOnce(userPayload);
                const { statusCode, body } = yield (0, supertest_1.default)(app)
                    .post('/api/users')
                    .send(UserInput);
                expect(statusCode).toBe(200);
                expect(body).toEqual(userPayload);
                expect(createUserServiceMock).toHaveBeenCalledWith(UserInput);
            }));
        });
        describe('given the user service throws', () => {
            it('should return a 409', () => __awaiter(void 0, void 0, void 0, function* () {
                const createUserServiceMock = jest
                    // @ts-ignore
                    .spyOn(UserService, 'CreateUser')
                    // @ts-ignore
                    .mockRejectedValue('oh no ops :(');
                const { statusCode } = yield (0, supertest_1.default)(app)
                    .post('/api/users')
                    .send(UserInput);
                expect(statusCode).toBe(409);
                expect(createUserServiceMock).toHaveBeenCalledWith(UserInput);
            }));
        });
    });
    //* creating a user session
    describe('given user session', () => {
        describe('given the username and password are valid', () => {
            it('should return a signed accessToken & refresh token', () => __awaiter(void 0, void 0, void 0, function* () {
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
                yield (0, Session_Controller_1.CreateSessionHandler)(req, res);
                expect(send).toHaveBeenCalledWith({
                    accessToken: expect.any(String),
                    refreshToken: expect.any(String),
                });
            }));
        });
    });
});
exports.default = userPayload;
