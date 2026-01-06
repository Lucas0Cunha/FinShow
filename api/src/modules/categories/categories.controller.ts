import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CategoriesService } from './categories.service';
import { CreateCategoryDTO } from './dtos/create-category.dto';
import { Category } from './entities/category.entity';

@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @ApiOperation({ summary: 'Create a new category' })
  @ApiBody({ type: CreateCategoryDTO })
  @ApiResponse({ type: Category, status: HttpStatus.CREATED })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(
    @Body() payload: CreateCategoryDTO,
    @Request() request: any
  ): Promise<Category> {
    return this.categoriesService.create(payload, request.user.id);
  }

  @ApiOperation({ summary: 'List all categories for authenticated user' })
  @ApiResponse({ type: [Category], status: HttpStatus.OK })
  @HttpCode(HttpStatus.OK)
  @Get()
  async findAll(@Request() request: any): Promise<Category[]> {
    return this.categoriesService.findAll(request.user.id);
  }
}
