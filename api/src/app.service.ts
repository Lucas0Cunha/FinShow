import { Injectable } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

import { Environment } from './config/environment.config';

export class Alive {
  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  version: string;
}

@Injectable()
export class AppService {
  alive(): Alive {
    const { name, description, version } = Environment.packageInfo;

    return {
      name,
      description,
      version
    };
  }
}
