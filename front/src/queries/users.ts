import { useMutation } from '@tanstack/react-query';

import type { RegisterData } from '@/pages/auth/register/validators';
import { UsersService } from '@/services/users';
import type { UsersCreateResponse } from '@/services/users/types';

import type { MutationOptions } from './config/types';

export class UsersQuery {
  static readonly resource = 'users';

  static create(options?: MutationOptions<RegisterData, UsersCreateResponse>) {
    return useMutation({
      ...options,
      mutationKey: [`${UsersQuery.resource}:create`],
      mutationFn: async (data: RegisterData) => {
        return await UsersService.create(data);
      },
    });
  }
}
