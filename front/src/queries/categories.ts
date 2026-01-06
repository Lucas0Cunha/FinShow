import { useQuery } from '@tanstack/react-query';

import { CategoriesService } from '@/services/categories';
import type { CategoriesListResponse } from '@/services/categories/types';

import type { QueryOptions } from './config/types';

export class CategoriesQuery {
  static readonly resource = 'categories';

  static list(options?: QueryOptions<CategoriesListResponse>) {
    return useQuery({
      ...options,
      queryKey: [CategoriesQuery.resource],
      queryFn: async () => {
        return await CategoriesService.list();
      },
    });
  }
}
