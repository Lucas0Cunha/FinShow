import { parseAsString, useQueryStates } from 'nuqs';

export function useTransactionFilters() {
  return useQueryStates(
    {
      startDate: parseAsString.withDefault(''),
      endDate: parseAsString.withDefault(''),
      categoryId: parseAsString.withDefault(''),
    },
    { history: 'push', shallow: false },
  );
}
