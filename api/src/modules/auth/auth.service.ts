import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import bcrypt from 'bcrypt';
import { Model } from 'mongoose';

import { User } from '../users/entities/user.entity';
import { SignInDTO } from './dtos/signin.dto';

export class SignIn {
  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  token: string;
}

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService
  ) {}
  async signIn({ email, password }: SignInDTO): Promise<SignIn> {
    const user = await this.userModel.findOne({ email }).exec();

    if (!user) {
      throw new UnauthorizedException({ message: 'Invalid credentials' });
    }

    const isValidPassword = await bcrypt.compare(password, user.passwordHash);

    if (!isValidPassword) {
      throw new UnauthorizedException({ message: 'Invalid credentials' });
    }

    const payload = { sub: user._id };

    const token = await this.jwtService.signAsync(payload);

    const response: SignIn = {
      name: user.name,
      email: user.email,
      token
    };

    return response;
  }
}
