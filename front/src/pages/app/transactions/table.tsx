import { Delete } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { format } from 'date-fns';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from '@/components/ui/empty';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import type { Transaction } from '@/services/transactions/types';
import { TransactionType } from '@/services/transactions/types';

interface TransactionsTableProps {
  data: Transaction[];
  onDelete: (transactionId: string) => void;
  isDeleting: boolean;
  isLoading: boolean;
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(amount / 100);
};

const getTransactionTypeLabel = (type: TransactionType) => {
  return type === TransactionType.INCOME ? 'Income' : 'Expense';
};

const getTransactionTypeColor = (type: TransactionType) => {
  return type === TransactionType.INCOME ? 'text-green-600' : 'text-red-600';
};

export function TransactionsTable({
  data,
  onDelete,
  isDeleting,
  isLoading,
}: TransactionsTableProps) {
  if (isLoading) {
    return <div className="text-center py-8">Loading transactions...</div>;
  }

  if (data.length === 0) {
    return (
      <Empty>
        <EmptyHeader>
          <EmptyTitle>No transactions yet</EmptyTitle>
          <EmptyDescription>
            Start by creating your first transaction
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    );
  }

  return (
    <div className="w-full">
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Card</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length > 0
              ? data.map((transaction) => (
                  <TableRow key={transaction._id}>
                    <TableCell className="font-medium">
                      {transaction.description}
                    </TableCell>
                    <TableCell className="text-right">
                      {formatCurrency(transaction.amount)}
                    </TableCell>
                    <TableCell
                      className={`capitalize ${getTransactionTypeColor(
                        transaction.type,
                      )}`}
                    >
                      {getTransactionTypeLabel(transaction.type)}
                    </TableCell>
                    <TableCell>{transaction.categoryId?.name || '-'}</TableCell>
                    <TableCell>
                      {transaction.cardId ? (
                        <span className="text-sm">
                          {transaction.cardId.name} ****{' '}
                          {transaction.cardId.finalNumbers}
                        </span>
                      ) : (
                        '-'
                      )}
                    </TableCell>
                    <TableCell>
                      {format(new Date(transaction.date), 'dd/MM/yyyy')}
                    </TableCell>
                    <TableCell className="text-right">
                      <AlertDialog>
                        <AlertDialogTrigger
                          render={
                            <Button
                              variant="destructive"
                              size="icon"
                              disabled={isDeleting}
                            >
                              <HugeiconsIcon icon={Delete} />
                            </Button>
                          }
                        />
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Delete transaction
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete this transaction?
                              This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => onDelete(transaction._id)}
                              disabled={isDeleting}
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </TableCell>
                  </TableRow>
                ))
              : null}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
