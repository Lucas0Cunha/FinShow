import { createFileRoute } from '@tanstack/react-router';

import { Register } from '@/pages/auth/register/page';

export const Route = createFileRoute('/_auth-layout/register')({
  component: Register,
});
