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
exports.FindUser = exports.ValidatePassword = void 0;
/* eslint-disable implicit-arrow-linebreak */
const lodash_1 = require("lodash");
const User_1 = __importDefault(require("../models/User"));
const CreateUser = (input) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield User_1.default.create(input);
    }
    catch (e) {
        throw new Error(e);
    }
});
const ValidatePassword = ({ email, }) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.default.findOne({ email });
    if (!user) {
        return false;
    }
    // const isValid = await user.comparePassword(password);
    // if (!isValid) return false;
    return (0, lodash_1.omit)(user.toJSON(), 'password');
});
exports.ValidatePassword = ValidatePassword;
const FindUser = (query) => __awaiter(void 0, void 0, void 0, function* () { return User_1.default.findOne(query).lean(); });
exports.FindUser = FindUser;
exports.default = CreateUser;
