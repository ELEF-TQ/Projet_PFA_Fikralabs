import { Test, TestingModule } from '@nestjs/testing';
import { ConversionsController } from '../../conversions/conversions.controller';
import { ConversionsService } from '../../conversions/conversions.service';
import { UpdateMultipleDto } from '../../conversions/dto/update-conversion.dto';

describe('ConversionsController', () => {
  let controller: ConversionsController;
  let service: ConversionsService;

  const mockConversionsService = {
    create: jest.fn(),
    findAll: jest.fn(),
    acceptOne: jest.fn(),
    acceptAll: jest.fn(),
    findOne: jest.fn(),
    findAllByPompiste: jest.fn(),
  };

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

    controller = module.get<ConversionsController>(ConversionsController);
    service = module.get<ConversionsService>(ConversionsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call service.create with the correct parameter', async () => {
      const pompisteId = 'pompiste123';
      const result = { success: true };
      mockConversionsService.create.mockResolvedValue(result);

      const response = await controller.create(pompisteId);
      expect(service.create).toHaveBeenCalledWith(pompisteId);
      expect(response).toEqual(result);
    });
  });

  describe('findAll', () => {
    it('should return all conversions', async () => {
      const result = [{ id: '1' }, { id: '2' }];
      mockConversionsService.findAll.mockResolvedValue(result);

      const response = await controller.findAll();
      expect(service.findAll).toHaveBeenCalled();
      expect(response).toEqual(result);
    });
  });

  describe('acceptOne', () => {
    it('should call service.acceptOne with the correct ID', async () => {
      const id = 'conversion123';
      const result = { success: true };
      mockConversionsService.acceptOne.mockResolvedValue(result);

      const response = await controller.acceptOne(id);
      expect(service.acceptOne).toHaveBeenCalledWith(id);
      expect(response).toEqual(result);
    });
  });

  describe('acceptAll', () => {
    it('should call service.acceptAll with the correct IDs', async () => {
      const updateMultipleDto: UpdateMultipleDto = { ids: ['id1', 'id2', 'id3'] };
      const result = { success: true, data: ['id1', 'id2', 'id3'] };
      mockConversionsService.acceptAll.mockResolvedValue(result.data);

      const response = await controller.acceptAll(updateMultipleDto);
      expect(service.acceptAll).toHaveBeenCalledWith(updateMultipleDto.ids);
      expect(response).toEqual(result);
    });

    it('should handle errors gracefully', async () => {
      const updateMultipleDto: UpdateMultipleDto = { ids: ['id1', 'id2'] };
      const error = new Error('Something went wrong');
      mockConversionsService.acceptAll.mockRejectedValue(error);

      const response = await controller.acceptAll(updateMultipleDto);
      expect(service.acceptAll).toHaveBeenCalledWith(updateMultipleDto.ids);
      expect(response).toEqual({ success: false, message: error.message });
    });
  });

  describe('findById', () => {
    it('should call service.findOne with the correct ID', async () => {
      const id = 'conversion123';
      const result = { id, name: 'Test Conversion' };
      mockConversionsService.findOne.mockResolvedValue(result);

      const response = await controller.findById(id);
      expect(service.findOne).toHaveBeenCalledWith(id);
      expect(response).toEqual(result);
    });
  });

  describe('findAllByPompiste', () => {
    it('should call service.findAllByPompiste with the correct pompiste ID', async () => {
      const pompisteId = 'pompiste123';
      const result = [{ id: '1', pompisteId }, { id: '2', pompisteId }];
      mockConversionsService.findAllByPompiste.mockResolvedValue(result);

      const response = await controller.findAllByPompiste(pompisteId);
      expect(service.findAllByPompiste).toHaveBeenCalledWith(pompisteId);
      expect(response).toEqual(result);
    });
  });
});
