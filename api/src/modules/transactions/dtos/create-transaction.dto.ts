import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min
} from 'class-validator';

import { IsMongoObjectId } from '../../../shared/validators/is-mongo-object-id.validator';
import { TransactionType } from '../enums/transaction-type.enum';

export class CreateTransactionDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  amount: number;

  @ApiProperty({ enum: TransactionType })
  @IsEnum(TransactionType)
  @IsNotEmpty()
  type: TransactionType;

  @ApiProperty()
  @IsDateString()
  @IsNotEmpty()
  date: string;

  @ApiProperty({
    required: false,
    description: 'Category ID or category name to create/use'
  })
  @IsString()
  @IsOptional()
  category?: string;

  @ApiProperty({ required: false })
  @IsMongoObjectId()
  @IsOptional()
  cardId?: string;
}
