import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { ClientsModule } from './clients/clients.module';
import { PompistesModule } from './pompistes/pompistes.module';
import { AdminModule } from './admin/admin.module';
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { IdValidationMiddleware } from './middlewares/IdValidation.middleware';
import { ReviewsModule } from './reviews/reviews.module';



@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: ".env",
    isGlobal: true
  }),
    MongooseModule.forRoot(`${process.env.DB_TYPE}://${process.env.HOST_NAME}/${process.env.DB_NAME}`),
     AuthModule, ClientsModule, PompistesModule, AdminModule, ReviewsModule],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(IdValidationMiddleware).forRoutes(
      {
        path: "/admins/:id",
        method: RequestMethod.GET
      },
      {
        path: "/admins/:id",
        method: RequestMethod.PATCH
      },
      {
        path: "/admins/:id",
        method: RequestMethod.DELETE
      },
      {
        path: "/users/:id",
        method: RequestMethod.GET
      },
      {
        path: "/users/:id",
        method: RequestMethod.PATCH
      },
      {
        path: "/users/:id",
        method: RequestMethod.DELETE
      }
    )
}
}
