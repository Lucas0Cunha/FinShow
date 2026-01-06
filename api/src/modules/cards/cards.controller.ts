import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Request
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CardsService } from './cards.service';
import { CreateCardDTO } from './dtos/create-card.dto';
import { UpdateCardDTO } from './dtos/update-card.dto';
import { Card } from './entities/card.entity';

@ApiTags('cards')
@Controller('cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @ApiOperation({ summary: 'Create a new card' })
  @ApiBody({ type: CreateCardDTO })
  @ApiResponse({ type: Card, status: HttpStatus.CREATED })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(
    @Body() payload: CreateCardDTO,
    @Request() request
  ): Promise<Card> {
    return await this.cardsService.create(payload, request.user.id);
  }

  @ApiOperation({ summary: 'List cards' })
  @ApiResponse({ type: [Card], status: HttpStatus.OK })
  @Get()
  async findAll(@Request() request): Promise<Card[]> {
    return await this.cardsService.findAll(request.user.id);
  }

  @ApiOperation({ summary: 'Get card by id' })
  @ApiResponse({ type: Card, status: HttpStatus.OK })
  @Get(':id')
  async findOne(@Param('id') id: string, @Request() request): Promise<Card> {
    return await this.cardsService.findOne(id, request.user.id);
  }

  @ApiOperation({ summary: 'Update a card' })
  @ApiBody({ type: UpdateCardDTO })
  @ApiResponse({ type: Card, status: HttpStatus.OK })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() payload: UpdateCardDTO,
    @Request() request
  ): Promise<Card> {
    return await this.cardsService.update(id, payload, request.user.id);
  }

  @ApiOperation({ summary: 'Soft delete a card (sets deletedAt)' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async remove(@Param('id') id: string, @Request() request): Promise<void> {
    return await this.cardsService.softDelete(id, request.user.id);
  }
}
