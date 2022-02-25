import express from 'express';
import config from 'config';
import Database from './utils/Database';
import logger from './utils/logger';
import userRoutes from './api/routers/User.Route';
import deserializeUser from './api/middlewares/deserializeUser';
import regionRoutes from './api/routers/Region.Route';

const port = config.get<number>('port');
const app = express();

app.use(deserializeUser);
app.use(express.json());
app.listen(port, async () => {
  logger.info(`Your app is running on http://localhost:${port}`);

  await Database();

  userRoutes(app);
  regionRoutes(app);
});
