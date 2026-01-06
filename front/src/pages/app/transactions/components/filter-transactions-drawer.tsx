import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
  Drawer,
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
import { CategoriesQuery } from '@/queries/categories';

import {
  type FilterTransactionsData,
  filterTransactionsSchema,
} from '../validators';

interface FilterTransactionsDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: FilterTransactionsData) => void;
  defaultValues: FilterTransactionsData;
}

export function FilterTransactionsDrawer({
  open,
  onOpenChange,
  defaultValues,
  onSubmit,
}: FilterTransactionsDrawerProps) {
  const { data: categories = [] } = CategoriesQuery.list();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FilterTransactionsData>({
    resolver: zodResolver(filterTransactionsSchema),
    defaultValues,
  });

  const onFormSubmit = handleSubmit((data) => {
    onOpenChange(false);
    onSubmit(data);
  });

  const handleClear = () => {
    onOpenChange(false);

    reset({
      startDate: undefined,
      endDate: undefined,
      categoryId: undefined,
    });

    onSubmit({
      startDate: undefined,
      endDate: undefined,
      categoryId: undefined,
    });
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerTrigger asChild>
        <Button variant="outline">Filters</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Filter Transactions</DrawerTitle>
          <DrawerDescription>
            Filter transactions by date range or category
          </DrawerDescription>
        </DrawerHeader>
        <div className="flex flex-col justify-between mx-auto w-full max-w-xl max-h-[calc(100vh-200px)] overflow-y-auto">
          <form>
            <FieldGroup>
              <Controller
                control={control}
                name="startDate"
                render={({ field }) => (
                  <Field data-invalid={!!errors?.startDate}>
                    <FieldLabel>Start Date</FieldLabel>
                    <Input
                      {...field}
                      type="date"
                      placeholder="Select start date"
                    />
                    <FieldError>{errors?.startDate?.message}</FieldError>
                  </Field>
                )}
              />

              <Controller
                control={control}
                name="endDate"
                render={({ field }) => (
                  <Field data-invalid={!!errors?.endDate}>
                    <FieldLabel>End Date</FieldLabel>
                    <Input
                      {...field}
                      type="date"
                      placeholder="Select end date"
                    />
                    <FieldError>{errors?.endDate?.message}</FieldError>
                  </Field>
                )}
              />

              <Controller
                control={control}
                name="categoryId"
                render={({ field }) => (
                  <Field data-invalid={!!errors?.categoryId}>
                    <FieldLabel>Category (Optional)</FieldLabel>
                    <select
                      {...field}
                      className="w-full px-3 py-2 border border-input rounded-md bg-background"
                    >
                      <option value="">All Categories</option>
                      {categories.map((category) => (
                        <option key={category._id} value={category._id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                    <FieldError>{errors?.categoryId?.message}</FieldError>
                  </Field>
                )}
              />
            </FieldGroup>
          </form>
          <DrawerFooter className="mt-8">
            <Button onClick={onFormSubmit}>Apply Filters</Button>
            <Button type="button" variant="outline" onClick={handleClear}>
              Clear Filters
            </Button>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
