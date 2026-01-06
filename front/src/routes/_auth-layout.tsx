import { createFileRoute } from '@tanstack/react-router';

import { AuthLayout } from '@/pages/auth/auth-layout';

export const Route = createFileRoute('/_auth-layout')({
  component: AuthLayout,
});
