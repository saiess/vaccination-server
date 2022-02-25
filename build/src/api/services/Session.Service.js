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
exports.reIssueAccessToken = exports.UpdateSessions = exports.FindSessions = void 0;
/* eslint-disable no-underscore-dangle */
const config_1 = __importDefault(require("config"));
const lodash_1 = require("lodash");
const Jwt_Utiles_1 = require("../../utils/Jwt.Utiles");
const Session_1 = __importDefault(require("../models/Session"));
const User_service_1 = require("./User.service");
const CreatSession = (userId, userAgent) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield Session_1.default.create({ user: userId, userAgent });
    return session.toJSON();
});
function FindSessions(query) {
    return __awaiter(this, void 0, void 0, function* () {
        return Session_1.default.find(query).lean();
    });
}
exports.FindSessions = FindSessions;
function UpdateSessions(query, update) {
    return __awaiter(this, void 0, void 0, function* () {
        return Session_1.default.updateOne(query, update);
    });
}
exports.UpdateSessions = UpdateSessions;
function reIssueAccessToken({ refreshToken, }) {
    return __awaiter(this, void 0, void 0, function* () {
        const { decoded } = (0, Jwt_Utiles_1.VerifyJwt)(refreshToken);
        if (!decoded || !(0, lodash_1.get)(decoded, 'session'))
            return false;
        const session = yield Session_1.default.findById((0, lodash_1.get)(decoded, 'session'));
        if (!session || !session.valid)
            return false;
        const user = yield (0, User_service_1.FindUser)({ _id: session.user });
        if (!user)
            return false;
        const accessToken = (0, Jwt_Utiles_1.SignJwt)(Object.assign(Object.assign({}, user), { session: session._id }), { expiresIn: config_1.default.get('accessTokentl') });
        return accessToken;
    });
}
exports.reIssueAccessToken = reIssueAccessToken;
exports.default = CreatSession;
