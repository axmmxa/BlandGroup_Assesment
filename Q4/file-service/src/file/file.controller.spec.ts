import { Test, TestingModule } from '@nestjs/testing';
import { FileController } from './file.controller';
import { FileService } from './file.service';
import { Request } from 'express';

describe('FileController', () => {
  let fileController: FileController;
  let mockFileService;

  beforeEach(async () => {
    mockFileService = {
      uploadFile: jest.fn(), // Mock the uploadFile method
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [FileController],
      providers: [
        {
          provide: FileService,
          useValue: mockFileService, // Use the mocked service
        },
      ],
    }).compile();

    fileController = module.get<FileController>(FileController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('uploadFile', () => {
    it('should call fileService.uploadFile and return the response', async () => {
      const mockFile = {
        originalname: 'test-file.jpg',
        size: 12345,
        mimetype: 'image/jpeg',
        buffer: Buffer.from('test'),
      } as Express.Multer.File;

      const mockRequest = {
        ip: '127.0.0.1',
      } as Request;

      const mockResponse = {
        message: 'File uploaded successfully',
        fileUrl: 'http://127.0.0.1:10000/devstoreaccount1/files/test-file.jpg',
      };

      // Mock the response from the file service
      mockFileService.uploadFile.mockResolvedValue(mockResponse);

      const result = await fileController.uploadFile(mockFile, mockRequest);

      expect(mockFileService.uploadFile).toHaveBeenCalledWith(mockFile, mockRequest.ip);
      expect(result).toEqual(mockResponse);
    });
  });
});