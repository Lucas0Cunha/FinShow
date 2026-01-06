import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from '@tanstack/react-router';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';
import { AuthQuery } from '@/queries/auth';
import { useCurrentUserStore } from '@/stores/use-current-user';

import { type LoginData, loginSchema } from './validators';

export function Login() {
  const form = useForm<LoginData>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(loginSchema),
  });

  const navigate = useNavigate();

  const { setCurrentUser } = useCurrentUserStore();

  const { mutate, isPending } = AuthQuery.signIn({
    onSuccess: (data) => {
      setCurrentUser(data);

      toast.success('Logged in successfully!');

      navigate({ to: '/' });
    },
  });

  const handleSubmit = (data: LoginData) => {
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
          <h1 className="text-2xl font-bold">Login to your account</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Enter your email below to login to your account
          </p>
        </div>
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
                inputMode="text"
                type="password"
                placeholder="********"
                {...field}
              />
              <FieldError>{form.formState.errors.password?.message}</FieldError>
            </Field>
          )}
        />
        <Field>
          <Button type="submit" disabled={isPending}>
            {isPending && <Spinner />} Login
          </Button>
        </Field>
        <Field>
          <FieldDescription className="text-center">
            Don&apos;t have an account?{' '}
            <Link
              to="/register"
              className="underline underline-offset-4 text-primary"
            >
              Register
            </Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}
