import { apiClient } from '..';
import type { CategoriesListResponse } from './types';

export class CategoriesService {
  static async list(): Promise<CategoriesListResponse> {
    const { data } = await apiClient.get<CategoriesListResponse>('/categories');

    return data;
  }
}
