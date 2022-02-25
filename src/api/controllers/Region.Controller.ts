/* eslint-disable no-underscore-dangle */
import { Request, Response } from 'express';
import {
  CreateRegionInput,
  UpdateRegionInput,
  GetRegionInput,
  DeleteRegionInput,
} from '../schema/Region.Schema';
import {
  CreatRegion,
  DeleteRegion,
  FindAndUpdateRegion,
  FindRegion,
} from '../services/Region.Service';

export async function CreateRegionHandler(
  req: Request<{}, {}, CreateRegionInput['body']>,
  res: Response,
) {
  const userId = res.locals.user._id;

  const { body } = req;

  const region = await CreatRegion({
    ...body,
    user: userId,
  });

  return res.send(region);
}

export async function UpdateRegionHandler(
  req: Request<UpdateRegionInput['params']>,
  res: Response,
) {
  const userId = res.locals.user._id;

  const regionId = req.params.RegionId;

  const update = req.body;

  const region = await FindRegion({ regionId });

  if (!region) {
    return res.sendStatus(404);
  }

  if (String(region.user) !== userId) {
    return res.sendStatus(403);
  }

  const updatedRegion = await FindAndUpdateRegion({ regionId }, update, {
    new: true,
  });

  return res.send(updatedRegion);
}

export async function GetRegionHandler(
  req: Request<GetRegionInput['params']>,
  res: Response,
) {
  const regionId = req.params.RegionId;
  const region = await FindRegion({ regionId });

  if (!region) {
    return res.sendStatus(404);
  }

  return res.send(region);
}

export async function DeleteRegionHandler(
  req: Request<DeleteRegionInput['params']>,
  res: Response,
) {
  const userId = res.locals.user._id;

  const regionId = req.params.RegionId;

  const region = await FindRegion({ regionId });

  if (!region) {
    return res.sendStatus(404);
  }

  if (String(region.user) !== userId) {
    return res.sendStatus(403);
  }

  await DeleteRegion({ regionId });

  return res.sendStatus(200);
}
