import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { ClientsModule } from 'src/clients/clients.module';
import { PompistesModule } from 'src/pompistes/pompistes.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Review, ReviewSchema } from './schemas/review.schema';

@Module({
  imports: [MongooseModule.forFeature([
    {
      name: Review.name,
      schema: ReviewSchema
    }
  ]),
  ClientsModule , PompistesModule],
  controllers: [ReviewsController],
  providers: [ReviewsService],
})
export class ReviewsModule {}
