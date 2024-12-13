import { Test, TestingModule } from '@nestjs/testing';
import { StatisticsController } from '../../statistics/statistics.controller';
import { StatisticsService } from '../../statistics/statistics.service';
import { NotFoundException } from '@nestjs/common';

describe('StatisticsController', () => {
  let controller: StatisticsController;
  let service: StatisticsService;

  // Mock StatisticsService
  const mockStatisticsService = {
    countDocs: jest.fn().mockResolvedValue(10),  // Mocking the return value of countDocs method
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StatisticsController],
      providers: [
        { provide: StatisticsService, useValue: mockStatisticsService }, // Mock service here
      ],
    }).compile();

    controller = module.get<StatisticsController>(StatisticsController);
    service = module.get<StatisticsService>(StatisticsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getCountDocs', () => {
    it('should return the document count', async () => {
      const result = await controller.getCountDocs();
      expect(result).toBe(10);  // Expect the result of countDocs to be 10
      expect(service.countDocs).toHaveBeenCalled();  // Ensure the countDocs method was called
    });

    it('should throw an error if countDocs fails', async () => {
      mockStatisticsService.countDocs.mockRejectedValue(new Error('Failed to count documents'));
      
      await expect(controller.getCountDocs()).rejects.toThrowError('Failed to count documents');
    });
  });
});
