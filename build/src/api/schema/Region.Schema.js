"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetRegionSchema = exports.DeleteRegionSchema = exports.UpdateRegionSchema = exports.CreateRegionSchema = void 0;
const zod_1 = require("zod");
const payload = {
    body: (0, zod_1.object)({
        name: (0, zod_1.string)({
            required_error: 'name is required',
        }),
    }),
};
const params = {
    params: (0, zod_1.object)({
        RegionId: (0, zod_1.string)({
            required_error: 'RegionId is required',
        }),
    }),
};
exports.CreateRegionSchema = (0, zod_1.object)(Object.assign({}, payload));
exports.UpdateRegionSchema = (0, zod_1.object)(Object.assign(Object.assign({}, payload), params));
exports.DeleteRegionSchema = (0, zod_1.object)(Object.assign({}, params));
exports.GetRegionSchema = (0, zod_1.object)(Object.assign({}, params));
