import { object, string } from 'zod';

const CreateSessionSchema = object({
  body: object({
    email: string({
      required_error: 'Email is required',
    }),
    password: string({
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

export default CreateSessionSchema;
