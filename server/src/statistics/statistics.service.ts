import { Injectable } from '@nestjs/common';
import { AdminService } from 'src/admin/admin.service';
import { ClientsService } from 'src/clients/clients.service';
import { ConversionsService } from 'src/conversions/conversions.service';
import { CouponsService } from 'src/coupons/coupons.service';
import { PompistesService } from 'src/pompistes/pompistes.service';
import { ReviewsService } from 'src/reviews/reviews.service';
import { ServicesService } from 'src/services/services.service';

@Injectable()
export class StatisticsService {
    constructor(
        private readonly adminService: AdminService,
        private readonly clientsService: ClientsService,
        private readonly conversionsService: ConversionsService,
        private readonly couponsService: CouponsService,
        private readonly pompistesService: PompistesService,
        private readonly reviewsService: ReviewsService,
        private readonly servicesService: ServicesService,
    ) {}

    async countDocs(): Promise<any> {
        const adminCount = await this.adminService.countAdmins();
        const clientsCount = await this.clientsService.countClients();
        const conversionsCount = await this.conversionsService.countConversions();
        const couponsCount = await this.couponsService.countCoupons();
        const pompistesCount = await this.pompistesService.countPompistes();
        const reviewsCount = await this.reviewsService.countReviews();
        const servicesCount = await this.servicesService.countServices();
    
        return {
          adminCount,
          clientsCount,
          conversionsCount,
          couponsCount,
          pompistesCount,
          reviewsCount,
          servicesCount,
        };
    }
}
