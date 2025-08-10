import * as z from 'zod/v4';

export interface Data {
  unchecked: Record<string, string>;
  checked: Record<string, string>;
  links: Record<string, string>;
}

export const DataSchema = z.strictObject({
  unchecked: z.record(z.string(), z.string()),
  checked: z.record(z.string(), z.string()),
  links: z.record(z.string(), z.string()),
});

export type DataResponse = Omit<Data, 'links'>;

export const DataResponseSchema = DataSchema.omit({
  links: true,
});
