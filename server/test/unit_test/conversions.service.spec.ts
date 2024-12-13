import { Test, TestingModule } from '@nestjs/testing';
import { ConversionsService } from '../../conversions/conversions.service';
import { getModelToken } from '@nestjs/mongoose';
import { PompistesService } from '../../pompistes/pompistes.service';
import { Conversion } from '../../conversions/schemas/conversion.schema';
import { Pompiste } from '../../pompistes/schemas/pompiste.schema';
import { HttpException, NotFoundException } from '@nestjs/common';
import { calculeMontant } from '../../conversions/utils/calculeMontant';
import { ConversionStatus } from '../../conversions/enums/conversionStatus';
import { generateRandomNumber } from '../../conversions/utils/generateRandomNumber';

jest.mock('../../conversions/utils/calculeMontant');
jest.mock('../../conversions/utils/generateRandomNumber');

describe('ConversionsService', () => {
  let service: ConversionsService;
  let mockConversionModel: any;
  let mockPompisteModel: any;
  let mockPompistesService: any;

  beforeEach(async () => {
    mockConversionModel = {
      create: jest.fn().mockResolvedValue({
        save: jest.fn().mockResolvedValue(true),
      }),
      find: jest.fn().mockReturnValue({
        populate: jest.fn().mockReturnThis(),
        exec: jest.fn().mockResolvedValue([{ id: '1' }, { id: '2' }]),
      }),
      findById: jest.fn().mockResolvedValue({
        _id: '1',
        montant: 100,
        status: ConversionStatus.PENDING,
        save: jest.fn().mockResolvedValue(true),
      }),
      countDocuments: jest.fn(),
      updateMany: jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue({ nModified: 2 }),
      }),
    };

    mockPompisteModel = {
      findById: jest.fn().mockResolvedValue({
        _id: '123',
        solde: 500,
        save: jest.fn().mockResolvedValue(true),
      }),
    };

    mockPompistesService = {
      findOne: jest.fn(),
      resetPompisteScoreToZero: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ConversionsService,
        { provide: getModelToken(Conversion.name), useValue: mockConversionModel },
        { provide: getModelToken(Pompiste.name), useValue: mockPompisteModel },
        { provide: PompistesService, useValue: mockPompistesService },
      ],
    }).compile();

    service = module.get<ConversionsService>(ConversionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    // it('should create a new conversion', async () => {
    //   const pompisteId = '123';
    //   const pompiste = { _id: pompisteId, score: 3000 };
    //   const montant = 150;
    //   const numDemande = 123456;

    //   (calculeMontant as jest.Mock).mockReturnValue(montant);
    //   (generateRandomNumber as jest.Mock).mockReturnValue(numDemande);
    //   mockPompistesService.findOne.mockResolvedValue(pompiste);

    //   await service.create(pompisteId);

    //   expect(mockPompistesService.findOne).toHaveBeenCalledWith(pompisteId);
    //   expect(calculeMontant).toHaveBeenCalledWith(pompiste.score);
    //   expect(generateRandomNumber).toHaveBeenCalled();
    //   expect(mockPompistesService.resetPompisteScoreToZero).toHaveBeenCalledWith(pompiste);
    //   expect(mockConversionModel.create).toHaveBeenCalledWith({
    //     pompiste: pompiste,
    //     score: pompiste.score,
    //     montant: montant,
    //     numDemande: numDemande,
    //     status: ConversionStatus.PENDING,
    //   });
    // });

    it('should throw NotFoundException if pompiste does not exist', async () => {
      const pompisteId = '123';
      mockPompistesService.findOne.mockResolvedValue(null);

      await expect(service.create(pompisteId)).rejects.toThrow(NotFoundException);
    });

    it('should throw HttpException if score is below 2500', async () => {
      const pompisteId = '123';
      const pompiste = { _id: pompisteId, score: 2000 };
      mockPompistesService.findOne.mockResolvedValue(pompiste);

      await expect(service.create(pompisteId)).rejects.toThrow(HttpException);
    });
  });

  describe('findAllByPompiste', () => {
    it('should return all conversions for a specific pompiste', async () => {
      const pompisteId = '123';
      const pompiste = { _id: pompisteId };
      const conversions = [{ id: '1' }, { id: '2' }];

      mockPompistesService.findOne.mockResolvedValue(pompiste);

      const result = await service.findAllByPompiste(pompisteId);

      expect(mockPompistesService.findOne).toHaveBeenCalledWith(pompisteId);
      expect(mockConversionModel.find).toHaveBeenCalledWith({ pompiste });
      expect(result).toEqual(conversions);
    });

    it('should throw NotFoundException if pompiste does not exist', async () => {
      const pompisteId = '123';
      mockPompistesService.findOne.mockResolvedValue(null);

      await expect(service.findAllByPompiste(pompisteId)).rejects.toThrow(NotFoundException);
    });
  });

//   describe('acceptOne', () => {
//     it('should accept a conversion and update the pompiste balance', async () => {
//       const id = '1';
//       const pompisteId = '123';
//       const conversion = {
//         _id: id,
//         montant: 100,
//         status: ConversionStatus.PENDING,
//         save: jest.fn().mockResolvedValue(true),
//       };
//       const pompiste = {
//         _id: pompisteId,
//         solde: 500,
//         save: jest.fn().mockResolvedValue(true),
//       };

//       mockConversionModel.findById.mockResolvedValue(conversion);
//       mockPompisteModel.findById.mockResolvedValue(pompiste);

//       await service.acceptOne(id);

//       expect(mockConversionModel.findById).toHaveBeenCalledWith(id);
//       expect(mockPompisteModel.findById).toHaveBeenCalledWith(pompisteId);
//       expect(conversion.status).toEqual(ConversionStatus.ACCEPTED);
//       expect(pompiste.solde).toEqual(600);  // Updated balance
//       expect(conversion.save).toHaveBeenCalled();
//     });
//   });

  describe('acceptAll', () => {
    it('should update multiple conversions to ACCEPTED status', async () => {
      const ids = ['1', '2'];
      const result = { nModified: 2 };

      mockConversionModel.updateMany.mockReturnValue({
        exec: jest.fn().mockResolvedValue(result),
      });

      const updated = await service.acceptAll(ids);

      expect(mockConversionModel.updateMany).toHaveBeenCalledWith(
        { _id: { $in: ids }, status: ConversionStatus.PENDING },
        { $set: { status: ConversionStatus.ACCEPTED } }
      );
      expect(updated).toEqual(result);
    });
  });
});
