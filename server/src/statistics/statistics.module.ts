import { Module } from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { StatisticsController } from './statistics.controller';
import { AdminModule } from 'src/admin/admin.module';
import { ClientsModule } from 'src/clients/clients.module';
import { ConversionsModule } from 'src/conversions/conversions.module';
import { CouponsModule } from 'src/coupons/coupons.module';
import { PompistesModule } from 'src/pompistes/pompistes.module';
import { ReviewsModule } from 'src/reviews/reviews.module';
import { ServicesModule } from 'src/services/services.module';

@Module({
  imports: [AdminModule, ClientsModule, ConversionsModule, CouponsModule, PompistesModule, ReviewsModule, ServicesModule],
  controllers: [StatisticsController],
  providers: [StatisticsService],
})
export class StatisticsModule {}
