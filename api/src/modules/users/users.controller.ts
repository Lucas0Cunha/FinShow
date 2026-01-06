import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { Public } from '@/modules/auth/decorators/public.decorator';

import { CreateUserDTO } from './dtos/create-user.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Create a new user' })
  @ApiBody({
    type: CreateUserDTO,
    description: 'Payload to create a new user'
  })
  @ApiResponse({
    type: User,
    description: 'Creates a new user'
  })
  @Public()
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(
    @Body() payload: CreateUserDTO
  ): Promise<Omit<User, 'passwordHash'>> {
    return await this.usersService.create(payload);
  }
}
