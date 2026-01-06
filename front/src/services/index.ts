import axios from 'axios';

import { getLocalStorageItem } from '@/lib/local-storage';

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

type AuthStore = {
  currentUser?: {
    token?: string;
  };
};

apiClient.interceptors.request.use((config) => {
  const storage = getLocalStorageItem<AuthStore>(['current_user']);

  if (storage?.state?.currentUser?.token) {
    config.headers.Authorization = `Bearer ${storage.state.currentUser.token}`;
  }

  return config;
});
