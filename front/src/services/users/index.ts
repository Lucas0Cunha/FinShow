import { apiClient } from '..';
import type { UsersCreateRequest, UsersCreateResponse } from './types';

export class UsersService {
  static async create(
    payload: UsersCreateRequest,
  ): Promise<UsersCreateResponse> {
    const { data } = await apiClient.post<UsersCreateResponse>(
      '/users',
      payload,
    );

    return data;
  }
}
