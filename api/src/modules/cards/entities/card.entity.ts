import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import mongoose, { HydratedDocument } from 'mongoose';

import { BaseEntity, BaseEntityProps } from '@/shared/entities/base.entity';

import { User } from '../../users/entities/user.entity';
import { CardFlag } from '../enums/card-flag.enum';

export type CardProps = {
  name: string;
  finalNumbers: string;
  flag: CardFlag;
  userId: string;
} & BaseEntityProps;

@Schema({ timestamps: true, versionKey: false, collection: 'cards' })
export class Card extends BaseEntity {
  @ApiProperty()
  @Prop({ type: String, required: true })
  name: string;

  @ApiProperty()
  @Prop({ type: String, required: true, unique: true })
  finalNumbers: string;

  @ApiProperty()
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: User.name
  })
  userId: string;

  @ApiProperty()
  @Prop({ type: String, enum: CardFlag, required: true })
  flag: CardFlag;

  constructor(props: CardProps) {
    super(props);
    this.name = props.name;
    this.finalNumbers = props.finalNumbers;
    this.flag = props.flag;
    this.userId = new mongoose.Types.ObjectId(props.userId).toString();
  }
}

export type CardDocument = HydratedDocument<Card>;
export const CardSchema = SchemaFactory.createForClass(Card);

CardSchema.index({ userId: 1, finalNumbers: 1 }, { unique: true });
CardSchema.index({ userId: 1, name: 1 }, { unique: true });
