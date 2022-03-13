import express from 'express';
import cors from 'cors';
import deserializeUser from '../api/middlewares/deserializeUser';
import userRoutes from '../api/routers/User.Route';
import centerRoutes from '../api/routers/Center.Route';

function createServer() {
  const app = express();

  app.use(deserializeUser);
  app.use(express.json());
  app.use(cors());

  userRoutes(app);
  centerRoutes(app);

  return app;
}

export default createServer;
