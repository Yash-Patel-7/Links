import express from 'express';
import { AppServer, ServerConfig } from '~/types';

export const startServer = (
  port: number,
  config: ServerConfig = {},
): Promise<AppServer> => {
  config = {
    cors: {
      enable: true,
      origin: '*',
      methods: 'GET, POST, PUT, PATCH, DELETE, OPTIONS, HEAD',
      headers: 'Content-Type',
      ...config.cors,
    },
    json: {
      enable: true,
      ...config.json,
    },
    urlencoded: {
      enable: true,
      ...config.urlencoded,
    },
  };

  const cors = (): void => {
    app.use((_req, res, next) => {
      if (config.cors?.origin !== undefined)
        res.setHeader('Access-Control-Allow-Origin', config.cors.origin);
      if (config.cors?.methods !== undefined)
        res.setHeader('Access-Control-Allow-Methods', config.cors.methods);
      if (config.cors?.headers !== undefined)
        res.setHeader('Access-Control-Allow-Headers', config.cors.headers);
      next();
    });
  };

  const json = (): void => {
    app.use(express.json());
  };

  const urlencoded = (): void => {
    app.use(express.urlencoded({ extended: true }));
  };

  const app = express();

  if (config.cors?.enable === true) cors();
  if (config.json?.enable === true) json();
  if (config.urlencoded?.enable === true) urlencoded();

  return new Promise((resolve, reject) => {
    const server = app.listen(port, (err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve({ app, server });
    });
  });
};
