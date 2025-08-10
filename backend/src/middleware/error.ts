import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { errorConstants } from '~/constants';
import { ErrorResponse } from '~/types';

export const lastErrorHandler = (
  err: unknown,
  _req: Request,
  res: Response<ErrorResponse>,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction,
) => {
  if (err instanceof Error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: err.message,
    });
  } else {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: errorConstants.MESSAGE.UNEXPECTED,
    });
  }
};
