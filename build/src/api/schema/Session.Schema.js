"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const CreateSessionSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        email: (0, zod_1.string)({
            required_error: 'Email is required',
        }),
        password: (0, zod_1.string)({
            required_error: 'password is required',
        }),
        // firstname: string({
        //   required_error: 'First Name is required',
        // }),
        // lastname: string({
        //   required_error: 'Last Name is required',
        // }),
        // cin: string({
        //   required_error: 'CIN is required',
        // }),
        // phone: string({
        //   required_error: 'Phone is required',
        // }),
        // city: string({
        //   required_error: 'City is required',
        // }),
    }),
});
exports.default = CreateSessionSchema;
