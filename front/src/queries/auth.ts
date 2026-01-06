import { useMutation } from '@tanstack/react-query';

import type { LoginData } from '@/pages/auth/login/validators';
import { AuthService } from '@/services/auth';
import type { AuthSignInResponse } from '@/services/auth/types';

import type { MutationOptions } from './config/types';

export class AuthQuery {
  static readonly resource = 'auth';

  static signIn(options?: MutationOptions<LoginData, AuthSignInResponse>) {
    return useMutation({
      ...options,
      mutationKey: [`${AuthQuery.resource}:sign-in`],
      mutationFn: async (data: LoginData) => {
        return await AuthService.signIn(data);
      },
    });
  }
}
