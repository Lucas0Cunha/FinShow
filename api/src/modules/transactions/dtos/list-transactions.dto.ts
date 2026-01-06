import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsOptional, IsString } from 'class-validator';

export class ListTransactionsDTO {
  @ApiProperty({
    required: false,
    description: 'Filter by start date (ISO 8601 format)',
    example: '2026-01-01'
  })
  @IsDateString()
  @IsOptional()
  startDate?: string;

  @ApiProperty({
    required: false,
    description: 'Filter by end date (ISO 8601 format)',
    example: '2026-01-31'
  })
  @IsDateString()
  @IsOptional()
  endDate?: string;

  @ApiProperty({
    required: false,
    description: 'Filter by category ID'
  })
  @IsString()
  @IsOptional()
  categoryId?: string;
}
