"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionSchema = void 0;
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable func-names */
const mongoose_1 = __importDefault(require("mongoose"));
exports.SessionSchema = new mongoose_1.default.Schema({
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
    },
    valid: {
        type: Boolean,
        default: true,
    },
    userAgent: {
        type: String,
    },
}, { timestamps: true });
const SessionModel = mongoose_1.default.model('Session', exports.SessionSchema);
exports.default = SessionModel;
