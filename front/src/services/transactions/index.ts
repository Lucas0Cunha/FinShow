import { apiClient } from '..';
import type {
  CreateTransactionRequest,
  CreateTransactionResponse,
  TransactionFiltersRequest,
  TransactionsListResponse,
} from './types';

export class TransactionsService {
  static async list(
    filters?: TransactionFiltersRequest,
  ): Promise<TransactionsListResponse> {
    const queryParams = new URLSearchParams();

    if (filters?.startDate) {
      queryParams.append('startDate', filters.startDate);
    }

    if (filters?.endDate) {
      queryParams.append('endDate', filters.endDate);
    }

    if (filters?.categoryId) {
      queryParams.append('categoryId', filters.categoryId);
    }

    const queryString = queryParams.toString()
      ? `?${queryParams.toString()}`
      : '';

    const { data } = await apiClient.get<TransactionsListResponse>(
      `/transactions${queryString}`,
    );

    return data;
  }

  static async create(
    payload: CreateTransactionRequest,
  ): Promise<CreateTransactionResponse> {
    const { data } = await apiClient.post<CreateTransactionResponse>(
      '/transactions',
      payload,
    );

    return data;
  }

  static async delete(transactionId: string): Promise<void> {
    await apiClient.delete(`/transactions/${transactionId}`);
  }
}
