import { Request, Response } from 'express';
import logger from '../../utils/logger';
import CreatUser from '../services/User.service';

const creatUserHandler = async (req: Request, res: Response) => {
  try {
    const user = await CreatUser(req.body);
    return user;
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send(e.message);
  }
};

export default creatUserHandler;
