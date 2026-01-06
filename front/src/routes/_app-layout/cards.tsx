import { createFileRoute } from '@tanstack/react-router';

import { Cards } from '@/pages/app/cards/page';

export const Route = createFileRoute('/_app-layout/cards')({
  component: Cards,
});
