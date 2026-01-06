import { useState } from 'react';
import { toast } from 'sonner';

import { TransactionsQuery } from '@/queries/transactions';

import { CreateTransactionDrawer } from './components/create-transaction-drawer';
import { ExpensesByCategoryChart } from './components/expenses-by-category-chart';
import { FilterTransactionsDrawer } from './components/filter-transactions-drawer';
import { TransactionsSummaryCards } from './components/transactions-summary-cards';
import { useTransactionFilters } from './hooks/use-transaction-filters';
import { TransactionsTable } from './table';
import type { FilterTransactionsData } from './validators';

export function TransactionsPage() {
  const [createDrawerOpen, setCreateDrawerOpen] = useState(false);
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [filters, setFilters] = useTransactionFilters();

  const { data: transactions = [], isLoading } =
    TransactionsQuery.list(filters);

  const { mutate: deleteTransaction, isPending: isDeleting } =
    TransactionsQuery.delete({
      onSuccess: () => {
        toast.success('Transaction deleted successfully');
      },
      onError: () => {
        toast.error('Failed to delete transaction');
      },
    });

  const handleFiltersSubmit = (data: FilterTransactionsData) => {
    setFilters({
      startDate: data.startDate || null,
      endDate: data.endDate || null,
      categoryId: data.categoryId || null,
    });
  };

  const handleDelete = (transactionId: string) => {
    deleteTransaction(transactionId);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Transactions</h1>
        <div className="flex gap-2">
          <FilterTransactionsDrawer
            open={filterDrawerOpen}
            onOpenChange={setFilterDrawerOpen}
            onSubmit={handleFiltersSubmit}
            defaultValues={{
              startDate: filters.startDate ?? undefined,
              endDate: filters.endDate ?? undefined,
              categoryId: filters.categoryId ?? undefined,
            }}
          />
          <CreateTransactionDrawer
            open={createDrawerOpen}
            onOpenChange={setCreateDrawerOpen}
          />
        </div>
      </div>

      <TransactionsSummaryCards transactions={transactions} />

      <ExpensesByCategoryChart transactions={transactions} />

      <TransactionsTable
        data={transactions}
        onDelete={handleDelete}
        isDeleting={isDeleting}
        isLoading={isLoading}
      />
    </div>
  );
}
