import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { AuthService, SignIn } from './auth.service';
import { Public } from './decorators/public.decorator';
import { SignInDTO } from './dtos/signin.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Sign in a user' })
  @ApiBody({
    type: SignInDTO,
    description: 'Payload to sign in a user'
  })
  @ApiResponse({
    type: SignIn,
    description: 'Signs in a user'
  })
  @Public()
  @HttpCode(HttpStatus.CREATED)
  @Post('signin')
  async signIn(@Body() payload: SignInDTO): Promise<SignIn> {
    return await this.authService.signIn(payload);
  }
}
