import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
  NativeSelect,
  NativeSelectOption,
} from '@/components/ui/native-select';
import { Spinner } from '@/components/ui/spinner';
import { TransactionsQuery } from '@/queries/transactions';
import { TransactionType } from '@/services/transactions/types';

import {
  type CreateTransactionData,
  createTransactionSchema,
} from '../validators';
import { CardField } from './form-fields/card-field';
import { CategoryField } from './form-fields/category-field';

interface CreateTransactionDrawerProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function CreateTransactionDrawer({
  open,
  onOpenChange,
}: CreateTransactionDrawerProps) {
  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<CreateTransactionData>({
    resolver: zodResolver(createTransactionSchema),
    defaultValues: {
      description: '',
      amount: undefined,
      type: TransactionType.EXPENSE,
      date: (() => {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
      })(),
      category: '',
      cardId: '',
    },
  });

  const { mutate: createTransaction, isPending } = TransactionsQuery.create({
    onSuccess: () => {
      toast.success('Transaction created successfully');
      reset();
      onOpenChange?.(false);
    },
    onError: () => {
      toast.error('Failed to create transaction');
    },
  });

  const transactionType = watch('type');

  const onSubmit = (data: CreateTransactionData) => {
    const amount = Math.round(data.amount * 100);

    createTransaction({
      description: data.description,
      amount,
      type: data.type,
      date: data.date,
      category: data.category,
      cardId: data.cardId || undefined,
    });
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerTrigger asChild>
        <Button>New Transaction</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Add New Transaction</DrawerTitle>
          <DrawerDescription>
            Add a new transaction to your account
          </DrawerDescription>
        </DrawerHeader>
        <div className="flex flex-col justify-between mx-auto h-full w-full max-w-xl max-h-[calc(100vh-80px)] overflow-y-auto p-4">
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <FieldGroup>
              <Controller
                control={control}
                name="description"
                render={({ field }) => (
                  <Field>
                    <FieldLabel>Description</FieldLabel>
                    <Input
                      {...field}
                      placeholder="Enter transaction description"
                      disabled={isPending}
                    />

                    <FieldError>{errors?.description?.message}</FieldError>
                  </Field>
                )}
              />

              <Controller
                control={control}
                name="amount"
                render={({ field }) => (
                  <Field>
                    <FieldLabel>Amount</FieldLabel>
                    <Input
                      {...field}
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      disabled={isPending}
                      onChange={(e) =>
                        field.onChange(parseFloat(e.target.value))
                      }
                    />

                    <FieldError>{errors?.amount?.message}</FieldError>
                  </Field>
                )}
              />

              <Controller
                control={control}
                name="type"
                render={({ field }) => (
                  <Field>
                    <FieldLabel>Type</FieldLabel>
                    <NativeSelect {...field} disabled={isPending}>
                      <NativeSelectOption value={TransactionType.INCOME}>
                        Income
                      </NativeSelectOption>
                      <NativeSelectOption value={TransactionType.EXPENSE}>
                        Expense
                      </NativeSelectOption>
                    </NativeSelect>
                    <FieldError>{errors?.type?.message}</FieldError>
                  </Field>
                )}
              />

              <Controller
                control={control}
                name="date"
                render={({ field }) => (
                  <Field>
                    <FieldLabel>Date</FieldLabel>
                    <Input {...field} type="date" disabled={isPending} />
                    <FieldError>{errors?.date?.message}</FieldError>
                  </Field>
                )}
              />

              {transactionType === TransactionType.EXPENSE && (
                <>
                  <CategoryField
                    label="Category"
                    name="category"
                    control={control}
                    error={errors.category?.message}
                    isLoading={isPending}
                  />

                  <CardField
                    label="Card (Optional)"
                    name="cardId"
                    control={control}
                    error={errors.cardId?.message}
                    isLoading={isPending}
                  />
                </>
              )}
            </FieldGroup>
          </form>
          <DrawerFooter className="mt-8 p-0">
            <Button
              type="submit"
              disabled={isPending}
              onClick={handleSubmit(onSubmit)}
            >
              {isPending && <Spinner />} Add Transaction
            </Button>
            <DrawerClose asChild>
              <Button variant="outline" disabled={isPending}>
                Cancel
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
