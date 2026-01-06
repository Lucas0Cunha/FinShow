import { from } from 'env-var';

import packageJson from '../../package.json';

const env = from(process.env);

export class Environment {
  static readonly app = {
    environment: env.get('NODE_ENV').default('development').asString(),
    domain: env.get('APP_DOMAIN').required().asString(),
    port: env.get('APP_PORT').default('4000').asPortNumber(),
    mongodbUri: env.get('MONGODB_URI').required().asString(),
    jwtSecret: env.get('JWT_SECRET').required().asString(),
    jwtExpiresIn: env.get('JWT_EXPIRES_IN_DAYS').required().asIntPositive()
  };

  static readonly packageInfo = {
    name: packageJson.name,
    description: packageJson.description,
    version: packageJson.version
  };
}
