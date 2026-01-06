import {
  Controller,
  type ControllerProps,
  type FieldValues,
  type Path,
} from 'react-hook-form';

import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import {
  NativeSelect,
  NativeSelectOption,
} from '@/components/ui/native-select';
import { CardsQuery } from '@/queries/cards';

interface CardFieldProps<T extends FieldValues> {
  label: string;
  name: Path<T>;
  control: ControllerProps<T>['control'];
  error?: string;
  isLoading?: boolean;
}

export function CardField<T extends FieldValues>({
  label,
  name,
  control,
  error,
  isLoading,
}: CardFieldProps<T>) {
  const { data: cards = [] } = CardsQuery.list();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <Field>
          <FieldLabel>{label}</FieldLabel>
          <NativeSelect {...field} disabled={isLoading || cards.length === 0}>
            <NativeSelectOption value="">
              Select a card (optional)
            </NativeSelectOption>
            {cards.map((card) => (
              <NativeSelectOption key={card._id} value={card._id}>
                {card.name} - {card.finalNumbers}
              </NativeSelectOption>
            ))}
          </NativeSelect>
          <FieldError>{error}</FieldError>
        </Field>
      )}
    />
  );
}
