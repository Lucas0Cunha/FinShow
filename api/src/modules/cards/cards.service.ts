import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, UpdateQuery } from 'mongoose';

import { CreateCardDTO } from './dtos/create-card.dto';
import { UpdateCardDTO } from './dtos/update-card.dto';
import { Card } from './entities/card.entity';

@Injectable()
export class CardsService {
  constructor(@InjectModel(Card.name) private cardModel: Model<Card>) {}

  private guard(userId: string, card: Card): void {
    if (card.userId.toString() !== userId) {
      throw new NotFoundException('Card not found');
    }
  }

  private async validateMutation(
    userId: string,
    card: Card,
    isCreation = false,
    excludeId?: string
  ) {
    if (!isCreation) {
      this.guard(userId, card);
    }

    const query: UpdateQuery<Card> = {
      userId,
      $or: [{ finalNumbers: card.finalNumbers }, { name: card.name }]
    };

    if (excludeId) {
      query._id = { $ne: excludeId };
    }

    const cardExists = await this.cardModel.findOne(query).exec();

    if (cardExists) {
      throw new UnprocessableEntityException(
        'Card with same name or final numbers already exists'
      );
    }
  }

  async create(payload: CreateCardDTO, userId: string): Promise<Card> {
    const card = new Card({ ...payload, userId });

    await this.validateMutation(userId, card, true);

    const cardModel = new this.cardModel(card);

    const created = await cardModel.save();

    const response = created.toJSON({ versionKey: false });

    return response;
  }

  async findAll(userId: string): Promise<Card[]> {
    return await this.cardModel
      .find({ userId, deletedAt: { $exists: false, $eq: null } })
      .exec();
  }

  async findOne(id: string, userId: string): Promise<Card> {
    const card = await this.cardModel.findById(id).exec();

    if (!card || card.deletedAt) {
      throw new NotFoundException('Card not found');
    }

    this.guard(userId, card);

    return card;
  }

  async update(
    id: string,
    payload: UpdateCardDTO,
    userId: string
  ): Promise<Card> {
    const findCard = await this.cardModel.findById(id).exec();

    if (!findCard || findCard.deletedAt) {
      throw new NotFoundException('Card not found');
    }

    const card = new Card({ ...payload, userId });

    await this.validateMutation(userId, card, false, id);

    const updatedCard = await this.cardModel
      .findByIdAndUpdate(id, payload, { new: true })
      .exec();

    return updatedCard!.toJSON({ versionKey: false });
  }

  async softDelete(id: string, userId: string): Promise<void> {
    const card = await this.cardModel.findById(id).exec();

    if (!card || card.deletedAt) {
      throw new NotFoundException('Card not found');
    }

    this.guard(userId, card);

    card.deletedAt = new Date();

    await this.cardModel.findByIdAndUpdate(id, card).exec();
  }
}
