import { Test, TestingModule } from '@nestjs/testing';
import { ReviewsController } from '../../reviews/reviews.controller';
import { ReviewsService } from '../../reviews/reviews.service';
import { CreateReviewDto } from '../../reviews/dto/create-review.dto';
import { UpdateReviewDto } from '../../reviews/dto/update-review.dto';
import { HttpException, HttpStatus, NotFoundException } from '@nestjs/common';

describe('ReviewsController', () => {
  let controller: ReviewsController;
  let service: ReviewsService;

  const mockReview = {
    id: '1',
    clientId: '123',
    matriculeRH: '456',
    rating: 5,
    comment: 'Great service!',
    alert: false,
  };

  const mockService = {
    createReview: jest.fn().mockResolvedValue(mockReview),
    getAllByPompiste: jest.fn().mockResolvedValue([mockReview]),
    getAllByClient: jest.fn().mockResolvedValue([mockReview]),
    updateAlertStatus: jest.fn().mockResolvedValue({ ...mockReview, alert: true }),
    update: jest.fn().mockResolvedValue({ ...mockReview, comment: 'Updated comment' }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReviewsController],
      providers: [
        {
          provide: ReviewsService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<ReviewsController>(ReviewsController);
    service = module.get<ReviewsService>(ReviewsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createReview', () => {
    it('should create a new review', async () => {
      const createReviewDto: CreateReviewDto = {
          matriculeRH: '456',
          etoiles: 5,
          commentaire: 'Great service!',
          phone: '0666666666'
      };
      const result = await controller.createReview(createReviewDto);
      expect(result).toEqual({ message: 'Évaluation créée avec succès' });
      expect(service.createReview).toHaveBeenCalledWith(createReviewDto);
    });

    it('should throw an error if creation fails', async () => {
      jest.spyOn(service, 'createReview').mockRejectedValue(new Error('Creation failed'));
      const createReviewDto: CreateReviewDto = {
          matriculeRH: '456',
          etoiles: 5,
          commentaire: 'Great service!',
          phone: '0666666666'
      };
      await expect(controller.createReview(createReviewDto)).rejects.toThrow(
        new HttpException(
          { message: "Échec de la création de l'évaluation : Creation failed" },
          HttpStatus.BAD_REQUEST,
        ),
      );
    });
  });

  describe('getAllReviewsByPompiste', () => {
    it('should return all reviews for a specific pompiste', async () => {
      const result = await controller.getAllReviewsByPompiste('456');
      expect(result).toEqual([mockReview]);
      expect(service.getAllByPompiste).toHaveBeenCalledWith('456');
    });

    it('should throw an error if no reviews are found', async () => {
      jest.spyOn(service, 'getAllByPompiste').mockResolvedValue([]);
      const result = await controller.getAllReviewsByPompiste('456');
      expect(result).toEqual([]);
    });
  });

  describe('getAllReviewsByClient', () => {
    it('should return all reviews for a specific client', async () => {
      const result = await controller.getAllReviewsByClient('123');
      expect(result).toEqual([mockReview]);
      expect(service.getAllByClient).toHaveBeenCalledWith('123');
    });

    it('should throw an error if no reviews are found', async () => {
      jest.spyOn(service, 'getAllByClient').mockResolvedValue([]);
      const result = await controller.getAllReviewsByClient('123');
      expect(result).toEqual([]);
    });
  });

  describe('updateReviewAlertStatus', () => {
    it('should update the alert status of a review', async () => {
      const result = await controller.updateReviewAlertStatus('1');
      expect(result).toEqual({ ...mockReview, alert: true });
      expect(service.updateAlertStatus).toHaveBeenCalledWith('1');
    });

    it('should throw an error if the update fails', async () => {
      jest.spyOn(service, 'updateAlertStatus').mockRejectedValue(new Error('Update failed'));
      await expect(controller.updateReviewAlertStatus('1')).rejects.toThrow(
        new Error('Update failed'),
      );
    });
  });

  describe('update', () => {
    it('should update a review', async () => {
      const updateReviewDto: UpdateReviewDto = { commentaire: 'Updated comment' };
      const result = await controller.update('1', updateReviewDto);
      expect(result).toEqual({
        message: 'Évaluation mise à jour avec succès',
        updatedReview: { ...mockReview, comment: 'Updated comment' },
      });
      expect(service.update).toHaveBeenCalledWith('1', updateReviewDto);
    });

    it('should throw an error if the update fails', async () => {
      jest.spyOn(service, 'update').mockRejectedValue(new Error('Update failed'));
      const updateReviewDto: UpdateReviewDto = { commentaire: 'Updated comment' };
      await expect(controller.update('1', updateReviewDto)).rejects.toThrow(
        new HttpException(
          { message: "Échec de la mise à jour de l'évaluation : Update failed" },
          HttpStatus.BAD_REQUEST,
        ),
      );
    });
  });
});
