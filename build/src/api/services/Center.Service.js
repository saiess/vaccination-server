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
exports.DeleteCenter = exports.FindAndUpdateCenter = exports.FindCenter = exports.FindCenterById = exports.CreatCenter = void 0;
const Center_1 = __importDefault(require("../models/Center"));
function CreatCenter(input) {
    return __awaiter(this, void 0, void 0, function* () {
        return Center_1.default.create(input);
    });
}
exports.CreatCenter = CreatCenter;
function FindCenterById(centerId, options = { lean: true }) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield Center_1.default.findById(centerId, {}, options);
        }
        catch (_a) {
            return null;
        }
    });
}
exports.FindCenterById = FindCenterById;
function FindCenter(query = {}, options = { lean: true }) {
    return __awaiter(this, void 0, void 0, function* () {
        return Center_1.default.find(query, {}, options);
    });
}
exports.FindCenter = FindCenter;
function FindAndUpdateCenter(
// query: FilterQuery<CenterDocument>,
centerId, update, options) {
    return __awaiter(this, void 0, void 0, function* () {
        return Center_1.default.findByIdAndUpdate(centerId, update, options);
    });
}
exports.FindAndUpdateCenter = FindAndUpdateCenter;
function DeleteCenter(centerId) {
    return __awaiter(this, void 0, void 0, function* () {
        return Center_1.default.findByIdAndDelete(centerId);
    });
}
exports.DeleteCenter = DeleteCenter;
