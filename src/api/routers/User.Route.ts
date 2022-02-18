import { Express, Request, Response } from 'express';
import creatUserHandler from '../controllers/User.Controller';

function userRoutes(app: Express) {
  app.get('/getall', (req: Request, res: Response) => {
    res.sendStatus(200);
  });

  app.post('/api/users', creatUserHandler);
}

export default userRoutes;
