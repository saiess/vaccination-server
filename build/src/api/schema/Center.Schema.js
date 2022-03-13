"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetCenterSchema = exports.DeleteCenterSchema = exports.UpdateCenterSchema = exports.CreateCenterSchema = void 0;
const zod_1 = require("zod");
const payload = {
    body: (0, zod_1.object)({
        name: (0, zod_1.string)({
            required_error: 'name is required',
        }),
        region: (0, zod_1.string)({
            required_error: 'region is required',
        }),
    }),
};
const params = {
    params: (0, zod_1.object)({
        centerId: (0, zod_1.string)({
            required_error: 'CenterId is required',
        }),
    }),
};
exports.CreateCenterSchema = (0, zod_1.object)(Object.assign({}, payload));
exports.UpdateCenterSchema = (0, zod_1.object)(Object.assign(Object.assign({}, payload), params));
exports.DeleteCenterSchema = (0, zod_1.object)(Object.assign({}, params));
exports.GetCenterSchema = (0, zod_1.object)(Object.assign({}, params));
