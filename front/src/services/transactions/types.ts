export enum TransactionType {
  INCOME = 'income',
  EXPENSE = 'expense',
}

export interface Card {
  _id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  finalNumbers: string;
  userId: string;
  flag: string;
}

export interface Category {
  _id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  userId: string;
}

export interface Transaction {
  _id: string;
  createdAt: string;
  updatedAt: string;
  description: string;
  amount: number;
  type: TransactionType;
  date: string;
  userId: string;
  categoryId?: Category | null;
  cardId?: Card | null;
}

export type TransactionsListResponse = Transaction[];

export interface CreateTransactionRequest {
  description: string;
  amount: number;
  type: TransactionType;
  date: string;
  category?: string;
  cardId?: string;
}

export type CreateTransactionResponse = Transaction;

export type TransactionFiltersRequest = {
  endDate?: string;
  startDate?: string;
  categoryId?: string;
};
