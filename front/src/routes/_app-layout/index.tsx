import { createFileRoute } from '@tanstack/react-router';

import { TransactionsPage } from '@/pages/app/transactions/page';

export const Route = createFileRoute('/_app-layout/')({
  component: Home,
});

function Home() {
  return (
    <div className="space-y-8">
      <TransactionsPage />
    </div>
  );
}
