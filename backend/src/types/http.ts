import * as z from 'zod/v4';
import { httpConstants } from '~/constants';

export type RequestProperties =
  (typeof httpConstants.REQUEST)[keyof typeof httpConstants.REQUEST];

export const RequestPropertiesSchema = z.enum([
  ...Object.values(httpConstants.REQUEST),
] as const);
