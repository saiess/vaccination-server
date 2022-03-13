import { get } from 'lodash';
import { Request, Response, NextFunction } from 'express';
import { VerifyJwt } from '../../utils/Jwt.Utiles';
import { reIssueAccessToken } from '../services/Session.Service';

const deserializeUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const accessToken = get(req, 'headers.authorization', '').replace(
    /^Bearer\s/,
    '',
  );
  const refreshToken = get(req, 'headers.x-refesh');

  if (!accessToken) {
    return next();
  }

  const { decoded, expired } = VerifyJwt(accessToken);

  if (decoded) {
    res.locals.user = decoded;
    return next();
  }

  if (expired && refreshToken) {
    const newAccessToken = await reIssueAccessToken({ refreshToken });

    if (newAccessToken) {
      res.setHeader('x-access-token', newAccessToken);
    }

    const result = VerifyJwt(newAccessToken as string);

    res.locals.user = result.decoded;

    return next();
  }

  return next();
};

export default deserializeUser;
