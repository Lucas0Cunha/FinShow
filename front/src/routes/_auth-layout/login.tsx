import { createFileRoute } from '@tanstack/react-router';

import { Login } from '@/pages/auth/login/page';

export const Route = createFileRoute('/_auth-layout/login')({
  component: Login,
});
