import { Test, TestingModule } from '@nestjs/testing';
import { StatisticsService } from '../../statistics/statistics.service';
import { AdminService } from '../../admin/admin.service';
import { ClientsService } from '../../clients/clients.service';
import { ConversionsService } from '../../conversions/conversions.service';
import { PompistesService } from '../../pompistes/pompistes.service';
import { ReviewsService } from '../../reviews/reviews.service';

describe('StatisticsService', () => {
  let service: StatisticsService;
  let adminService: AdminService;
  let clientsService: ClientsService;
  let conversionsService: ConversionsService;
  let pompistesService: PompistesService;
  let reviewsService: ReviewsService;

  const mockAdminService = {
    countAdmins: jest.fn().mockResolvedValue(5),
  };

  const mockClientsService = {
    countClients: jest.fn().mockResolvedValue(100),
  };

  const mockConversionsService = {
    countConversions: jest.fn().mockResolvedValue(50),
  };

  const mockPompistesService = {
    countPompistes: jest.fn().mockResolvedValue(20),
  };

  const mockReviewsService = {
    countReviews: jest.fn().mockResolvedValue(200),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StatisticsService,
        { provide: AdminService, useValue: mockAdminService },
        { provide: ClientsService, useValue: mockClientsService },
        { provide: ConversionsService, useValue: mockConversionsService },
        { provide: PompistesService, useValue: mockPompistesService },
        { provide: ReviewsService, useValue: mockReviewsService },
      ],
    }).compile();

    service = module.get<StatisticsService>(StatisticsService);
    adminService = module.get<AdminService>(AdminService);
    clientsService = module.get<ClientsService>(ClientsService);
    conversionsService = module.get<ConversionsService>(ConversionsService);
    pompistesService = module.get<PompistesService>(PompistesService);
    reviewsService = module.get<ReviewsService>(ReviewsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('countDocs', () => {
    it('should return the correct document counts', async () => {
      const result = await service.countDocs();

      expect(result).toEqual({
        adminCount: 5,
        clientsCount: 100,
        conversionsCount: 50,
        pompistesCount: 20,
        reviewsCount: 200,
      });

      expect(adminService.countAdmins).toHaveBeenCalled();
      expect(clientsService.countClients).toHaveBeenCalled();
      expect(conversionsService.countConversions).toHaveBeenCalled();
      expect(pompistesService.countPompistes).toHaveBeenCalled();
      expect(reviewsService.countReviews).toHaveBeenCalled();
    });

    it('should handle errors when services fail', async () => {
      // Simulating an error in one of the service methods
      mockClientsService.countClients.mockRejectedValueOnce(new Error('Failed to count clients'));

      await expect(service.countDocs()).rejects.toThrowError('Failed to count clients');

      // Check that other services were still called, even though one failed
      expect(adminService.countAdmins).toHaveBeenCalled();
      expect(conversionsService.countConversions).toHaveBeenCalled();
      expect(pompistesService.countPompistes).toHaveBeenCalled();
      expect(reviewsService.countReviews).toHaveBeenCalled();
    });
  });
});
