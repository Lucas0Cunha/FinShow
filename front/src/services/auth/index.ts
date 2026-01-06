import { apiClient } from '..';
import type { AuthSignInRequest, AuthSignInResponse } from './types';

export class AuthService {
  static async signIn(payload: AuthSignInRequest): Promise<AuthSignInResponse> {
    const { data } = await apiClient.post<AuthSignInResponse>(
      '/auth/signin',
      payload,
    );

    return data;
  }
}
