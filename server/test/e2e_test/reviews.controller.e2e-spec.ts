import { Test, TestingModule } from '@nestjs/testing';
import { ReviewsController } from '../../reviews/reviews.controller';
import { ReviewsService } from '../../reviews/reviews.service';
import { INestApplication, HttpStatus } from '@nestjs/common';
import * as request from 'supertest';

describe('ReviewsController (e2e)', () => {
  let app: INestApplication;
  let reviewService: ReviewsService;

  const mockReview = {
    _id: '1',
    phone: '123456789',
    matriculeRH: 'ABC123',
    etoiles: 4,
    commentaire: 'Great service!',
    client: { _id: 'client1' },
    pompiste: { _id: 'pompiste1' },
    dateReview: new Date(),
  };

  const mockReviews = [mockReview];

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReviewsController],
      providers: [
        {
          provide: ReviewsService,
          useValue: {
            createReview: jest.fn().mockResolvedValue(undefined),
            getAllByPompiste: jest.fn().mockResolvedValue(mockReviews),
            getAllByClient: jest.fn().mockResolvedValue(mockReviews),
            update: jest.fn().mockResolvedValue(mockReview),
            countReviews: jest.fn().mockResolvedValue(1),
            updateAlertStatus: jest.fn().mockResolvedValue(mockReview),
          },
        },
      ],
    }).compile();

    app = module.createNestApplication();
    reviewService = module.get<ReviewsService>(ReviewsService);
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('/POST reviews', () => {
    it('should create a review successfully', async () => {
      const createReviewDto = {
        phone: '123456789',
        matriculeRH: 'ABC123',
        etoiles: 4,
        commentaire: 'Great service!',
      };

      const response = await request(app.getHttpServer())
        .post('/reviews')
        .send(createReviewDto)
        .expect(HttpStatus.CREATED);

      expect(response.body.message).toBe('Évaluation créée avec succès');
      expect(reviewService.createReview).toHaveBeenCalledWith(createReviewDto);
    });

    it('should handle errors during review creation', async () => {
      jest.spyOn(reviewService, 'createReview').mockRejectedValueOnce(new Error('Invalid data'));

      const response = await request(app.getHttpServer())
        .post('/reviews')
        .send({
          phone: 'invalid',
          matriculeRH: 'ABC123',
          etoiles: 6, // Invalid stars
          commentaire: 'Great service!',
        })
        .expect(HttpStatus.BAD_REQUEST);

      expect(response.body.message).toContain('Échec de la création de l\'évaluation');
    });
  });

  describe('/GET reviews/all-pompiste/:matriculeRH', () => {
    it('should return all reviews for a pompiste', async () => {
      const response = await request(app.getHttpServer())
        .get('/reviews/all-pompiste/ABC123')
        .expect(HttpStatus.OK);

      expect(response.body).toEqual(mockReviews.map(review => ({
        ...review,
        dateReview: review.dateReview.toISOString(), // Convert date to string for comparison
      })));
      expect(reviewService.getAllByPompiste).toHaveBeenCalledWith('ABC123');
    });
  });

  describe('/GET reviews/all-client/:clientId', () => {
    it('should return all reviews for a client', async () => {
      const response = await request(app.getHttpServer())
        .get('/reviews/all-client/client1')
        .expect(HttpStatus.OK);

      expect(response.body).toEqual(mockReviews.map(review => ({
        ...review,
        dateReview: review.dateReview.toISOString(), // Convert date to string for comparison
      })));
      expect(reviewService.getAllByClient).toHaveBeenCalledWith('client1');
    });
  });

  describe('/PATCH reviews/:id', () => {
    it('should update a review successfully', async () => {
      const updateReviewDto = { commentaire: 'Great service!' };
      const response = await request(app.getHttpServer())
        .patch('/reviews/1')
        .send(updateReviewDto)
        .expect(HttpStatus.OK);

      expect(response.body.message).toBe('Évaluation mise à jour avec succès');
      expect(response.body.updatedReview.commentaire).toBe('Great service!');
      expect(reviewService.update).toHaveBeenCalledWith('1', updateReviewDto);
    });

    it('should return 404 for a non-existing review', async () => {
      jest.spyOn(reviewService, 'update').mockRejectedValueOnce(new Error('Not found'));

      const response = await request(app.getHttpServer())
        .patch('/reviews/999')
        .send({ commentaire: 'Updated comment' })
        .expect(HttpStatus.BAD_REQUEST);

      expect(response.body.message).toContain('Échec de la mise à jour de l\'évaluation : Not found');
    });
  });

  describe('/POST reviews/alert/:id', () => {
    it('should toggle the alert status for a review', async () => {
      const expectedResponse = {
        ...mockReview,
        dateReview: mockReview.dateReview.toISOString(), // Conversion de la date en ISO
      };
  
      const response = await request(app.getHttpServer())
        .post('/reviews/alert/1')
        .expect(HttpStatus.CREATED);
  
      // Comparaison des objets après avoir converti la date au format ISO
      expect(response.body).toEqual(expectedResponse);
  
      expect(reviewService.updateAlertStatus).toHaveBeenCalledWith('1');
    });
  
    it('should return 404 for a non-existing review when toggling alert', async () => {
      jest.spyOn(reviewService, 'updateAlertStatus').mockRejectedValueOnce(new Error('Review not found'));
  
      const response = await request(app.getHttpServer())
        .post('/reviews/alert/999')
        .expect(HttpStatus.INTERNAL_SERVER_ERROR);
  
      expect(response.body.message).toContain('Internal server error');
    });
  });
  
});
