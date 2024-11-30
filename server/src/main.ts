import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import seedPermissions from 'migration/seed-data';
import { Connection } from 'mongoose';
import { getConnectionToken } from '@nestjs/mongoose';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // const connection = app.get<Connection>(getConnectionToken());
  // await seedPermissions(connection); 

  app.enableCors();
  await app.listen(3001);
}
bootstrap();
