export function buildStorageKey(keys: string[]): string {
  const baseKey = import.meta.env.VITE_STORAGE_KEY;

  return [baseKey, ...keys].join(':');
}

type StoreStorage<T> = {
  state: T;
};

export function getLocalStorageItem<T = unknown>(
  key: string[],
): StoreStorage<T> | null {
  const storageKey = buildStorageKey(key);

  const content = localStorage.getItem(storageKey);

  if (!content) {
    return null;
  }

  return JSON.parse(content) as unknown as StoreStorage<T>;
}
