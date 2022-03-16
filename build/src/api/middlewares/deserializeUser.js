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
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable operator-linebreak */
const lodash_1 = require("lodash");
const Jwt_Utiles_1 = require("../../utils/Jwt.Utiles");
const Session_Service_1 = require("../services/Session.Service");
const deserializeUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const accessToken = (0, lodash_1.get)(req, 'cookies.accessToken') ||
        (0, lodash_1.get)(req, 'headers.authorization', '').replace(/^Bearer\s/, '');
    const refreshToken = (0, lodash_1.get)(req, 'cookies.refreshToken') || (0, lodash_1.get)(req, 'headers.x-refesh');
    console.log({ accessToken, refreshToken, coonkies: req.cookies });
    if (!accessToken) {
        return next();
    }
    const { decoded, expired } = (0, Jwt_Utiles_1.VerifyJwt)(accessToken);
    if (decoded) {
        res.locals.user = decoded;
        return next();
    }
    if (expired && refreshToken) {
        const newAccessToken = yield (0, Session_Service_1.reIssueAccessToken)({ refreshToken });
        if (newAccessToken) {
            res.setHeader('x-access-token', newAccessToken);
            res.cookie('accessToken', newAccessToken, {
                maxAge: 900000,
                httpOnly: true,
                domain: 'localhost',
                path: '/',
                sameSite: 'strict',
                secure: false,
            });
        }
        const result = (0, Jwt_Utiles_1.VerifyJwt)(newAccessToken);
        res.locals.user = result.decoded;
        return next();
    }
    return next();
});
exports.default = deserializeUser;
