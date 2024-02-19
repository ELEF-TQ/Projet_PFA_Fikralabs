import { MongooseModule } from '@nestjs/mongoose';
import { ServicesModule } from './services/services.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PompistesModule } from './pompistes/pompistes.module';
import { AdminModule } from './admin/admin.module';
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { IdValidationMiddleware } from './middlewares/IdValidation.middleware';



@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: ".env",
    isGlobal: true
  }),
    MongooseModule.forRoot(`${process.env.DB_TYPE}://${process.env.HOST_NAME}/${process.env.DB_NAME}`),
    ServicesModule, AuthModule, UsersModule, PompistesModule, AdminModule],
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
