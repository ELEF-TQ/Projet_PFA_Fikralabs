import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { PompistesController } from '../../pompistes/pompistes.controller';
import { PompistesService } from '../../pompistes/pompistes.service';
import { HttpException, INestApplication } from '@nestjs/common';
import { Pompiste } from '../../pompistes/schemas/pompiste.schema';
import { HttpStatus } from '@nestjs/common';

describe('PompistesController', () => {
  let app: INestApplication;
  let pompistesService: PompistesService;

  const createPompisteDto = {
    username: 'JohnDoe',
    matriculeRH: 'RH12345',
    CIN: 'CIN12345',
    password: 'password123',
    email: 'john.doe@example.com',
    phone: '1234567890',
  };

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      controllers: [PompistesController],
      providers: [
        {
          provide: PompistesService,
          useValue: {
            create: jest.fn().mockResolvedValue(createPompisteDto),
          },
        },
      ],
    }).compile();

    app = module.createNestApplication();
    await app.init();
    pompistesService = module.get<PompistesService>(PompistesService);
  });

  it('should create a new pompiste', async () => {
    const response = await request(app.getHttpServer())
      .post('/pompistes')
      .send(createPompisteDto)
      .expect(HttpStatus.CREATED);

    expect(response.body.username).toBe(createPompisteDto.username);
    expect(response.body.matriculeRH).toBe(createPompisteDto.matriculeRH);
    expect(response.body.email).toBe(createPompisteDto.email);
  });

  it('should return an error if the email is already taken', async () => {
    jest.spyOn(pompistesService, 'create').mockRejectedValueOnce(
      new HttpException("L'email existe déjà", HttpStatus.BAD_REQUEST),
    );

    const response = await request(app.getHttpServer())
      .post('/pompistes')
      .send(createPompisteDto)
      .expect(HttpStatus.BAD_REQUEST);

    expect(response.body.message).toBe("L'email existe déjà");
  });

  afterAll(async () => {
    await app.close();
  });

  describe('PompistesController', () => {
    let app: INestApplication;
    let pompistesService: PompistesService;
  
    beforeAll(async () => {
      const module = await Test.createTestingModule({
        controllers: [PompistesController],
        providers: [
          {
            provide: PompistesService,
            useValue: {
              findAll: jest.fn().mockResolvedValue([{ username: 'JohnDoe', matriculeRH: 'RH12345' }]),
            },
          },
        ],
      }).compile();
  
      app = module.createNestApplication();
      await app.init();
      pompistesService = module.get<PompistesService>(PompistesService);
    });
  
    it('should return all pompistes', async () => {
      const response = await request(app.getHttpServer())
        .get('/pompistes')
        .expect(HttpStatus.OK);
  
      expect(response.body.length).toBeGreaterThan(0);
      expect(response.body[0].username).toBe('JohnDoe');
      expect(response.body[0].matriculeRH).toBe('RH12345');
    });
  
    it('should return an error if no pompistes are found', async () => {
      jest.spyOn(pompistesService, 'findAll').mockResolvedValueOnce([]);
  
      const response = await request(app.getHttpServer())
        .get('/pompistes')
        .expect(HttpStatus.NOT_FOUND);
  
      expect(response.body.message).toBe('Aucun pompiste pour le moment');
    });
  
    afterAll(async () => {
      await app.close();
    });
  });

  describe('PompistesController', () => {
    let app: INestApplication;
    let pompistesService: PompistesService;
  
    const pompisteId = '1';
    const pompisteData = {
      id: pompisteId,
      username: 'JohnDoe',
      matriculeRH: 'RH12345',
      email: 'john.doe@example.com',
    };
  
    beforeAll(async () => {
      const module = await Test.createTestingModule({
        controllers: [PompistesController],
        providers: [
          {
            provide: PompistesService,
            useValue: {
              findOne: jest.fn().mockResolvedValue(pompisteData),
            },
          },
        ],
      }).compile();
  
      app = module.createNestApplication();
      await app.init();
      pompistesService = module.get<PompistesService>(PompistesService);
    });
  
    it('should return a pompiste by ID', async () => {
      const response = await request(app.getHttpServer())
        .get(`/pompistes/${pompisteId}`)
        .expect(HttpStatus.OK);
  
      expect(response.body.id).toBe(pompisteId);
      expect(response.body.username).toBe('JohnDoe');
      expect(response.body.email).toBe('john.doe@example.com');
    });
  
    it('should return an error if pompiste not found', async () => {
      jest.spyOn(pompistesService, 'findOne').mockResolvedValueOnce(null);
  
      const response = await request(app.getHttpServer())
        .get(`/pompistes/invalid-id`)
        .expect(HttpStatus.NOT_FOUND);
  
      expect(response.body.message).toBe('Pompiste not found');
    });
  
    afterAll(async () => {
      await app.close();
    });
  });

  
  describe('PompistesController', () => {
    let app: INestApplication;
    let pompistesService: PompistesService;
  
    const pompisteId = '1';
    const pompisteData = {
      id: pompisteId,
      username: 'JohnDoe',
      matriculeRH: 'RH12345',
      email: 'john.doe@example.com',
    };
  
    beforeAll(async () => {
      const module = await Test.createTestingModule({
        controllers: [PompistesController],
        providers: [
          {
            provide: PompistesService,
            useValue: {
              remove: jest.fn().mockResolvedValue(pompisteData),
            },
          },
        ],
      }).compile();
  
      app = module.createNestApplication();
      await app.init();
      pompistesService = module.get<PompistesService>(PompistesService);
    });
  
    it('should delete a pompiste by ID', async () => {
      const response = await request(app.getHttpServer())
        .delete(`/pompistes/${pompisteId}`)
        .expect(HttpStatus.OK);
  
      expect(response.body.message).toBe('User Deleted Successfully');
      expect(response.body.deletedUser.id).toBe(pompisteId);
    });
  
    it('should return an error if pompiste not found to delete', async () => {
      jest.spyOn(pompistesService, 'remove').mockResolvedValueOnce(null);
  
      const response = await request(app.getHttpServer())
        .delete(`/pompistes/invalid-id`)
        .expect(HttpStatus.NOT_FOUND);
  
      expect(response.body.message).toBe('No User Found To Delete');
    });
  
    afterAll(async () => {
      await app.close();
    });
  });

  
  describe('PompistesController', () => {
    let app: INestApplication;
    let pompistesService: PompistesService;
  
    const deleteMultipleDto = { ids: ['1', '2'] };
    const deletedPompistes = [
      { id: '1', username: 'JohnDoe' },
      { id: '2', username: 'JaneDoe' },
    ];
  
    beforeAll(async () => {
      const module = await Test.createTestingModule({
        controllers: [PompistesController],
        providers: [
          {
            provide: PompistesService,
            useValue: {
              destroy: jest.fn().mockResolvedValue(deletedPompistes),
            },
          },
        ],
      }).compile();
  
      app = module.createNestApplication();
      await app.init();
      pompistesService = module.get<PompistesService>(PompistesService);
    });
  
    it('should delete multiple pompistes', async () => {
      const response = await request(app.getHttpServer())
        .post('/pompistes/destroy')
        .send(deleteMultipleDto)
        .expect(deletedPompistes);
  
      expect(response.body.length).toBeGreaterThan(0);
      expect(response.body[0].username).toBe('JohnDoe');
      expect(response.body[1].username).toBe('JaneDoe');
    });
  
    it('should return an error if no pompistes are deleted', async () => {
      jest.spyOn(pompistesService, 'destroy').mockResolvedValueOnce([]);
  
      const response = await request(app.getHttpServer())
        .post('/pompistes/destroy')
        .send(deleteMultipleDto)
        .expect(HttpStatus.NOT_FOUND);
  
      expect(response.body.message).toBe("Aucun pompiste n'est supprimmé");
    });
  
    afterAll(async () => {
      await app.close();
    });
  });

  
  
});
