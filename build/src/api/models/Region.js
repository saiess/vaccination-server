"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegionSchema = void 0;
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable func-names */
const mongoose_1 = __importDefault(require("mongoose"));
const nanoid_1 = require("nanoid");
const nanoid = (0, nanoid_1.customAlphabet)('abcdefghijklmnopqrstvwz0123456789', 10);
exports.RegionSchema = new mongoose_1.default.Schema({
    RegionId: {
        type: String,
        required: true,
        unique: true,
        default: () => `region_${nanoid()}`,
    },
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
    },
    name: { type: String, required: true },
}, { timestamps: true });
const RegionModel = mongoose_1.default.model('Region', exports.RegionSchema);
exports.default = RegionModel;
