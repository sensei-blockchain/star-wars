import http from 'http';
import config from 'config';
import expressInit from './express';
import logger from './logger';

const start = () => {
  const port = config.get('port');

  const appStartMessage = () => {
    const env = process.env.NODE_ENV;
    logger.info(`App Name : ${config.app.title}`);
    logger.info(`Environment  : ${env || 'development'}`);
    logger.info(`App Port : ${port}`);
    logger.info(`Process Id : ${process.pid}`);
  };

  const app = expressInit();
  http.createServer(app).listen(port, appStartMessage);
};

export default start;
