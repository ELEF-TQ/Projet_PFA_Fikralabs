import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import seedPermissions from 'migration/seed-data';
import { Connection } from 'mongoose';
import { getConnectionToken } from '@nestjs/mongoose';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // const connection = app.get<Connection>(getConnectionToken());
  // await seedPermissions(connection); 

  
  const config = new DocumentBuilder()
  .setTitle('Vivo Energy API')
  .setDescription('API testing')
  .setVersion('1.0')
  .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.enableCors();
  await app.listen(3001);
}
bootstrap();
