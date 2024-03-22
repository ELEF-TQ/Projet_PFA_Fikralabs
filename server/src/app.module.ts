import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { ClientsModule } from './clients/clients.module';
import { PompistesModule } from './pompistes/pompistes.module';
import { AdminModule } from './admin/admin.module';
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { IdValidationMiddleware } from './middlewares/IdValidation.middleware';
import { ReviewsModule } from './reviews/reviews.module';
import { ConversionsModule } from './conversions/conversions.module';
import { CouponsModule } from './coupons/coupons.module';
import { MulterModule } from '@nestjs/platform-express';
import { GeolocationModule } from './geolocation/geolocation.module';
import { AuthorizationModule } from './authorization/authorization.module';
import { ResetPasswordModule } from './reset-password/reset-password.module';




@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: ".env",
    isGlobal: true
  }),
  MulterModule.register({
    dest:'/uploads'
  }),
    MongooseModule.forRoot(`${process.env.DB_TYPE}://${process.env.HOST_NAME}/${process.env.DB_NAME}`),
     AuthModule, ClientsModule, PompistesModule, AdminModule, ReviewsModule, ConversionsModule, CouponsModule, GeolocationModule, AuthorizationModule, ResetPasswordModule],
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
        path: "/clients/:id",
        method: RequestMethod.GET
      },
      {
        path: "/clients/:id",
        method: RequestMethod.PATCH
      },
      {
        path: "/clients/:id",
        method: RequestMethod.DELETE
      },{
        path: "/conversions/:id",
        method: RequestMethod.POST
      }
    )
}
}
