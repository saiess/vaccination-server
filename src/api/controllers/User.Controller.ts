import { Request, Response } from 'express';
// import { omit } from 'lodash';
import logger from '../../utils/logger';
import { CreatUserIput } from '../schema/User.Schema';
import { CreateUser } from '../services/User.service';

const creatUserHandler = async (
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

export default creatUserHandler;
