import { createFileRoute } from '@tanstack/react-router';

import { AppLayout } from '@/pages/app/layout/page';

export const Route = createFileRoute('/_app-layout')({
  component: AppLayout,
});
