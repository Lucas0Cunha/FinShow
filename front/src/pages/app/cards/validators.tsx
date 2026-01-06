import z from 'zod';

import { CardFlag } from '@/services/cards/types';

export const createCardSchema = z.object({
  name: z.string().nonempty('Card name is required'),
  finalNumbers: z
    .string()
    .nonempty('Last 4 digits are required')
    .length(4, 'Must be exactly 4 digits')
    .regex(/^\d+$/, 'Must contain only numbers'),
  flag: z.nativeEnum(CardFlag, { message: 'Card flag is required' }),
});

export type CreateCardData = z.infer<typeof createCardSchema>;
