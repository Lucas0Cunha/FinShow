import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  Request
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CreateTransactionDTO } from './dtos/create-transaction.dto';
import { ListTransactionsDTO } from './dtos/list-transactions.dto';
import { Transaction } from './entities/transaction.entity';
import { TransactionsService } from './transactions.service';

@ApiTags('transactions')
@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @ApiOperation({ summary: 'Create a new transaction' })
  @ApiBody({ type: CreateTransactionDTO })
  @ApiResponse({ type: Transaction, status: HttpStatus.CREATED })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(
    @Body() payload: CreateTransactionDTO,
    @Request() request: any
  ): Promise<Transaction> {
    return this.transactionsService.create(payload, request.user.id);
  }

  @ApiOperation({
    summary:
      'List all transactions for authenticated user (default: last 30 days)'
  })
  @ApiResponse({ type: [Transaction], status: HttpStatus.OK })
  @HttpCode(HttpStatus.OK)
  @Get()
  async findAll(
    @Query() filters: ListTransactionsDTO,
    @Request() request: any
  ): Promise<Transaction[]> {
    return this.transactionsService.findAll(request.user.id, filters);
  }

  @ApiOperation({ summary: 'Get transaction by ID' })
  @ApiResponse({ type: Transaction, status: HttpStatus.OK })
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @Request() request: any
  ): Promise<Transaction> {
    return this.transactionsService.findOne(id, request.user.id);
  }

  @ApiOperation({ summary: 'Delete transaction' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async delete(
    @Param('id') id: string,
    @Request() request: any
  ): Promise<void> {
    return this.transactionsService.delete(id, request.user.id);
  }
}
