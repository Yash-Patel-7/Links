import express from 'express';
import path from 'path';
import { apiRouter } from '~/api';
import { openUrl, startServer } from '~/lib';
import { lastErrorHandler } from '~/middleware';

const port: number = 5000;
const url: string = `http://localhost:${port.toString()}`;

const main = async () => {
  const { app } = await startServer(port);

  app.use(express.static(path.resolve(__dirname, 'build')));

  app.use('/api', apiRouter());

  app.use(lastErrorHandler);

  console.log(`Server is running on ${url}`);

  await openUrl(url);
};

const start = async () => {
  try {
    await main();
  } catch (error) {
    console.error('Error starting server: ', error);
    process.exit(1);
  }
};

void start();
