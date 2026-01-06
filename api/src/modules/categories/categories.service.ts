import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateCategoryDTO } from './dtos/create-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name)
    private categoryModel: Model<Category>
  ) {}

  private guard(userId: string, category: Category): void {
    if (category.userId.toString() !== userId) {
      throw new NotFoundException('Category not found');
    }
  }

  async create(payload: CreateCategoryDTO, userId: string): Promise<Category> {
    const existingCategory = await this.categoryModel
      .findOne({
        userId,
        name: { $regex: `^${payload.name}$`, $options: 'i' }
      })
      .exec();

    if (existingCategory) {
      throw new UnprocessableEntityException(
        'Category with this name already exists'
      );
    }

    const category = new Category({
      ...payload,
      userId
    });

    const categoryModel = new this.categoryModel(category);
    const created = await categoryModel.save();

    return created.toJSON({ versionKey: false });
  }

  async findAll(userId: string): Promise<Category[]> {
    const categories = await this.categoryModel
      .find({ userId })
      .sort({ name: 1 })
      .exec();

    return categories.map(c => c.toJSON({ versionKey: false }));
  }

  async findOneByName(name: string, userId: string): Promise<Category | null> {
    return this.categoryModel
      .findOne({
        userId,
        name: { $regex: `^${name}$`, $options: 'i' }
      })
      .exec();
  }

  async findOneById(id: string, userId: string): Promise<Category> {
    const category = await this.categoryModel.findById(id).exec();

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    this.guard(userId, category);

    return category.toJSON({ versionKey: false });
  }
}
