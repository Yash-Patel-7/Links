import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ZodError, ZodType } from 'zod/v4';
import { errorConstants } from '~/constants';
import { RequestProperties, ZodErrorResponse } from '~/types';

export const match =
  (property: RequestProperties, schema: ZodType) =>
  async (req: Request, res: Response<ZodErrorResponse>, next: NextFunction) => {
    try {
      req[property] = await schema.parseAsync(req[property]);
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        res.status(StatusCodes.BAD_REQUEST).json({
          message: errorConstants.MESSAGE.INVALID,
          issues: err.issues,
        });
      } else {
        next(err);
      }
    }
  };
