import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { Alive, AppService } from './app.service';
import { Public } from './modules/auth/decorators/public.decorator';

@ApiTags('app')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({ summary: 'Get application information' })
  @ApiResponse({
    type: Alive,
    status: HttpStatus.OK,
    description: 'Returns application information'
  })
  @Public()
  @HttpCode(HttpStatus.OK)
  @Get()
  alive(): Alive {
    return this.appService.alive();
  }
}
