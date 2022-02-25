"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const creatUserSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        firstname: (0, zod_1.string)({
            required_error: 'first name is required',
        }),
        lastname: (0, zod_1.string)({
            required_error: 'last name is required',
        }),
        cin: (0, zod_1.string)({
            required_error: 'CIN is required',
        }),
        phone: (0, zod_1.string)({
            required_error: 'Phone is required',
        }),
        city: (0, zod_1.string)({
            required_error: 'City is required',
        }),
        password: (0, zod_1.string)({
            required_error: 'Password is required',
        }).min(6, 'Password too short - should be 6 chars minimum'),
        email: (0, zod_1.string)({
            required_error: 'Email is required',
        }).email('Not a valid email'),
    }),
    //   .refine((data) => data.password === data.passwordComfirmation, {
    //     message: 'Password do not match',
    //     path: ['passwordComfirmation'],
    //   }),
});
exports.default = creatUserSchema;
