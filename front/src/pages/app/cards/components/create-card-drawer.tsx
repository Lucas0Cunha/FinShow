import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';

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
import { CardFlag, CardFlagLabels } from '@/services/cards/types';

import { type CreateCardData, createCardSchema } from '../validators';

type CreateCardDrawerProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: CreateCardData) => void;
  isPending: boolean;
};

export function CreateCardDrawer({
  open,
  onOpenChange,
  onSubmit,
  isPending,
}: CreateCardDrawerProps) {
  const form = useForm<CreateCardData>({
    defaultValues: {
      name: '',
      finalNumbers: '',
      flag: undefined,
    },
    resolver: zodResolver(createCardSchema),
  });

  const handleSubmit = (data: CreateCardData) => {
    onSubmit(data);
    form.reset();
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerTrigger asChild>
        <Button>New Card</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Add New Card</DrawerTitle>
          <DrawerDescription>
            Enter the card details below to add it to your account.
          </DrawerDescription>
        </DrawerHeader>
        <div className="flex flex-col justify-between mx-auto w-full max-w-xl max-h-[calc(100vh-80px)] overflow-y-auto p-4">
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="px-4"
            noValidate
          >
            <FieldGroup>
              <Controller
                control={form.control}
                name="name"
                render={({ field }) => (
                  <Field>
                    <FieldLabel htmlFor="name">Card Name</FieldLabel>
                    <Input
                      id="name"
                      type="text"
                      placeholder="My Credit Card"
                      {...field}
                    />
                    <FieldError>
                      {form.formState.errors.name?.message}
                    </FieldError>
                  </Field>
                )}
              />
              <Controller
                control={form.control}
                name="finalNumbers"
                render={({ field }) => (
                  <Field>
                    <FieldLabel htmlFor="finalNumbers">
                      Last 4 Digits
                    </FieldLabel>
                    <Input
                      id="finalNumbers"
                      type="text"
                      placeholder="1234"
                      maxLength={4}
                      {...field}
                    />
                    <FieldError>
                      {form.formState.errors.finalNumbers?.message}
                    </FieldError>
                  </Field>
                )}
              />
              <Controller
                control={form.control}
                name="flag"
                render={({ field }) => (
                  <Field>
                    <FieldLabel htmlFor="flag">Card Flag</FieldLabel>
                    <NativeSelect
                      id="flag"
                      className="w-full"
                      value={field.value ?? ''}
                      onChange={(e) =>
                        field.onChange(e.target.value as CardFlag)
                      }
                    >
                      <NativeSelectOption value="" disabled>
                        Select a flag
                      </NativeSelectOption>
                      {Object.values(CardFlag).map((flag) => (
                        <NativeSelectOption key={flag} value={flag}>
                          {CardFlagLabels[flag]}
                        </NativeSelectOption>
                      ))}
                    </NativeSelect>
                    <FieldError>
                      {form.formState.errors.flag?.message}
                    </FieldError>
                  </Field>
                )}
              />
            </FieldGroup>
          </form>
          <DrawerFooter className="mt-8 p-0">
            <Button
              type="button"
              onClick={form.handleSubmit(handleSubmit)}
              disabled={isPending}
            >
              {isPending && <Spinner />} Add Card
            </Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
