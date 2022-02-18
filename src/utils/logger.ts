import logger from 'pino';
import dayjs from 'dayjs';

const Log = logger({
  prettyPrint: true,
  base: {
    pid: false,
  },
  timestamp: () => `,"time"${dayjs().format()}`,
});

export default Log;
