import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { HttpStatus } from '@nestjs/common';
import { ConversionsController } from '../../conversions/conversions.controller';
import { ConversionsService } from '../../conversions/conversions.service';

// Mocks des services
const mockConversionsService = {
  create: jest.fn().mockResolvedValue({
    id: '1',
    pompiste: { username: 'pompiste1' },
    score: 3000,
    montant: 500,
    dateConversion: new Date(),
    Num_Demande: '12345',
  }),
  findAll: jest.fn().mockResolvedValue([
    { id: '1', pompiste: { username: 'pompiste1' }, montant: 500 },
    { id: '2', pompiste: { username: 'pompiste2' }, montant: 300 },
  ]),
  findOne: jest.fn().mockResolvedValue({
    id: '1',
    pompiste: { username: 'pompiste1' },
    montant: 500,
  }),
  acceptOne: jest.fn().mockResolvedValue({
    id: '1',
    pompiste: { username: 'pompiste1' },
    montant: 500,
    status: 'ACCEPTED',
  }),
  acceptAll: jest.fn().mockResolvedValue({ n: 2, nModified: 2 }),
  findAllByPompiste: jest.fn().mockResolvedValue([
    { id: '1', pompiste: { username: 'pompiste1' }, montant: 500 },
  ]),
};

describe('ConversionsController', () => {
  let app;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConversionsController],
      providers: [
        {
          provide: ConversionsService,
          useValue: mockConversionsService,
        },
      ],
    }).compile();
    app = module.createNestApplication();
    await app.init();
  });
  it('should create a conversion', async () => {
    const response = await request(app.getHttpServer())
      .post('/conversions/1') 
      .expect(HttpStatus.CREATED);
    expect(response.body).toEqual({
      id: '1',
      pompiste: { username: 'pompiste1' },
      score: 3000,
      montant: 500,
      dateConversion: expect.any(String),
      Num_Demande: '12345',
    });
    expect(mockConversionsService.create).toHaveBeenCalledWith('1');
  });
  it('should get all conversions', async () => {
    const response = await request(app.getHttpServer())
      .get('/conversions')
      .expect(HttpStatus.OK);
    expect(response.body).toEqual([
      { id: '1', pompiste: { username: 'pompiste1' }, montant: 500 },
      { id: '2', pompiste: { username: 'pompiste2' }, montant: 300 },
    ]);
    expect(mockConversionsService.findAll).toHaveBeenCalled();
  });
  it('should get a single conversion by id', async () => {
    const response = await request(app.getHttpServer())
      .get('/conversions/1')
      .expect(HttpStatus.OK);
    expect(response.body).toEqual({
      id: '1',
      pompiste: { username: 'pompiste1' },
      montant: 500,
    });
    expect(mockConversionsService.findOne).toHaveBeenCalledWith('1');
  });

  it('should accept a single conversion', async () => {
    const response = await request(app.getHttpServer())
      .patch('/conversions/acceptOne/1')
      .expect(HttpStatus.OK);

    expect(response.body).toEqual({
      id: '1',
      pompiste: { username: 'pompiste1' },
      montant: 500,
      status: 'ACCEPTED',
    });
    expect(mockConversionsService.acceptOne).toHaveBeenCalledWith('1');
  });

  it('should accept all conversions', async () => {
    const updateMultipleDto = { ids: ['1', '2'] };

    const response = await request(app.getHttpServer())
      .patch('/conversions/acceptAll')
      .send(updateMultipleDto)
      .expect(HttpStatus.OK);

    expect(response.body).toEqual({
      success: true,
      data: { n: 2, nModified: 2 },
    });
    expect(mockConversionsService.acceptAll).toHaveBeenCalledWith(['1', '2']);
  });

  it('should get all conversions by pompiste id', async () => {
    const response = await request(app.getHttpServer())
      .get('/conversions/ByPompiste/1')
      .expect(HttpStatus.OK);

    expect(response.body).toEqual([
      { id: '1', pompiste: { username: 'pompiste1' }, montant: 500 },
    ]);
    expect(mockConversionsService.findAllByPompiste).toHaveBeenCalledWith('1');
  });

  it('should throw error when pompiste not found in create conversion', async () => {
    mockConversionsService.create.mockRejectedValueOnce(new Error('Aucun pompiste avec cet id 999'));

    const response = await request(app.getHttpServer())
      .post('/conversions/999') // Pompiste inexistant
      .expect(HttpStatus.INTERNAL_SERVER_ERROR);

    expect(response.body.message).toBe('Internal server error');
  });

  it('should throw error when score is too low for conversion', async () => {
    mockConversionsService.create.mockRejectedValueOnce(new Error('Impossible de convertir une somme de points qui est inferieur à 2500 pts'));

    const response = await request(app.getHttpServer())
      .post('/conversions/1') // Pompiste avec score < 2500
      .expect(HttpStatus.INTERNAL_SERVER_ERROR);

    expect(response.body.message).toBe('Internal server error');
  });

  afterAll(async () => {
    await app.close();
  });
});
