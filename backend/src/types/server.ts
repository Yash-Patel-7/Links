import express from 'express';
import http from 'http';
import * as z from 'zod/v4';

export interface AppServer {
  app: express.Express;
  server: http.Server;
}

export interface ServerConfig {
  cors?: {
    enable?: boolean;
    origin?: string;
    methods?: string;
    headers?: string;
  };
  json?: {
    enable?: boolean;
  };
  urlencoded?: {
    enable?: boolean;
  };
}

export const ServerConfigSchema = z.strictObject({
  cors: z
    .strictObject({
      enable: z.boolean().optional(),
      origin: z.string().optional(),
      methods: z.string().optional(),
      headers: z.string().optional(),
    })
    .optional(),
  json: z
    .strictObject({
      enable: z.boolean().optional(),
    })
    .optional(),
  urlencoded: z
    .strictObject({
      enable: z.boolean().optional(),
    })
    .optional(),
});
