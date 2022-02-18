import express from 'express';
import config from 'config';
import Database from './utils/Database';
import logger from './utils/logger';
import userRoutes from './api/routers/User.Route';

const port = config.get<number>('port');
const app = express();

app.listen(port, async () => {
  logger.info(`Your app is running on http://localhost:${port}`);

  await Database();

  userRoutes(app);
});
