import { QueryClientProvider } from '@tanstack/react-query';
import { createRootRoute, Outlet } from '@tanstack/react-router';
import { NuqsAdapter } from 'nuqs/adapters/react';

import { Toaster } from '@/components/ui/sonner';
import { useAuthGuard } from '@/hooks/use-auth-guard';
import { queryClient } from '@/queries/config';

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  useAuthGuard();

  return (
    <QueryClientProvider client={queryClient}>
      <NuqsAdapter>
        <Outlet />
        <Toaster position="top-right" />
      </NuqsAdapter>
    </QueryClientProvider>
  );
}
