import { Test, TestingModule } from '@nestjs/testing';
import { AdminService } from '../../admin/admin.service';
import { ClientsService } from '../../clients/clients.service';
import { ConversionsService } from '../../conversions/conversions.service';
import { PompistesService } from '../../pompistes/pompistes.service';
import { ReviewsService } from '../../reviews/reviews.service';
import { StatisticsController } from '../../statistics/statistics.controller';
import { StatisticsService } from '../../statistics/statistics.service';
import * as request from 'supertest';

describe('StatisticsController', () => {
  let app;
  let statisticsService: StatisticsService;
  
  // Mock des services nécessaires
  const mockAdminService = { countAdmins: jest.fn().mockResolvedValue(10) };
  const mockClientsService = { countClients: jest.fn().mockResolvedValue(20) };
  const mockConversionsService = { countConversions: jest.fn().mockResolvedValue(30) };
  const mockPompistesService = { countPompistes: jest.fn().mockResolvedValue(40) };
  const mockReviewsService = { countReviews: jest.fn().mockResolvedValue(50) };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StatisticsController],
      providers: [
        StatisticsService,
        { provide: AdminService, useValue: mockAdminService },
        { provide: ClientsService, useValue: mockClientsService },
        { provide: ConversionsService, useValue: mockConversionsService },
        { provide: PompistesService, useValue: mockPompistesService },
        { provide: ReviewsService, useValue: mockReviewsService },
      ],
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });

  it('should return statistics count', async () => {
    const response = await request(app.getHttpServer()).get('/statistics/countDocs');
    
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      adminCount: 10,
      clientsCount: 20,
      conversionsCount: 30,
      pompistesCount: 40,
      reviewsCount: 50,
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
