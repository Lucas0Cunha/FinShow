import { useMutation, useQuery } from '@tanstack/react-query';

import type { CreateCardData } from '@/pages/app/cards/validators';
import { CardsService } from '@/services/cards';
import type {
  CardsCreateResponse,
  CardsListResponse,
} from '@/services/cards/types';

import { queryClient } from './config';
import type { MutationOptions, QueryOptions } from './config/types';

export class CardsQuery {
  static readonly resource = 'cards';

  static list(options?: QueryOptions<CardsListResponse>) {
    return useQuery({
      ...options,
      queryKey: [CardsQuery.resource],
      queryFn: async () => {
        return await CardsService.list();
      },
    });
  }

  static create(
    options?: MutationOptions<CreateCardData, CardsCreateResponse>,
  ) {
    return useMutation({
      ...options,
      mutationKey: [`${CardsQuery.resource}:create`],
      mutationFn: async (data: CreateCardData) => {
        return await CardsService.create(data);
      },
      onSuccess: (...args) => {
        queryClient.invalidateQueries({ queryKey: [CardsQuery.resource] });
        options?.onSuccess?.(...args);
      },
    });
  }

  static deactivate(options?: MutationOptions<string, void>) {
    return useMutation({
      ...options,
      mutationKey: [`${CardsQuery.resource}:deactivate`],
      mutationFn: async (cardId: string) => {
        return await CardsService.deactivate(cardId);
      },
      onSuccess: (...args) => {
        queryClient.invalidateQueries({ queryKey: [CardsQuery.resource] });
        options?.onSuccess?.(...args);
      },
    });
  }
}
