import { apiClient } from '..';
import type {
  CardsCreateRequest,
  CardsCreateResponse,
  CardsListResponse,
} from './types';

export class CardsService {
  static async create(
    payload: CardsCreateRequest,
  ): Promise<CardsCreateResponse> {
    const { data } = await apiClient.post<CardsCreateResponse>(
      '/cards',
      payload,
    );

    return data;
  }

  static async list(): Promise<CardsListResponse> {
    const { data } = await apiClient.get<CardsListResponse>('/cards');

    return data;
  }

  static async deactivate(cardId: string): Promise<void> {
    await apiClient.delete(`/cards/${cardId}`);
  }
}
