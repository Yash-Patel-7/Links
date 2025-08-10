import { Router } from 'express';
import { dataController } from '~/components';
import { httpConstants } from '~/constants';
import { match } from '~/middleware';
import { DataResponseSchema } from '~/types';

export const dataRouter = () => {
  const router = Router();

  router.get('/', dataController.read);

  router.post(
    '/',
    match(httpConstants.REQUEST.BODY, DataResponseSchema),
    dataController.update,
  );

  return router;
};
