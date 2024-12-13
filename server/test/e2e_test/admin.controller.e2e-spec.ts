import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { HttpStatus } from '@nestjs/common';
import { AdminController } from '../../admin/admin.controller';
import { AdminService } from '../../admin/admin.service';

// Mocks des services
const mockAdminService = {
  create: jest.fn().mockResolvedValue({ id: '1', email: 'admin@example.com', password: 'encrypted', username: 'admin', image: null }),
  findAll: jest.fn().mockResolvedValue([
    { id: '1', email: 'admin1@example.com', username: 'admin1', image: null },
    { id: '2', email: 'admin2@example.com', username: 'admin2', image: null },
  ]),
  findOne: jest.fn().mockResolvedValue({ id: '1', email: 'admin1@example.com', username: 'admin1', image: null }),
  remove: jest.fn().mockResolvedValue({ id: '1', email: 'admin1@example.com', username: 'admin1', image: null }),
};

describe('AdminController', () => {
  let app;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminController],
      providers: [
        {
          provide: AdminService,
          useValue: mockAdminService,
        },
      ],
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });

  it('should get all admins', async () => {
    const response = await request(app.getHttpServer())
      .get('/admins')
      .expect(HttpStatus.OK);

    expect(response.body).toEqual([
      { id: '1', email: 'admin1@example.com', username: 'admin1', image: null },
      { id: '2', email: 'admin2@example.com', username: 'admin2', image: null },
    ]);
    expect(mockAdminService.findAll).toHaveBeenCalled();
  });

  it('should get a single admin by id', async () => {
    const response = await request(app.getHttpServer())
      .get('/admins/1')
      .expect(HttpStatus.OK);

    expect(response.body).toEqual({
      id: '1',
      email: 'admin1@example.com',
      username: 'admin1',
      image: null,
    });
    expect(mockAdminService.findOne).toHaveBeenCalledWith('1');
  });

  it('should throw an error if admin is not found', async () => {
    mockAdminService.findOne.mockResolvedValue(null); // Simuler un admin introuvable

    const response = await request(app.getHttpServer())
      .get('/admins/999')
      .expect(HttpStatus.NOT_FOUND);

    expect(response.body.message).toBe("L'administrateur avec l'identifiant fourni n'existe pas");
  });

  it('should delete an admin', async () => {
    const response = await request(app.getHttpServer())
      .delete('/admins/1')
      .expect(HttpStatus.OK);

    expect(response.body).toEqual({
      message: 'Administrateur supprimé avec succès',
      deletedAdmin: { id: '1', email: 'admin1@example.com', username: 'admin1', image: null },
    });
    expect(mockAdminService.remove).toHaveBeenCalledWith('1');
  });

  it('should throw an error if admin to delete is not found', async () => {
    mockAdminService.remove.mockResolvedValue(null); // Simuler une suppression échouée

    const response = await request(app.getHttpServer())
      .delete('/admins/999')
      .expect(HttpStatus.BAD_REQUEST);

    expect(response.body.message).toBe('Aucun administrateur trouvé');
  });

  afterAll(async () => {
    await app.close();
  });
});
