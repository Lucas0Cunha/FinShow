import { useNavigate, useRouterState } from '@tanstack/react-router';
import { useEffect } from 'react';

import { useCurrentUserStore } from '@/stores/use-current-user';

const PUBLIC_ROUTES = ['/login', '/register'];

export function useAuthGuard() {
  const navigate = useNavigate();
  const { currentUser } = useCurrentUserStore();
  const location = useRouterState({ select: (s) => s.location });

  const isAuthenticated = !!currentUser?.token;
  const isPublicRoute = PUBLIC_ROUTES.includes(location.pathname);

  useEffect(() => {
    if (isAuthenticated && isPublicRoute) {
      navigate({ to: '/' });
      return;
    }

    if (!isAuthenticated && !isPublicRoute) {
      navigate({ to: '/login' });
    }
  }, [isAuthenticated, isPublicRoute, navigate]);

  return { isAuthenticated, isPublicRoute };
}
