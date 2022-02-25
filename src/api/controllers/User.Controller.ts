import { Request, Response } from 'express';
import { omit } from 'lodash';
import logger from '../../utils/logger';
import { CreatUserIput } from '../schema/User.Schema';
import CreatUser from '../services/User.service';

const creatUserHandler = async (
  req: Request<{}, {}, CreatUserIput['body']>,
  res: Response,
) => {
  try {
    const user = await CreatUser(req.body);
    return res.send(omit(user.toJSON(), 'password'));
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send(e.message);
  }
};

export default creatUserHandler;
