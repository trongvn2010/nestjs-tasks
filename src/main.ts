import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import * as config from 'config';

async function bootstrap() {
  const logger = new Logger('bootstrap');
  const app = await NestFactory.create(AppModule);
  const serverConfig = config.get('server');
  console.log(serverConfig);

  if (process.env.NODE_ENV === 'development') {
    app.enableCors();
  } else {
    app.enableCors({ origin: serverConfig.origin });
    logger.log(`Accepting request from orgin ${serverConfig.origin}`);
  }

  const port = process.env.PORT || serverConfig.port;

  await app.listen(port);
  logger.log(`Application listening on port ${port}`);
}
bootstrap();
