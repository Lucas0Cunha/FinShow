import type {
  UseMutationOptions,
  UseQueryOptions,
} from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import type { APIErrorResponseData } from '@/services/types';

export type MutationOptions<
  RequestData = unknown,
  ResponseData = unknown,
> = Omit<
  UseMutationOptions<
    ResponseData,
    AxiosError<APIErrorResponseData>,
    RequestData
  >,
  'mutationFn' | 'mutationKey'
>;

export type QueryOptions<ResponseData = unknown> = Omit<
  UseQueryOptions<ResponseData, AxiosError<APIErrorResponseData>>,
  'queryKey' | 'queryFn'
>;
