import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from '@tanstack/react-router';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';
import { UsersQuery } from '@/queries/users';

import { type RegisterData, registerSchema } from './validators';

export function Register() {
  const form = useForm<RegisterData>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    resolver: zodResolver(registerSchema),
  });

  const navigate = useNavigate();

  const { mutate, isPending } = UsersQuery.create({
    onSuccess: () => {
      toast.success('Account created successfully!');

      navigate({ to: '/login' });
    },
  });

  const handleSubmit = (data: RegisterData) => {
    mutate(data);
  };

  return (
    <form
      onSubmit={form.handleSubmit(handleSubmit)}
      className="flex flex-col gap-6"
      noValidate
    >
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Create your account</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Fill in the details below to create your account
          </p>
        </div>
        <Controller
          control={form.control}
          name="name"
          render={({ field }) => (
            <Field>
              <FieldLabel htmlFor="name">Name</FieldLabel>
              <Input
                id="name"
                type="text"
                placeholder="Your full name"
                {...field}
              />
              <FieldError>{form.formState.errors.name?.message}</FieldError>
            </Field>
          )}
        />
        <Controller
          control={form.control}
          name="email"
          render={({ field }) => (
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                inputMode="email"
                type="email"
                placeholder="example@email.com"
                {...field}
              />
              <FieldError>{form.formState.errors.email?.message}</FieldError>
            </Field>
          )}
        />
        <Controller
          control={form.control}
          name="password"
          render={({ field }) => (
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input
                id="password"
                type="password"
                placeholder="********"
                {...field}
              />
              <FieldError>{form.formState.errors.password?.message}</FieldError>
            </Field>
          )}
        />
        <Controller
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <Field>
              <FieldLabel htmlFor="confirmPassword">
                Confirm Password
              </FieldLabel>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="********"
                {...field}
              />
              <FieldError>
                {form.formState.errors.confirmPassword?.message}
              </FieldError>
            </Field>
          )}
        />
        <Field>
          <Button type="submit" disabled={isPending}>
            {isPending && <Spinner />} Create account
          </Button>
        </Field>
        <Field>
          <p className="text-muted-foreground text-center text-sm">
            Already have an account?{' '}
            <Link to="/login" className="text-primary underline">
              Login
            </Link>
          </p>
        </Field>
      </FieldGroup>
    </form>
  );
}
