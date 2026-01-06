import { useState } from 'react';
import { toast } from 'sonner';

import { CardsQuery } from '@/queries/cards';

import { CardsList } from './components/cards-list';
import { CreateCardDrawer } from './components/create-card-drawer';
import type { CreateCardData } from './validators';

export function Cards() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const { data: cards, isLoading } = CardsQuery.list();

  const { mutate: createCard, isPending: isCreating } = CardsQuery.create({
    onSuccess: () => {
      toast.success('Card created successfully!');
      setDrawerOpen(false);
    },
  });

  const { mutate: deactivateCard, isPending: isDeactivating } =
    CardsQuery.deactivate({
      onSuccess: () => {
        toast.success('Card deactivated successfully!');
      },
    });

  const handleCreateCard = (data: CreateCardData) => {
    createCard(data);
  };

  const handleDeactivate = (cardId: string) => {
    deactivateCard(cardId);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Cards</h1>
        <CreateCardDrawer
          open={drawerOpen}
          onOpenChange={setDrawerOpen}
          onSubmit={handleCreateCard}
          isPending={isCreating}
        />
      </div>

      <CardsList
        cards={cards}
        isLoading={isLoading}
        onDeactivate={handleDeactivate}
        isDeactivating={isDeactivating}
      />
    </div>
  );
}
