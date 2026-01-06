import { Prop } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type BaseEntityProps = {
  _id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
};

export class BaseEntity {
  @ApiProperty()
  _id?: string;

  @ApiProperty()
  @Prop({ type: Date })
  createdAt?: Date;

  @ApiProperty()
  @Prop({ type: Date })
  updatedAt?: Date;

  @ApiProperty()
  @Prop({ type: Date })
  deletedAt?: Date;

  constructor(props: BaseEntityProps) {
    this._id = props._id;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
    this.deletedAt = props.deletedAt;
  }
}
