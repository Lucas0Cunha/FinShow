import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CardsService } from '../cards/cards.service';
import { CategoriesService } from '../categories/categories.service';
import { Category } from '../categories/entities/category.entity';
import { CreateTransactionDTO } from './dtos/create-transaction.dto';
import { ListTransactionsDTO } from './dtos/list-transactions.dto';
import { Transaction } from './entities/transaction.entity';
import { TransactionType } from './enums/transaction-type.enum';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectModel(Transaction.name)
    private transactionModel: Model<Transaction>,
    @InjectModel(Category.name)
    private categoryModel: Model<Category>,
    private cardsService: CardsService,
    private categoriesService: CategoriesService
  ) {}

  private guard(userId: string, transaction: Transaction): void {
    if (transaction.userId.toString() !== userId) {
      throw new NotFoundException('Transaction not found');
    }
  }

  private validateTransaction(
    payload: CreateTransactionDTO,
    categoryId?: string
  ): void {
    const type = payload.type;
    const cardId = payload.cardId;

    if (type === TransactionType.EXPENSE && !categoryId && !payload.category) {
      throw new UnprocessableEntityException(
        'Category is required for expense transactions'
      );
    }

    if (type === TransactionType.INCOME && payload.category) {
      throw new UnprocessableEntityException(
        'Income transactions cannot have a category'
      );
    }

    if (type === TransactionType.INCOME && cardId) {
      throw new UnprocessableEntityException(
        'Income transactions cannot have a card'
      );
    }
  }

  async create(
    payload: CreateTransactionDTO,
    userId: string
  ): Promise<Transaction> {
    let categoryId: string | undefined;
    if (payload.type === TransactionType.EXPENSE && payload.category) {
      const existingCategory = await this.categoryModel
        .findOne({
          userId,
          name: { $regex: `^${payload.category}$`, $options: 'i' }
        })
        .exec();

      if (existingCategory) {
        categoryId = existingCategory._id.toString();
      } else {
        const newCategory = await this.categoriesService.create(
          { name: payload.category },
          userId
        );

        if (newCategory) {
          categoryId = newCategory._id;
        }
      }
    }

    if (payload.cardId) {
      await this.cardsService.findOne(payload.cardId, userId);
    }

    this.validateTransaction(payload, categoryId);

    const dateObj = new Date(payload.date);
    const offsetMs = -3 * 60 * 60 * 1000;
    const dateWithTimezone = new Date(dateObj.getTime() - offsetMs);

    const transaction = new Transaction({
      description: payload.description,
      amount: payload.amount,
      type: payload.type,
      date: dateWithTimezone,
      userId,
      categoryId,
      cardId: payload.cardId
    });

    const transactionModel = new this.transactionModel(transaction);
    const created = await transactionModel.save();

    return created.toJSON({ versionKey: false });
  }

  async findAll(
    userId: string,
    filters?: ListTransactionsDTO
  ): Promise<Transaction[]> {
    const query: any = { userId };

    const startDate = filters?.startDate
      ? new Date(filters.startDate)
      : new Date();
    const endDate = filters?.endDate ? new Date(filters.endDate) : new Date();

    if (!filters?.startDate && !filters?.endDate) {
      startDate.setDate(startDate.getDate() - 30);
    }

    if (filters?.startDate || filters?.endDate) {
      query.date = {};
      if (filters?.startDate) {
        query.date.$gte = startDate;
      }
      if (filters?.endDate) {
        endDate.setHours(23, 59, 59, 999);
        query.date.$lte = endDate;
      }
    } else {
      query.date = { $gte: startDate, $lte: endDate };
    }

    if (filters?.categoryId) {
      query.categoryId = filters.categoryId;
    }

    const transactions = await this.transactionModel
      .find(query)
      .populate('categoryId')
      .populate('cardId')
      .sort({ date: -1 })
      .exec();

    return transactions.map(t => t.toJSON({ versionKey: false }));
  }

  async findOne(id: string, userId: string): Promise<Transaction> {
    const transaction = await this.transactionModel
      .findById(id)
      .populate('categoryId')
      .populate('cardId')
      .exec();

    if (!transaction) {
      throw new NotFoundException('Transaction not found');
    }

    this.guard(userId, transaction);

    return transaction.toJSON({ versionKey: false });
  }

  async delete(id: string, userId: string): Promise<void> {
    const transaction = await this.transactionModel.findById(id).exec();

    if (!transaction) {
      throw new NotFoundException('Transaction not found');
    }

    this.guard(userId, transaction);

    await this.transactionModel.findByIdAndDelete(id).exec();
  }
}
