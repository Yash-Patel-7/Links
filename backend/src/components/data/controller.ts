import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { DataManager } from '~/db';
import { DataResponse, DataResponseSchema } from '~/types';

export class DataController {
  private static _dataController = new DataController();

  private constructor() {}

  public static get = (): DataController => {
    return DataController._dataController;
  };

  public read = async (
    _req: Request,
    res: Response<DataResponse>,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _next: NextFunction,
  ) => {
    res.status(StatusCodes.OK).json(await DataManager.fetchData());
  };

  public update = async (
    req: Request,
    res: Response<void>,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _next: NextFunction,
  ) => {
    await DataManager.updateData(await DataResponseSchema.parseAsync(req.body));
    res.status(StatusCodes.NO_CONTENT).send();
  };
}

export const dataController = DataController.get();
