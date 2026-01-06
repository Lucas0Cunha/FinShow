import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { buildStorageKey } from '@/lib/local-storage';

export type CurrentUserStore = {
  name: string;
  email: string;
  token: string;
};

export type CurrentUser = {
  currentUser: CurrentUserStore;
  setCurrentUser: (user: CurrentUserStore) => void;
};

const localStorageKey = buildStorageKey(['current_user']);

export const useCurrentUserStore = create(
  persist<CurrentUser>(
    (set) => ({
      currentUser: {} as CurrentUserStore,
      setCurrentUser: (currentUser: CurrentUserStore) => {
        set({ currentUser });
      },
    }),
    {
      name: localStorageKey,
    },
  ),
);
