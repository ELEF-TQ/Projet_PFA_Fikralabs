import { Test, TestingModule } from '@nestjs/testing';
import { AdminController } from '../../admin/admin.controller';
import { AdminService } from '../../admin/admin.service';
import { NotFoundException, HttpException, HttpStatus } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateAdminDto } from '../../admin/dto/create-admin.dto';
import { UpdateAdminDto } from '../../admin/dto/update-admin.dto';
import { UpdateAdminProfileDto } from '../../admin/dto/update-admin-profile.dto';

describe('AdminController', () => {
  let controller: AdminController;
  let service: AdminService;

  const mockAdminService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    updateProfileAdmin: jest.fn(),
    remove: jest.fn(),
  };

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

    controller = module.get<AdminController>(AdminController);
    service = module.get<AdminService>(AdminService);
  });

  describe('create', () => {
    it('should successfully create a new admin with image', async () => {
    const createAdminDto: CreateAdminDto = {
        email: 'admin@example.com',  // Admin's email address
        username: 'Test Admin',      // Admin's username or full name
        password: 'securePassword123', // A secure password for the admin (hashed in the service layer)
        phone: '+1234567890',        // Admin's phone number (in international format)
        CIN: 'CIN12345678'           // Admin's national identification number (or equivalent)
    };
      const file = { originalname: 'image.jpg' }; // Mock file
      mockAdminService.create.mockResolvedValue(createAdminDto);

      const result = await controller.create(file as any, createAdminDto);
      expect(result).toEqual(createAdminDto);
      expect(mockAdminService.create).toHaveBeenCalledWith({
        ...createAdminDto,
        image: file,
      });
    });
  });

  describe('findAll', () => {
    it('should return all admins', async () => {
      const admins = [{ id: '1', name: 'Admin 1' }];
      mockAdminService.findAll.mockResolvedValue(admins);

      const result = await controller.findAll();
      expect(result).toEqual(admins);
      expect(mockAdminService.findAll).toHaveBeenCalled();
    });

    it('should throw NotFoundException if no admins are found', async () => {
      mockAdminService.findAll.mockResolvedValue([]);

      await expect(controller.findAll()).rejects.toThrow(
        new HttpException('No Admins Found', HttpStatus.NOT_FOUND),
      );
    });
  });

  describe('findOne', () => {
    it('should return an admin by id', async () => {
      const admin = { id: '1', name: 'Admin 1' };
      mockAdminService.findOne.mockResolvedValue(admin);

      const result = await controller.findOne('1');
      expect(result).toEqual(admin);
      expect(mockAdminService.findOne).toHaveBeenCalledWith('1');
    });

    it('should throw NotFoundException if admin not found', async () => {
      mockAdminService.findOne.mockResolvedValue(null);

      await expect(controller.findOne('1')).rejects.toThrow(
        new HttpException("L'administrateur avec l'identifiant fourni n'existe pas", HttpStatus.NOT_FOUND),
      );
    });
  });

  describe('update', () => {
    it('should update an admin', async () => {
      const id = '1';
      const updateAdminDto: UpdateAdminDto = { username: 'Updated Admin' };
      const file = { originalname: 'updated-image.jpg' };
      const updatedAdmin = { ...updateAdminDto, image: file };
      mockAdminService.update.mockResolvedValue(updatedAdmin);

      const result = await controller.update(id, file as any, updateAdminDto);
      expect(result).toEqual(updatedAdmin);
      expect(mockAdminService.update).toHaveBeenCalledWith(id, updatedAdmin);
    });
  });

  describe('updateProfile', () => {
    it('should successfully update the profile of an admin', async () => {
      const updateProfileDto: UpdateAdminProfileDto = {
        username: 'Updated Profile Name',
        email: 'newemail@example.com',
      };
      const file = { originalname: 'profile-image.jpg' }; // Mock file upload

      mockAdminService.updateProfileAdmin.mockResolvedValue({
        ...updateProfileDto,
        image: file, // Add image to the returned value
      });

      const result = await controller.updateProfile('123', file as any, updateProfileDto);

      expect(result).toEqual({
        ...updateProfileDto,
        image: file, // Image added to the expected result
      });

      expect(mockAdminService.updateProfileAdmin).toHaveBeenCalledWith(
        '123', // Admin ID
        {
          ...updateProfileDto,
          image: file, // Ensuring the image is included in the update
        },
      );
    });
  });

  describe('remove', () => {
    it('should remove an admin', async () => {
      const id = '1';
      const deletedAdmin = { id, name: 'Deleted Admin' };
      mockAdminService.remove.mockResolvedValue(deletedAdmin);

      const result = await controller.remove(id);
      expect(result).toEqual({
        message: 'Administrateur supprimé avec succès',
        deletedAdmin,
      });
      expect(mockAdminService.remove).toHaveBeenCalledWith(id);
    });

    it('should throw NotFoundException if admin not found', async () => {
      const id = '1';
      mockAdminService.remove.mockResolvedValue(null);

      await expect(controller.remove(id)).rejects.toThrow(
        new HttpException("Aucun administrateur trouvé", HttpStatus.BAD_REQUEST),
      );
    });
  });
});
