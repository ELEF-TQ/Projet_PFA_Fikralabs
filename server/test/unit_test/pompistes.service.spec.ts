import { Test, TestingModule } from '@nestjs/testing';
import { PompistesController } from '../../pompistes/pompistes.controller';
import { PompistesService } from '../../pompistes/pompistes.service';
import { CreatePompisteDto } from '../../pompistes/dto/create-pompiste.dto';
import { UpdatePompisteDto } from '../../pompistes/dto/update-pompiste.dto';
import { NotFoundException } from '@nestjs/common';

describe('PompistesController', () => {
  let controller: PompistesController;
  let service: PompistesService;

  const mockPompiste = {
    id: '1',
    name: 'John Doe',
    matriculeRH: '12345',
    image: null,
  };

  const mockService = {
    create: jest.fn().mockResolvedValue(mockPompiste),
    updateStatus: jest.fn().mockResolvedValue({ status: 'updated' }),
    findAll: jest.fn().mockResolvedValue([mockPompiste]),
    getPompisteByMatriculeRH: jest.fn().mockResolvedValue(mockPompiste),
    findOne: jest.fn().mockResolvedValue(mockPompiste),
    update: jest.fn().mockResolvedValue(mockPompiste),
    updateProfilePompiste: jest.fn().mockResolvedValue(mockPompiste),
    remove: jest.fn().mockResolvedValue(mockPompiste),
    destroy: jest.fn().mockResolvedValue([mockPompiste]),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PompistesController],
      providers: [
        {
          provide: PompistesService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<PompistesController>(PompistesController);
    service = module.get<PompistesService>(PompistesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a pompiste', async () => {
        const createPompisteDto: CreatePompisteDto = {
            username: 'John Doe',        // Required field for the user's name
            matriculeRH: '12345',        // Unique identification for the pompiste
            CIN: 'AB124',                // National ID or identification document number
            password: 'securePassword',  // Provide a valid password for validation
            email: 'john.doe@example.com' // Mock email for testing
        };        
      const result = await controller.create(null, createPompisteDto);
      expect(result).toEqual(mockPompiste);
      expect(service.create).toHaveBeenCalledWith({
        ...createPompisteDto,
        image: null,
      });
    });
  });

  describe('findAll', () => {
    it('should return a list of pompistes', async () => {
      const result = await controller.findAll();
      expect(result).toEqual([mockPompiste]);
      expect(service.findAll).toHaveBeenCalled();
    });

    it('should throw a NotFoundException if no pompistes exist', async () => {
      jest.spyOn(service, 'findAll').mockResolvedValue([]);
      await expect(controller.findAll()).rejects.toThrow(NotFoundException);
    });
  });

  describe('findByMatriculeRH', () => {
    it('should find a pompiste by matriculeRH', async () => {
      const result = await controller.findByMatriculeRH('12345');
      expect(result).toEqual(mockPompiste);
      expect(service.getPompisteByMatriculeRH).toHaveBeenCalledWith('12345');
    });

    it('should throw a NotFoundException if no pompiste is found', async () => {
      jest.spyOn(service, 'getPompisteByMatriculeRH').mockResolvedValue(null);
      await expect(controller.findByMatriculeRH('12345')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('findById', () => {
    it('should return a pompiste by id', async () => {
      const result = await controller.findById('1');
      expect(result).toEqual(mockPompiste);
      expect(service.findOne).toHaveBeenCalledWith('1');
    });
  });

  describe('update', () => {
    it('should update a pompiste', async () => {
      const updatePompisteDto: UpdatePompisteDto = {
        username: 'Updated Name',
      };
      const result = await controller.update('1', null, updatePompisteDto);
      expect(result).toEqual(mockPompiste);
      expect(service.update).toHaveBeenCalledWith('1', {
        ...updatePompisteDto,
        image: null,
      });
    });
  });

  describe('updateStatus', () => {
    it('should update the status of a pompiste', async () => {
      const result = await controller.updateStatus('1');
      expect(result).toEqual({ status: 'updated' });
      expect(service.updateStatus).toHaveBeenCalledWith('1');
    });
  });

  describe('remove', () => {
    it('should delete a pompiste by id', async () => {
      const result = await controller.remove('1');
      expect(result).toEqual({
        message: 'User Deleted Successfully',
        deletedUser: mockPompiste,
      });
      expect(service.remove).toHaveBeenCalledWith('1');
    });

    it('should throw a NotFoundException if no pompiste is found', async () => {
      jest.spyOn(service, 'remove').mockResolvedValue(null);
      await expect(controller.remove('1')).rejects.toThrow(NotFoundException);
    });
  });

  describe('deleteMultiple', () => {
    it('should delete multiple pompistes', async () => {
      const result = await controller.deleteMultiple({ ids: ['1', '2'] });
      expect(result).toEqual([mockPompiste]);
      expect(service.destroy).toHaveBeenCalledWith(['1', '2']);
    });

    it('should throw a NotFoundException if no pompistes are deleted', async () => {
      jest.spyOn(service, 'destroy').mockResolvedValue([]);
      await expect(
        controller.deleteMultiple({ ids: ['1', '2'] }),
      ).rejects.toThrow(NotFoundException);
    });
  });
});
