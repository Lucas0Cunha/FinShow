import {
  Controller,
  type ControllerProps,
  type FieldValues,
  type Path,
} from 'react-hook-form';

import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { CategoriesQuery } from '@/queries/categories';

interface CategoryFieldProps<T extends FieldValues> {
  label: string;
  name: Path<T>;
  control: ControllerProps<T>['control'];
  error?: string;
  isLoading?: boolean;
}

export function CategoryField<T extends FieldValues>({
  label,
  name,
  control,
  error,
  isLoading,
}: CategoryFieldProps<T>) {
  CategoriesQuery.list();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <Field>
          <FieldLabel>{label}</FieldLabel>
          <Input
            {...field}
            placeholder="Enter a category"
            disabled={isLoading}
          />
          {error && <FieldError>{error}</FieldError>}
        </Field>
      )}
    />
  );
}
