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
exports.getCurrentUser = exports.getAllUser = exports.creatUserHandler = void 0;
// import { omit } from 'lodash';
const logger_1 = __importDefault(require("../../utils/logger"));
const User_service_1 = require("../services/User.service");
const creatUserHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (0, User_service_1.CreateUser)(req.body);
        return res.send(user);
    }
    catch (e) {
        logger_1.default.error(e);
        return res.status(409).send(e.message);
    }
});
exports.creatUserHandler = creatUserHandler;
// ** get all centers handler ***
function getAllUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const center = yield (0, User_service_1.FindUsers)();
        console.log(center);
        if (!center) {
            return res.sendStatus(404);
        }
        return res.send(center);
    });
}
exports.getAllUser = getAllUser;
const getCurrentUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () { return res.send(res.locals.user); });
exports.getCurrentUser = getCurrentUser;
