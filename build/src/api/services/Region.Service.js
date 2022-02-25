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
exports.DeleteRegion = exports.FindAndUpdateRegion = exports.FindRegion = exports.CreatRegion = void 0;
const Region_1 = __importDefault(require("../models/Region"));
function CreatRegion(input) {
    return __awaiter(this, void 0, void 0, function* () {
        return Region_1.default.create(input);
    });
}
exports.CreatRegion = CreatRegion;
function FindRegion(query, options = { lean: true }) {
    return __awaiter(this, void 0, void 0, function* () {
        return Region_1.default.findOne(query, {}, options);
    });
}
exports.FindRegion = FindRegion;
function FindAndUpdateRegion(query, update, options) {
    return __awaiter(this, void 0, void 0, function* () {
        return Region_1.default.findOneAndUpdate(query, update, options);
    });
}
exports.FindAndUpdateRegion = FindAndUpdateRegion;
function DeleteRegion(query) {
    return __awaiter(this, void 0, void 0, function* () {
        return Region_1.default.deleteOne(query);
    });
}
exports.DeleteRegion = DeleteRegion;
