/* eslint-disable implicit-arrow-linebreak */
import { Request, Response } from 'express';
// import { omit } from 'lodash';
import logger from '../../utils/logger';
import { CreatUserIput } from '../schema/User.Schema';
import { CreateUser, FindUsers } from '../services/User.service';

export const creatUserHandler = async (
  req: Request<{}, {}, CreatUserIput['body']>,
  res: Response,
) => {
  try {
    const user = await CreateUser(req.body);
    return res.send(user);
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send(e.message);
  }
};

// ** get all centers handler ***
export async function getAllUser(req: Request, res: Response) {
  const center = await FindUsers();
  console.log(center);
  if (!center) {
    return res.sendStatus(404);
  }

  return res.send(center);
}

export const getCurrentUser = async (req: Request, res: Response) =>
  res.send(res.locals.user);
