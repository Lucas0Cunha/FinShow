import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from '@/components/ui/empty';
import { Spinner } from '@/components/ui/spinner';
import type { Card } from '@/services/cards/types';

import { CardItem } from './card-item';

type CardsListProps = {
  cards: Card[] | undefined;
  isLoading: boolean;
  onDeactivate: (cardId: string) => void;
  isDeactivating: boolean;
};

export function CardsList({
  cards,
  isLoading,
  onDeactivate,
  isDeactivating,
}: CardsListProps) {
  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <Spinner />
      </div>
    );
  }

  if (!cards?.length) {
    return (
      <Empty>
        <EmptyHeader>
          <EmptyTitle>No cards yet</EmptyTitle>
          <EmptyDescription>
            Add your first card to get started
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {cards.map((card) => (
        <CardItem
          key={card._id}
          card={card}
          onDeactivate={onDeactivate}
          isDeactivating={isDeactivating}
        />
      ))}
    </div>
  );
}
