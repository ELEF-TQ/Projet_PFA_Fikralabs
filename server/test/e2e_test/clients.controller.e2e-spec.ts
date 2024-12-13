import { Test, TestingModule } from '@nestjs/testing';
import { HttpException, HttpStatus } from '@nestjs/common';
import { ClientsController } from '../../clients/clients.controller';
import { ClientsService } from '../../clients/clients.service';

describe('ClientsController', () => {
  let controller: ClientsController;
  let service: ClientsService;

  const mockClientService = {
    create: jest.fn().mockResolvedValue({ id: '1', email: 'test@example.com' }),
    findAll: jest.fn().mockResolvedValue([{ id: '1', email: 'test@example.com' }]),
    findOne: jest.fn().mockResolvedValue({ id: '1', email: 'test@example.com' }),
    remove: jest.fn().mockResolvedValue({ id: '1', email: 'test@example.com' }),
    updateProfileClient: jest.fn().mockResolvedValue({ id: '1', email: 'test@example.com' }),
    getClientByPhone: jest.fn().mockResolvedValue({ id: '1', phone: '123456789' }),
    destroy: jest.fn().mockResolvedValue([{ id: '1', email: 'test@example.com' }]),
    update: jest.fn().mockResolvedValue({ id: '1', email: 'test@example.com' }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClientsController],
      providers: [
        ClientsService,
        {
          provide: ClientsService,
          useValue: mockClientService,
        },
      ],
    }).compile();

    controller = module.get<ClientsController>(ClientsController);
    service = module.get<ClientsService>(ClientsService);
  });

  describe('POST /clients', () => {
    it('should create a new client', async () => {
      const mockImage = { image: 'image.jpg' }; // Mock de l'image
      const result = await controller.create(
        mockImage as any,
        {
          email: 'test@example.com',
          password: 'password123',
          username: 'testusername',
          CIN: 'AB1234'
        }
      );
      expect(result).toEqual({ id: '1', email: 'test@example.com' });
      expect(mockClientService.create).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
        username: 'testusername',
        CIN: 'AB1234',
        image: mockImage
      });
    });
  });
  

  describe('GET /clients', () => {
    it('should return all clients', async () => {
      const result = await controller.findAll();
      expect(result).toEqual([{ id: '1', email: 'test@example.com' }]);
    });
  });

  describe('GET /clients/:id', () => {
    it('should return a client by id', async () => {
      const result = await controller.findById('1');
      expect(result).toEqual({ id: '1', email: 'test@example.com' });
    });
  });

  describe('DELETE /clients/:id', () => {
    it('should delete a client', async () => {
      const result = await controller.remove('1');
      expect(result).toEqual({
        message: 'User Deleted Successfully',
        deletedUser: { id: '1', email: 'test@example.com' },
      });
    });

    it('should throw an error if client not found', async () => {
      mockClientService.remove.mockResolvedValue(null); // Simuler un client introuvable
      try {
        await controller.remove('nonexistent-id');
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
        expect(error.response).toBe('No User Found To Delete');
        expect(error.status).toBe(HttpStatus.NOT_FOUND);
      }
    });
  });

  describe('POST /clients/updateProfile/:id', () => {
    it('should update a client profile', async () => {
      const result = await controller.updateProfile(
        '1',
        { image: 'newimage.jpg' } as any, // Mock de l'image
        { email: 'new@example.com' }
      );
      expect(result).toEqual({ id: '1', email: 'test@example.com' });
    });
  });

  describe('GET /clients/phone/:phone', () => {
    it('should check if a client exists by phone', async () => {
      const result = await controller.checkClient('123456789');
      expect(result).toBe('Ce numéro de téléphone existe.');
    });

    it('should throw an error if client does not exist by phone', async () => {
      mockClientService.getClientByPhone.mockResolvedValue(null); // Simuler client introuvable
      try {
        await controller.checkClient('nonexistentphone');
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
        expect(error.response).toBe("Ce numéro de téléphone n'existe pas.");
        expect(error.status).toBe(HttpStatus.NOT_FOUND);
      }
    });
  });

  describe('POST /clients/destroy', () => {
    it('should throw an error if no clients are deleted', async () => {
      mockClientService.destroy.mockResolvedValue([]); // Simuler aucune suppression
      try {
        await controller.deleteMultiple({ ids: ['nonexistent-id'] });
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
        expect(error.response.message).toBe("Aucun client n'est supprimé");
        expect(error.status).toBe(HttpStatus.NOT_FOUND);
      }
    });
  });
  

  describe('POST /clients/updateData/:id', () => {
    it('should update a client data', async () => {
      const result = await controller.update(
        '1',
        { image: 'newimage.jpg' } as any, // Mock de l'image
        { email: 'newdata@example.com' }
      );
      expect(result).toEqual({ id: '1', email: 'test@example.com' });
    });
  });
});
