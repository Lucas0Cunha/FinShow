import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';

import { CreateUserDTO } from './dtos/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(payload: CreateUserDTO): Promise<Omit<User, 'passwordHash'>> {
    const { password, ...data } = payload;

    const userAlreadyExists = await this.userModel
      .findOne({ email: data.email })
      .exec();

    if (userAlreadyExists) {
      throw new UnprocessableEntityException('User already exists');
    }

    const passwordHash = await bcrypt.hash(password, 8);

    const user = new User({ ...data, passwordHash });
    const userModel = new this.userModel(user);

    const userCreated = await userModel.save();

    const { passwordHash: _, ...response } = userCreated.toJSON({
      versionKey: false
    });

    return response;
  }

  async findOneByEmail(email: string): Promise<User> {
    const user = await this.userModel.findOne({ email }).exec();

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }
}
