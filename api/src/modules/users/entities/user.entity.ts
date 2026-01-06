import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument } from 'mongoose';

import { BaseEntity, BaseEntityProps } from '@/shared/entities/base.entity';

export type UserProps = {
  name: string;
  email: string;
  passwordHash: string;
} & BaseEntityProps;

@Schema({ timestamps: true, versionKey: false, collection: 'users' })
export class User extends BaseEntity {
  @ApiProperty()
  @Prop({ type: String, required: true })
  name: string;

  @ApiProperty()
  @Prop({ type: String, required: true, unique: true })
  email: string;

  @ApiProperty()
  @Prop({ type: String, required: true })
  passwordHash: string;

  constructor(props: UserProps) {
    super(props);
    this.name = props.name;
    this.email = props.email;
    this.passwordHash = props.passwordHash;
  }
}

export type UserDocument = HydratedDocument<User>;
export const UserSchema = SchemaFactory.createForClass(User);
