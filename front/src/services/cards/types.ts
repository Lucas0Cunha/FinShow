export enum CardFlag {
  AMERICAN_EXPRESS = 'american-express',
  DINERS_CLUB = 'diners-club',
  DISCOVER = 'discover',
  ELO = 'elo',
  HIPERCARD = 'hipercard',
  HIPER = 'hiper',
  JCB = 'jcb',
  MAESTRO = 'maestro',
  MASTERCARD = 'mastercard',
  MIR = 'mir',
  UNIONPAY = 'unionpay',
  VISA = 'visa',
  VERVE = 'verve',
  OTHER = 'other',
}

export const CardFlagLabels: Record<CardFlag, string> = {
  [CardFlag.AMERICAN_EXPRESS]: 'American Express',
  [CardFlag.DINERS_CLUB]: 'Diners Club',
  [CardFlag.DISCOVER]: 'Discover',
  [CardFlag.ELO]: 'Elo',
  [CardFlag.HIPERCARD]: 'Hipercard',
  [CardFlag.HIPER]: 'Hiper',
  [CardFlag.JCB]: 'JCB',
  [CardFlag.MAESTRO]: 'Maestro',
  [CardFlag.MASTERCARD]: 'Mastercard',
  [CardFlag.MIR]: 'Mir',
  [CardFlag.UNIONPAY]: 'UnionPay',
  [CardFlag.VISA]: 'Visa',
  [CardFlag.VERVE]: 'Verve',
  [CardFlag.OTHER]: 'Other',
};

export type Card = {
  _id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  name: string;
  finalNumbers: string;
  userId: string;
  flag: CardFlag;
};

export type CardsCreateRequest = {
  name: string;
  finalNumbers: string;
  flag: CardFlag;
};

export type CardsCreateResponse = Card;

export type CardsListResponse = Card[];
