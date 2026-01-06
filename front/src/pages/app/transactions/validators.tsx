import { z } from 'zod';

import { TransactionType } from '@/services/transactions/types';

export const createTransactionSchema = z
  .object({
    description: z.string().min(1, 'Description is required'),
    amount: z.number().positive('Amount must be greater than 0'),
    type: z.enum([TransactionType.INCOME, TransactionType.EXPENSE]),
    date: z.string().min(1, 'Date is required'),
    category: z.string().optional(),
    cardId: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.type === TransactionType.EXPENSE && !data.category) {
        return false;
      }
      return true;
    },
    {
      message: 'Category is required for expenses',
      path: ['category'],
    },
  );

export type CreateTransactionData = z.infer<typeof createTransactionSchema>;

export const filterTransactionsSchema = z.object({
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  categoryId: z.string().optional(),
});

export type FilterTransactionsData = z.infer<typeof filterTransactionsSchema>;
