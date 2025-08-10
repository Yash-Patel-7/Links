import { Router } from 'express';
import { dataRouter } from '~/components';

export const apiRouter = () => {
  const router = Router();

  router.use('/data', dataRouter());

  return router;
};
