import { MutationCache, QueryCache, QueryClient } from '@tanstack/react-query';
import { type AxiosError, isAxiosError } from 'axios';
import { toast } from 'sonner';

import type { APIErrorResponseData } from '@/services/types';

import type { QueryOptions } from './types';

function handleAPIError(error: AxiosError<APIErrorResponseData>) {
  // if (
  //   typeof window !== 'undefined' &&
  //   error.response?.status === 401 &&
  //   window?.location.pathname !== '/login'
  // ) {
  //   localStorage.clear();
  //   window?.location.replace('/login');

  //   return;
  // }

  toast.error(error.response?.data?.message || 'An unexpected error occurred');
}

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: async (error, query) => {
      if (
        isAxiosError<APIErrorResponseData>(error) &&
        !query.meta?.ignoreError
      ) {
        handleAPIError(error);
      }
    },
  }),
  mutationCache: new MutationCache({
    onError: async (error) => {
      if (isAxiosError<APIErrorResponseData>(error)) {
        handleAPIError(error);
      }
    },
  }),
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

export function enableQuery<T>(
  query: () => Promise<T>,
  options?: QueryOptions<T>,
  fallbackQuery?: () => T,
) {
  return options?.enabled === false ? fallbackQuery : query;
}
