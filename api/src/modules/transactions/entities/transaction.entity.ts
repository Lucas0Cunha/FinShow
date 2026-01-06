import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import mongoose, { HydratedDocument } from 'mongoose';

import { BaseEntity, BaseEntityProps } from '@/shared/entities/base.entity';

import { Card } from '../../cards/entities/card.entity';
import { Category } from '../../categories/entities/category.entity';
import { User } from '../../users/entities/user.entity';
import { TransactionType } from '../enums/transaction-type.enum';

export type TransactionProps = {
  description: string;
  amount: number;
  type: TransactionType;
  date: Date;
  userId: string;
  categoryId?: string;
  cardId?: string;
} & BaseEntityProps;

@Schema({ timestamps: true, versionKey: false, collection: 'transactions' })
export class Transaction extends BaseEntity {
  @ApiProperty()
  @Prop({ type: String, required: true })
  description: string;

  @ApiProperty()
  @Prop({ type: Number, required: true, min: 0 })
  amount: number;

  @ApiProperty({ enum: TransactionType })
  @Prop({ type: String, enum: TransactionType, required: true })
  type: TransactionType;

  @ApiProperty()
  @Prop({ type: Date, required: true })
  date: Date;

  @ApiProperty()
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: User.name
  })
  userId: string;

  @ApiProperty({
    required: false,
    description:
      'Categoria da transação. Preenchida com os dados completos em operações de listagem e GET'
  })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Category.name })
  categoryId?: string | Category;

  @ApiProperty({
    required: false,
    description:
      'Cartão associado à transação. Preenchido com os dados completos em operações de listagem e GET'
  })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Card.name })
  cardId?: string | Card;

  constructor(props: TransactionProps) {
    super(props);
    this.description = props.description;
    this.amount = props.amount;
    this.type = props.type;
    this.date = props.date;
    this.userId = new mongoose.Types.ObjectId(props.userId).toString();
    this.categoryId = props.categoryId
      ? new mongoose.Types.ObjectId(props.categoryId).toString()
      : undefined;
    this.cardId = props.cardId
      ? new mongoose.Types.ObjectId(props.cardId).toString()
      : undefined;
  }
}

export type TransactionDocument = HydratedDocument<Transaction>;
export const TransactionSchema = SchemaFactory.createForClass(Transaction);
