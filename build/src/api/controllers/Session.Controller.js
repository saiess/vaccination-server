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
exports.DeleteSessionHandler = exports.GetUserSessionHandler = exports.CreateSessionHandler = void 0;
/* eslint-disable no-underscore-dangle */
const config_1 = __importDefault(require("config"));
const Jwt_Utiles_1 = require("../../utils/Jwt.Utiles");
const Session_Service_1 = require("../services/Session.Service");
const User_service_1 = require("../services/User.service");
const CreateSessionHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Validate the user's password
    const user = yield (0, User_service_1.ValidatePassword)(req.body);
    if (!user) {
        return res.status(401).send('invalid email or password');
    }
    //  create a session
    const session = yield (0, Session_Service_1.CreatSession)(user._id, req.get('user-agent') || '');
    //  create an access token
    const accessToken = (0, Jwt_Utiles_1.SignJwt)(Object.assign(Object.assign({}, user), { session: session._id }), { expiresIn: config_1.default.get('accessTokentl') });
    // create a refresh token
    const refreshToken = (0, Jwt_Utiles_1.SignJwt)(Object.assign(Object.assign({}, user), { session: session._id }), { expiresIn: config_1.default.get('refreshTokentl') });
    //   return access & refresh tokens
    res.cookie('accessToken', accessToken, {
        maxAge: 900000,
        httpOnly: true,
        domain: 'localhost',
        path: '/',
        sameSite: 'strict',
        secure: false,
    });
    res.cookie('refreshToken', refreshToken, {
        maxAge: 3.154e10,
        httpOnly: true,
        domain: 'localhost',
        path: '/',
        sameSite: 'strict',
        secure: false,
    });
    return res.send({ accessToken, refreshToken });
});
exports.CreateSessionHandler = CreateSessionHandler;
const GetUserSessionHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = res.locals.user._id;
    console.log(userId);
    const sessions = yield (0, Session_Service_1.FindSessions)({ user: userId, valid: true });
    console.log(sessions);
    return res.send(sessions);
});
exports.GetUserSessionHandler = GetUserSessionHandler;
const DeleteSessionHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const sessionId = res.locals.user.session;
    yield (0, Session_Service_1.UpdateSessions)({ _id: sessionId }, { valid: false });
    return res.send({
        accessToken: null,
        refreshToken: null,
    });
});
exports.DeleteSessionHandler = DeleteSessionHandler;
