import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import mongoose, { HydratedDocument } from 'mongoose';

import { BaseEntity, BaseEntityProps } from '@/shared/entities/base.entity';

import { User } from '../../users/entities/user.entity';

export type CategoryProps = {
  name: string;
  userId: string;
} & BaseEntityProps;

@Schema({ timestamps: true, versionKey: false, collection: 'categories' })
export class Category extends BaseEntity {
  @ApiProperty()
  @Prop({ type: String, required: true })
  name: string;

  @ApiProperty()
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: User.name
  })
  userId: string;

  constructor(props: CategoryProps) {
    super(props);
    this.name = props.name;
    this.userId = new mongoose.Types.ObjectId(props.userId).toString();
  }
}

export type CategoryDocument = HydratedDocument<Category>;
export const CategorySchema = SchemaFactory.createForClass(Category);

CategorySchema.index(
  { userId: 1, name: 1 },
  { unique: true, collation: { locale: 'en', strength: 2 } }
);
