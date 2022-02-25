import { Express, Request, Response } from 'express';
import {
  CreateSessionHandler,
  DeleteSessionHandler,
  GetUserSessionHandler,
} from '../controllers/Session.Controller';
import creatUserHandler from '../controllers/User.Controller';
import requireUser from '../middlewares/requireUser';
import validate from '../middlewares/validateResource';
import CreateSessionSchema from '../schema/Session.Schema';
import creatUserSchema from '../schema/User.Schema';

function userRoutes(app: Express) {
  app.get('/getall', (req: Request, res: Response) => {
    res.sendStatus(200);
  });

  app.post('/api/users', validate(creatUserSchema), creatUserHandler);

  app.post(
    '/api/sessions',
    validate(CreateSessionSchema),
    CreateSessionHandler,
  );

  app.get('/api/sessions', requireUser, GetUserSessionHandler);

  app.delete('/api/sessions', requireUser, DeleteSessionHandler);
}

export default userRoutes;
