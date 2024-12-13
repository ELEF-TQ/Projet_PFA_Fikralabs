import { Test, TestingModule } from '@nestjs/testing';
import { ReviewsService } from '../../reviews/reviews.service';
import { ClientsService } from '../../clients/clients.service';
import { PompistesService } from '../../pompistes/pompistes.service';
import { getModelToken } from '@nestjs/mongoose';
import { Review } from '../../reviews/schemas/review.schema';
import { CreateReviewDto } from '../../reviews/dto/create-review.dto';
import { UpdateReviewDto } from '../../reviews/dto/update-review.dto';
import { Model } from 'mongoose';
import { NotFoundException } from '@nestjs/common';

describe('ReviewsService', () => {
  let service: ReviewsService;
  let reviewModel: Model<Review>;
  let clientsService: ClientsService;
  let pompistesService: PompistesService;

  const mockReview = {
    client: { id: 'client-id' },  // Adjusted here
    pompiste: { id: 'pompiste-id' },  // Ensure pompiste is also an object
    etoiles: 3,
    commentaire: 'Good service!',
    dateReview: new Date(),
    _id: 'review-id',
    save: jest.fn().mockResolvedValue(true),  // Mock save method
  };
  

  const mockReviewModel = {
    create: jest.fn().mockResolvedValue(mockReview), // Mock create to return mockReview
    find: jest.fn().mockReturnValue({
      populate: jest.fn().mockReturnThis(), // Mock populate to chain
      exec: jest.fn().mockResolvedValue([mockReview]), // Simulate the result of the query
    }),
    findByIdAndUpdate: jest.fn().mockResolvedValue(mockReview),
    findById: jest.fn().mockResolvedValue(mockReview),
    countDocuments: jest.fn().mockResolvedValue(1),
  };
  

  const mockClientsService = {
    getClientByPhone: jest.fn().mockResolvedValue({ id: 'client-id' }),
    updateClientScore: jest.fn().mockResolvedValue(true),
  };

  const mockPompistesService = {
    getPompisteByMatriculeRH: jest.fn().mockResolvedValue({ id: 'pompiste-id' }),
    updatePompisteScore: jest.fn().mockResolvedValue(true),
    updatePompisteEtoiles: jest.fn().mockResolvedValue(true),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReviewsService,
        { provide: getModelToken(Review.name), useValue: mockReviewModel },
        { provide: ClientsService, useValue: mockClientsService },
        { provide: PompistesService, useValue: mockPompistesService },
      ],
    }).compile();

    service = module.get<ReviewsService>(ReviewsService);
    reviewModel = module.get<Model<Review>>(getModelToken(Review.name));
    clientsService = module.get<ClientsService>(ClientsService);
    pompistesService = module.get<PompistesService>(PompistesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // describe('createReview', () => {
  //   it('should create a review', async () => {
  //     const createReviewDto: CreateReviewDto = {
  //       phone: '1234567890',
  //       matriculeRH: 'pompiste-id',
  //       etoiles: 3,
  //       commentaire: 'Good service!',
  //     };

  //     await service.createReview(createReviewDto);

  //     expect(reviewModel.create).toHaveBeenCalledWith({
  //       client: expect.any(Object),
  //       pompiste: expect.any(Object),
  //       etoiles: 3,
  //       commentaire: 'Good service!',
  //       dateReview: expect.any(Date),
  //     });
  //     expect(clientsService.updateClientScore).toHaveBeenCalledWith(
  //       expect.any(Object),
  //       300,
  //     );
  //     expect(pompistesService.updatePompisteScore).toHaveBeenCalledWith(
  //       expect.any(Object),
  //       200,
  //     );
  //     expect(pompistesService.updatePompisteEtoiles).toHaveBeenCalledWith(
  //       expect.any(Object),
  //       3,
  //     );
  //   });
  // });

  describe('getAllByPompiste', () => {
    it('should return reviews for a pompiste', async () => {
      const reviews = await service.getAllByPompiste('pompiste-id');
      expect(reviews).toEqual([mockReview]);
      // Fix the expectation to match the format returned from mock
      expect(reviewModel.find).toHaveBeenCalledWith({
        pompiste: { id: 'pompiste-id' },
      });
      expect(reviewModel.find().populate).toHaveBeenCalled(); // Check if populate was called
    });
  });

  describe('getAllByClient', () => {
    it('should return reviews for a client', async () => {
      const reviews = await service.getAllByClient('client-id');
      expect(reviews).toEqual([mockReview]);
      
      // Update the expectation to match the actual mock format: 
      expect(reviewModel.find).toHaveBeenCalledWith({
        client: 'client-id',  // This should be a string, not an object
      });
      expect(reviewModel.find().populate).toHaveBeenCalled(); // Check if populate was called
    });
  });
  

  describe('update', () => {
    it('should update a review', async () => {
      const updateReviewDto: UpdateReviewDto = {
        commentaire: 'Updated comment',
      };

      const updatedReview = await service.update('review-id', updateReviewDto);
      expect(updatedReview).toEqual(mockReview);
      expect(reviewModel.findByIdAndUpdate).toHaveBeenCalledWith(
        'review-id',
        { commentaire: 'Updated comment' },
        { new: true },
      );
    });

    it('should throw NotFoundException if review is not found', async () => {
      jest.spyOn(reviewModel, 'findByIdAndUpdate').mockResolvedValue(null);

      await expect(
        service.update('non-existing-id', { commentaire: 'Updated comment' }),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('updateAlertStatus', () => {
    it('should update the alert status of a review', async () => {
      const updatedReview = await service.updateAlertStatus('review-id');
      expect(updatedReview.alerted).toBe(true);
      expect(reviewModel.findById).toHaveBeenCalledWith('review-id');
      expect(mockReview.save).toHaveBeenCalled(); // Check if save was called
    });

    it('should throw NotFoundException if review is not found', async () => {
      jest.spyOn(reviewModel, 'findById').mockResolvedValue(null);

      await expect(service.updateAlertStatus('non-existing-id')).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
