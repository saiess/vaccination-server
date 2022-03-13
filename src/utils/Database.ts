import mongoose from 'mongoose';
import config from 'config';
import logger from './logger';

async function Database() {
  const dbUri = config.get<string>('dbUri');

  try {
    await mongoose.connect(dbUri);
    logger.info('connected');
  } catch (error) {
    logger.error('could not connect to DB');
    logger.error(error);
    process.exit(1);
  }
}

export default Database;
