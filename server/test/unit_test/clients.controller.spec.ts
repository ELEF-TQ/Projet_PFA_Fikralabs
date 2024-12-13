import { Test, TestingModule } from '@nestjs/testing';
import { ClientsController } from '../../clients/clients.controller';
import { ClientsService } from '../../clients/clients.service';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('ClientsController', () => {
  let controller: ClientsController;
  let service: ClientsService;

  const mockClient = { id: '1', name: 'John Doe', phone: '1234567890', image: 'mockImage.jpg' };
  const mockClients = [mockClient];

  const mockClientsService = {
    create: jest.fn().mockImplementation((dto) => Promise.resolve({ id: '1', ...dto })),
    findAll: jest.fn().mockResolvedValue(mockClients),
    findOne: jest.fn().mockImplementation((id) => {
      return id === '1' ? Promise.resolve(mockClient) : Promise.reject(new HttpException('Client not found', HttpStatus.NOT_FOUND));
    }),
    remove: jest.fn().mockImplementation((id) => {
      return id === '1' ? Promise.resolve(mockClient) : Promise.resolve(null);
    }),
    getClientByPhone: jest.fn().mockImplementation((phone) => {
      return phone === '1234567890'
        ? Promise.resolve(mockClient)
        : Promise.reject(new HttpException('Phone number not found', HttpStatus.BAD_REQUEST));
    }),
    updateProfileClient: jest.fn().mockResolvedValue(mockClient),
    findReservedCouponsByClientId: jest.fn().mockResolvedValue([]),
    destroy: jest.fn().mockImplementation((ids) => {
      return ids.includes('1') ? Promise.resolve([mockClient]) : Promise.resolve([]);
    }),
    update: jest.fn().mockResolvedValue(mockClient),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClientsController],
      providers: [
        {
          provide: ClientsService,
          useValue: mockClientsService,
        },
      ],
    }).compile();

    controller = module.get<ClientsController>(ClientsController);
    service = module.get<ClientsService>(ClientsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a client', async () => {
      const dto = {
        name: 'John Doe',
        phone: '1234567890',
        email: 'john.doe@example.com',
        username: 'johndoe',
        password: 'securepassword',
        CIN: 'AB123456'
      }; // Include all required fields
      const image = 'mockImage.jpg';
      expect(await controller.create(image as any, dto)).toEqual({
        id: '1',
        ...dto,
        image,
      });
      expect(service.create).toHaveBeenCalledWith({ ...dto, image });
    });
  });

  describe('findAll', () => {
    it('should return all clients', async () => {
      expect(await controller.findAll()).toEqual(mockClients);
    });
  });

  describe('findById', () => {
    it('should return a client by ID', async () => {
      expect(await controller.findById('1')).toEqual(mockClient);
    });

    it('should throw an error if client not found', async () => {
      await expect(controller.findById('2')).rejects.toThrow('Client not found');
    });
  });

  describe('remove', () => {
    it('should remove a client', async () => {
      expect(await controller.remove('1')).toEqual({
        message: 'User Deleted Successfully',
        deletedUser: mockClient,
      });
    });

    it('should throw an error if client not found', async () => {
      await expect(controller.remove('2')).rejects.toThrow('No User Found To Delete');
    });
  });

  describe('checkClient', () => {
    it('should return a confirmation message if phone exists', async () => {
      expect(await controller.checkClient('1234567890')).toEqual('Ce numéro de téléphone existe.');
    });

    it('should throw an error if phone not found', async () => {
      await expect(controller.checkClient('0000000000')).rejects.toThrow('Phone number not found');
    });
  });

  describe('deleteMultiple', () => {
    it('should delete multiple clients', async () => {
      expect(await controller.deleteMultiple({ ids: ['1'] })).toEqual([mockClient]);
    });

    it('should throw an error if no clients were deleted', async () => {
      await expect(controller.deleteMultiple({ ids: ['2'] })).rejects.toThrow("Aucun client n'est supprimé");
    });
  });

  describe('updateProfile', () => {
    it('should update a client profile', async () => {
      const dto = { name: 'Jane Doe', email: 'jane.doe@example.com' };
      const image = 'mockImage.jpg';
      expect(await controller.updateProfile('1', image as any, dto)).toEqual(mockClient);
      expect(service.updateProfileClient).toHaveBeenCalledWith('1', { ...dto, image });
    });
  });

  describe('update', () => {
    it('should update a client', async () => {
      const dto = { name: 'Jane Doe', email: 'jane.doe@example.com' };
      const image = 'mockImage.jpg';
      expect(await controller.update('1', image as any, dto)).toEqual(mockClient);
      expect(service.update).toHaveBeenCalledWith('1', { ...dto, image });
    });
  });
});
