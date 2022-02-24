import { object, string, TypeOf } from 'zod';

const creatUserSchema = object({
  body: object({
    firstname: string({
      required_error: 'first name is required',
    }),
    lastname: string({
      required_error: 'last name is required',
    }),
    cin: string({
      required_error: 'CIN is required',
    }),
    phone: string({
      required_error: 'Phone is required',
    }),
    city: string({
      required_error: 'City is required',
    }),
    password: string({
      required_error: 'Password is required',
    }).min(6, 'Password too short - should be 6 chars minimum'),
    email: string({
      required_error: 'Email is required',
    }).email('Not a valid email'),
  }),
  //   .refine((data) => data.password === data.passwordComfirmation, {
  //     message: 'Password do not match',
  //     path: ['passwordComfirmation'],
  //   }),
});

export default creatUserSchema;

export type CreatUserIput = TypeOf<typeof creatUserSchema>;
