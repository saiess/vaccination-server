import { object, string, TypeOf } from 'zod';

const payload = {
  body: object({
    name: string({
      required_error: 'name is required',
    }),
  }),
};

const params = {
  params: object({
    RegionId: string({
      required_error: 'RegionId is required',
    }),
  }),
};

export const CreateRegionSchema = object({
  ...payload,
});

export const UpdateRegionSchema = object({
  ...payload,
  ...params,
});

export const DeleteRegionSchema = object({
  ...params,
});

export const GetRegionSchema = object({
  ...params,
});

export type CreateRegionInput = TypeOf<typeof CreateRegionSchema>;
export type UpdateRegionInput = TypeOf<typeof UpdateRegionSchema>;
export type DeleteRegionInput = TypeOf<typeof DeleteRegionSchema>;
export type GetRegionInput = TypeOf<typeof GetRegionSchema>;
