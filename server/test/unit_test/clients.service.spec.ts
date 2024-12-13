import { Test, TestingModule } from '@nestjs/testing';
import { ClientsService } from '../../clients/clients.service';
import { getModelToken } from '@nestjs/mongoose';
import { Client } from '../../clients/schemas/client.schema';
import { HttpException, HttpStatus, NotFoundException } from '@nestjs/common';

// Fonction pour simuler les méthodes Mongoose avec .exec
const createMock = () => ({
    find: jest.fn().mockReturnThis(),
    findOne: jest.fn().mockReturnThis(),
    findById: jest.fn().mockReturnThis(),
    findByIdAndUpdate: jest.fn().mockReturnThis(),
    findByIdAndDelete: jest.fn().mockReturnThis(),
    countDocuments: jest.fn().mockReturnThis(),
    create: jest.fn(),
    exec: jest.fn(),
    select: jest.fn().mockReturnThis(),
});  

describe('ClientsService', () => {
  let service: ClientsService;
  let mockClientModel: any;

  beforeEach(async () => {
    mockClientModel = createMock();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClientsService,
        {
          provide: getModelToken(Client.name),
          useValue: mockClientModel,
        },
      ],
    }).compile();

    service = module.get<ClientsService>(ClientsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });


it('should throw an error if email already exists', async () => {
  const dto = { email: 'test@example.com', password: '12345' };

  // Simuler un email existant
  mockClientModel.findOne().exec.mockResolvedValueOnce({ email: dto.email });

  await expect(service.create(dto as any)).rejects.toThrowError(
    new HttpException('Email déjà existant', HttpStatus.BAD_REQUEST)
  );

  expect(mockClientModel.findOne).toHaveBeenCalledWith({ email: dto.email });
});


  it('should return all clients', async () => {
    mockClientModel.find.mockReturnValueOnce({ exec: jest.fn().mockResolvedValueOnce([{ id: '1', email: 'client@example.com' }]) });

    const result = await service.findAll();
    expect(result).toEqual([{ id: '1', email: 'client@example.com' }]);
  });

  it('should return a client by ID', async () => {
    // Simuler une recherche par ID
    mockClientModel.findById().select('-password').exec.mockResolvedValueOnce({ id: '1', email: 'client@example.com' });
  
    const result = await service.findOne('1');
  
    expect(mockClientModel.findById).toHaveBeenCalledWith('1');
    expect(result).toEqual({ id: '1', email: 'client@example.com' });
  }); 
  

  it('should remove a client', async () => {
    mockClientModel.findByIdAndDelete.mockReturnValueOnce({
      exec: jest.fn().mockResolvedValueOnce({ id: '1', email: 'client@example.com' }),
    });

    const result = await service.remove('1');
    expect(result).toEqual({ id: '1', email: 'client@example.com' });
  });

  it('should get client by phone', async () => {
    mockClientModel.findOne.mockReturnValueOnce({
      exec: jest.fn().mockResolvedValueOnce({ phone: '123456789', email: 'client@example.com' }),
    });

    const result = await service.getClientByPhone('123456789');
    expect(result).toEqual({ phone: '123456789', email: 'client@example.com' });
  });

  it('should throw error if client not found by phone', async () => {
    mockClientModel.findOne.mockReturnValueOnce({ exec: jest.fn().mockResolvedValueOnce(null) });

    await expect(service.getClientByPhone('123456789')).rejects.toThrowError(
      new HttpException("Ce numéro de téléphone n'existe pas.", HttpStatus.NOT_FOUND)
    );
  });

  it('should return the number of clients', async () => {
    mockClientModel.countDocuments.mockReturnValueOnce({ exec: jest.fn().mockResolvedValueOnce(5) });

    const result = await service.countClients();
    expect(result).toBe(5);
  });
});
