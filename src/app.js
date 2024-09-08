import bluebird from 'bluebird';
import express from 'express';
import logger from 'morgan';

global.Promise = bluebird;

const app = express();

app.use(logger('dev'));
app.use(
  express.json({
    limit: '50mb',
    verify: (req, res, buf, encoding) => {
      req.rawBody = buf;
    }
  })
);

process.on('unhandledRejection', err => console.log('unhandledRejection', err.message));

import init from './initialize/index.js';
await init(app);

const port = process.env.PORT || 2000;

const server = app.listen(port, () => console.log(`Notifications server is running on port ${port}`));

process.on('SIGINT', () => {
  console.log(`Killing app on port ${port}`);

  server.close(async () => {
    await Promise.delay(5000);
    console.log(`Killed app on port ${port} successfully. Bye!`);
    process.exit(0);
  });
});