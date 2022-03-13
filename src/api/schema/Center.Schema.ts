import { object, string, TypeOf } from 'zod';

const payload = {
  body: object({
    name: string({
      required_error: 'name is required',
    }),
    region: string({
      required_error: 'region is required',
    }),
  }),
};

const params = {
  params: object({
    centerId: string({
      required_error: 'CenterId is required',
    }),
  }),
};

export const CreateCenterSchema = object({
  ...payload,
});

export const UpdateCenterSchema = object({
  ...payload,
  ...params,
});

export const DeleteCenterSchema = object({
  ...params,
});

export const GetCenterSchema = object({
  ...params,
});

export type CreateCenterInput = TypeOf<typeof CreateCenterSchema>;
export type UpdateCenterInput = TypeOf<typeof UpdateCenterSchema>;
export type DeleteCenterInput = TypeOf<typeof DeleteCenterSchema>;
export type GetCenterInput = TypeOf<typeof GetCenterSchema>;
