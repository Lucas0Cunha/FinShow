import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import type { Card as CardType } from '@/services/cards/types';
import { CardFlagLabels } from '@/services/cards/types';

type CardItemProps = {
  card: CardType;
  onDeactivate: (cardId: string) => void;
  isDeactivating: boolean;
};

export function CardItem({
  card,
  onDeactivate,
  isDeactivating,
}: CardItemProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{card.name}</CardTitle>
        <CardDescription>**** **** **** {card.finalNumbers}</CardDescription>
      </CardHeader>
      <CardContent className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">
          {CardFlagLabels[card.flag]}
        </span>
        <AlertDialog>
          <AlertDialogTrigger
            render={
              <Button variant="destructive" size="sm" disabled={isDeactivating}>
                Deactivate
              </Button>
            }
          />
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Deactivate Card</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to deactivate "{card.name}"? This action
                cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => onDeactivate(card._id)}>
                Deactivate
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardContent>
    </Card>
  );
}
