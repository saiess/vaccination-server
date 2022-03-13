/* eslint-disable no-underscore-dangle */
import { Request, Response } from 'express';
import {
  CreateCenterInput,
  UpdateCenterInput,
  GetCenterInput,
  DeleteCenterInput,
} from '../schema/Center.Schema';
import {
  CreatCenter,
  DeleteCenter,
  FindAndUpdateCenter,
  FindCenter,
  FindCenterById,
} from '../services/Center.Service';

// ** create center handler ***
export async function CreateCenterHandler(
  req: Request<{}, {}, CreateCenterInput['body']>,
  res: Response,
) {
  const userId = res.locals.user._id;

  const { body } = req;

  const center = await CreatCenter({
    ...body,
    user: userId,
  });

  return res.send(center);
}

// ** update center handler ***
export async function UpdateCenterHandler(
  req: Request<UpdateCenterInput['params']>,
  res: Response,
) {
  const userId = res.locals.user._id;

  const { centerId } = req.params;

  const update = req.body;

  const center = await FindCenterById(centerId);

  if (!center) {
    return res.sendStatus(404);
  }

  if (String(center.user) !== userId) {
    return res.sendStatus(403);
  }

  const updatedCenter = await FindAndUpdateCenter(centerId, update, {
    new: true,
  });

  return res.send(updatedCenter);
}

// ** get one center handler ***
export async function GetCenterHandler(
  req: Request<GetCenterInput['params']>,
  res: Response,
) {
  const { centerId } = req.params;
  const center = await FindCenterById(centerId);
  console.log(center);
  if (!center) {
    return res.sendStatus(404);
  }

  return res.send(center);
}

// ** get all centerq handler ***
export async function GetAllCentersHandler(
  req: Request<GetCenterInput['params']>,
  res: Response,
) {
  const center = await FindCenter();
  console.log(center);
  if (!center) {
    return res.sendStatus(404);
  }

  return res.send(center);
}

// ** delete a center handler ***
export async function DeleteCenterHandler(
  req: Request<DeleteCenterInput['params']>,
  res: Response,
) {
  const userId = res.locals.user._id;

  const { centerId } = req.params;

  const center = await FindCenterById(centerId);

  if (!center) {
    return res.sendStatus(404);
  }

  if (String(center.user) !== userId) {
    return res.sendStatus(403);
  }

  await DeleteCenter(centerId);

  return res.sendStatus(200);
}
