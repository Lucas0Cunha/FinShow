import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString, Length } from 'class-validator';

import { CardFlag } from '../enums/card-flag.enum';

export class CreateCardDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(4, 4)
  finalNumbers: string;

  @ApiProperty({ enum: CardFlag })
  @IsEnum(CardFlag)
  flag: CardFlag;
}
