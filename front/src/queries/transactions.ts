import { useMutation, useQuery } from '@tanstack/react-query';

import type { FilterTransactionsData } from '@/pages/app/transactions/validators';
import { TransactionsService } from '@/services/transactions';
import type {
  CreateTransactionRequest,
  CreateTransactionResponse,
  TransactionsListResponse,
} from '@/services/transactions/types';

import { queryClient } from './config';
import type { MutationOptions, QueryOptions } from './config/types';

export class TransactionsQuery {
  static readonly resource = 'transactions';

  static list(
    params: FilterTransactionsData = {},
    options?: QueryOptions<TransactionsListResponse>,
  ) {
    return useQuery({
      ...options,
      queryKey: [TransactionsQuery.resource, params],
      queryFn: async () => {
        return await TransactionsService.list(params);
      },
    });
  }

  static create(
    options?: MutationOptions<
      CreateTransactionRequest,
      CreateTransactionResponse
    >,
  ) {
    return useMutation({
      ...options,
      mutationKey: [`${TransactionsQuery.resource}:create`],
      mutationFn: async (data: CreateTransactionRequest) => {
        return await TransactionsService.create(data);
      },
      onSuccess: (...args) => {
        queryClient.invalidateQueries({
          queryKey: [TransactionsQuery.resource],
        });
        options?.onSuccess?.(...args);
      },
    });
  }

  static delete(options?: MutationOptions<string, void>) {
    return useMutation({
      ...options,
      mutationKey: [`${TransactionsQuery.resource}:delete`],
      mutationFn: async (transactionId: string) => {
        return await TransactionsService.delete(transactionId);
      },
      onSuccess: (...args) => {
        queryClient.invalidateQueries({
          queryKey: [TransactionsQuery.resource],
        });
        options?.onSuccess?.(...args);
      },
    });
  }
}
