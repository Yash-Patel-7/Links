import * as z from 'zod/v4';
import { $ZodIssue } from 'zod/v4/core';

export interface ErrorResponse {
  message: string;
}

export const ErrorResponseSchema = z.strictObject({
  message: z.string(),
});

export type ZodErrorResponse = ErrorResponse & {
  issues: $ZodIssue[];
};
