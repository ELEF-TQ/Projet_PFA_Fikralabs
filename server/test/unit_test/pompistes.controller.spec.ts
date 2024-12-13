import { Test, TestingModule } from '@nestjs/testing';
import { PompistesController } from '../../pompistes/pompistes.controller';
import { PompistesService } from '../../pompistes/pompistes.service';
import { NotFoundException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreatePompisteDto } from '../../pompistes/dto/create-pompiste.dto';
import { UpdatePompisteDto } from '../../pompistes/dto/update-pompiste.dto';
import { UpdatePompisteProfileDto } from '../../pompistes/dto/update-pompiste-profile.dto';
import { DeleteMultipleDto } from '../../pompistes/dto/delete-multiple.dto';

describe('PompistesController', () => {
  let controller: PompistesController;
  let service: PompistesService;

  const mockPompistesService = {
    create: jest.fn(),
    updateStatus: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    getPompisteByMatriculeRH: jest.fn(),
    update: jest.fn(),
    updateProfilePompiste: jest.fn(),
    remove: jest.fn(),
    destroy: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PompistesController],
      providers: [
        {
          provide: PompistesService,
          useValue: mockPompistesService,
        },
      ],
    }).compile();

    controller = module.get<PompistesController>(PompistesController);
    service = module.get<PompistesService>(PompistesService);
  });

  describe('create', () => {
    it('should successfully create a new pompiste', async () => {
      const createPompisteDto: CreatePompisteDto = {
        matriculeRH: '12345',
        username: 'Test Pompiste',
        CIN: 'CIN123',
        password: 'password123',
        email: 'test@example.com'
      };
      const file = { originalname: 'image.jpg' }; // Mock file
      mockPompistesService.create.mockResolvedValue(createPompisteDto);

      const result = await controller.create(file as any, createPompisteDto);
      expect(result).toEqual(createPompisteDto);
      expect(mockPompistesService.create).toHaveBeenCalledWith({
        ...createPompisteDto,
        image: file,
      });
    });
  });

  describe('updateStatus', () => {
    it('should update the status of a pompiste', async () => {
      const id = '1';
      mockPompistesService.updateStatus.mockResolvedValue(true);

      const result = await controller.updateStatus(id);
      expect(result).toEqual(true);
      expect(mockPompistesService.updateStatus).toHaveBeenCalledWith(id);
    });
  });

  describe('findAll', () => {
    it('should return all pompistes', async () => {
      const pompistes = [{ matriculeRH: '123', name: 'Test Pompiste' }];
      mockPompistesService.findAll.mockResolvedValue(pompistes);

      const result = await controller.findAll();
      expect(result).toEqual(pompistes);
      expect(mockPompistesService.findAll).toHaveBeenCalled();
    });

    it('should throw NotFoundException if no pompistes are found', async () => {
      mockPompistesService.findAll.mockResolvedValue([]);

      await expect(controller.findAll()).rejects.toThrow(NotFoundException);
    });
  });

  describe('findByMatriculeRH', () => {
    it('should return a pompiste by matriculeRH', async () => {
      const matriculeRH = '12345';
      const pompiste = { matriculeRH, name: 'Test Pompiste' };
      mockPompistesService.getPompisteByMatriculeRH.mockResolvedValue(pompiste);

      const result = await controller.findByMatriculeRH(matriculeRH);
      expect(result).toEqual(pompiste);
      expect(mockPompistesService.getPompisteByMatriculeRH).toHaveBeenCalledWith(matriculeRH);
    });

    it('should throw NotFoundException if pompiste not found', async () => {
      const matriculeRH = '12345';
      mockPompistesService.getPompisteByMatriculeRH.mockResolvedValue(null);

      await expect(controller.findByMatriculeRH(matriculeRH)).rejects.toThrow(NotFoundException);
    });
  });

  describe('findById', () => {
    it('should return a pompiste by id', async () => {
      const id = '1';
      const pompiste = { id, name: 'Test Pompiste' };
      mockPompistesService.findOne.mockResolvedValue(pompiste);

      const result = await controller.findById(id);
      expect(result).toEqual(pompiste);
      expect(mockPompistesService.findOne).toHaveBeenCalledWith(id);
    });
  });

  describe('update', () => {
    it('should update a pompiste', async () => {
      const id = '1';
      const updatePompisteDto: UpdatePompisteDto = { username: 'Updated Pompiste' };
      const file = { originalname: 'updated-image.jpg' };
      const updatedPompiste = { ...updatePompisteDto, image: file };
      mockPompistesService.update.mockResolvedValue(updatedPompiste);

      const result = await controller.update(id, file as any, updatePompisteDto);
      expect(result).toEqual(updatedPompiste);
      expect(mockPompistesService.update).toHaveBeenCalledWith(id, updatedPompiste);
    });
  });

  describe('updateProfile', () => {
    it('should successfully update the profile of a pompiste', async () => {
      const updateProfileDto: UpdatePompisteProfileDto = {
        username: 'newUsername', // Using a valid property from the DTO
        email: 'newemail@example.com', // Another valid property
        phone: '1234567890' // Another valid property
      };
      
      const file = { originalname: 'profile-image.jpg' }; // Mock file upload
      
      mockPompistesService.updateProfilePompiste.mockResolvedValue({
        ...updateProfileDto,
        image: file, // Add image to the returned value
      });
  
      const result = await controller.updateProfile('123', file as any, updateProfileDto);
  
      // Assertions
      expect(result).toEqual({
        ...updateProfileDto,
        image: file, // Image added to the expected result
      });
  
      expect(mockPompistesService.updateProfilePompiste).toHaveBeenCalledWith(
        '123', // Pompiste ID
        {
          ...updateProfileDto,
          image: file, // Ensuring the image is included in the update
        }
      );
    });
  });
  

  describe('remove', () => {
    it('should remove a pompiste', async () => {
      const id = '1';
      const deletedPompiste = { id, name: 'Deleted Pompiste' };
      mockPompistesService.remove.mockResolvedValue(deletedPompiste);

      const result = await controller.remove(id);
      expect(result).toEqual({
        message: 'User Deleted Successfully',
        deletedUser: deletedPompiste,
      });
      expect(mockPompistesService.remove).toHaveBeenCalledWith(id);
    });

    it('should throw NotFoundException if pompiste not found', async () => {
      const id = '1';
      mockPompistesService.remove.mockResolvedValue(null);

      await expect(controller.remove(id)).rejects.toThrow(NotFoundException);
    });
  });

  describe('deleteMultiple', () => {
    it('should delete multiple pompistes', async () => {
      const deleteMultipleDto: DeleteMultipleDto = { ids: ['1', '2'] };
      const deletedPompistes = [{ id: '1', name: 'Pompiste 1' }, { id: '2', name: 'Pompiste 2' }];
      mockPompistesService.destroy.mockResolvedValue(deletedPompistes);

      const result = await controller.deleteMultiple(deleteMultipleDto);
      expect(result).toEqual(deletedPompistes);
      expect(mockPompistesService.destroy).toHaveBeenCalledWith(deleteMultipleDto.ids);
    });

    it('should throw NotFoundException if no pompistes are deleted', async () => {
      const deleteMultipleDto: DeleteMultipleDto = { ids: ['1', '2'] };
      mockPompistesService.destroy.mockResolvedValue([]);

      await expect(controller.deleteMultiple(deleteMultipleDto)).rejects.toThrow(NotFoundException);
    });
  });
});
