import config from 'config';
import Database from './utils/Database';
import logger from './utils/logger';
import createServer from './utils/server';

const port = config.get<number>('port');
const app = createServer();

app.listen(port, async () => {
  logger.info(`Your app is running on http://localhost:${port}`);

  await Database();
});
