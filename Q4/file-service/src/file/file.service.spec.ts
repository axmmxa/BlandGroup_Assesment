import { Test, TestingModule } from '@nestjs/testing';
import { FileService } from './file.service';
import { getModelToken } from '@nestjs/mongoose';
import { BlobServiceClient } from '@azure/storage-blob';

// Mock the BlobServiceClient from Azure
jest.mock('@azure/storage-blob', () => {
  return {
    BlobServiceClient: {
      fromConnectionString: jest.fn(),
    },
  };
});

describe('FileService', () => {
  let fileService: FileService;
  let mockBlobServiceClient;
  let mockContainerClient;

  // Mock file document and model for MongoDB
  const mockFileDocument = {
    save: jest.fn().mockResolvedValue(true), // Mock the save method for file documents
  };

  const mockFileModel = jest.fn().mockReturnValue(mockFileDocument); // Mock the constructor of the model

  beforeEach(async () => {
    // Setup mock container client with Azure Blob Storage methods
    mockContainerClient = {
      createIfNotExists: jest.fn().mockResolvedValue(undefined),
      getBlockBlobClient: jest.fn().mockReturnValue({
        uploadData: jest.fn().mockResolvedValue(undefined),
        url: 'http://127.0.0.1:10000/devstoreaccount1/files/test-file.jpg', // Simulated file URL
      }),
    };

    // Setup mock BlobServiceClient
    mockBlobServiceClient = {
      getContainerClient: jest.fn().mockReturnValue(mockContainerClient),
    };

    // Assign the mock BlobServiceClient to be returned when fromConnectionString is called
    (BlobServiceClient.fromConnectionString as jest.Mock).mockReturnValue(mockBlobServiceClient);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FileService,
        {
          provide: getModelToken('File'), // Inject the mocked file model
          useValue: mockFileModel,
        },
      ],
    }).compile();

    // Retrieve the instantiated file service
    fileService = module.get<FileService>(FileService);
  });

  afterEach(() => {
    // Clear all mocks after each test
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    // Check if the file service is correctly instantiated
    expect(fileService).toBeDefined();
  });

  describe('uploadFile', () => {
    it('should upload a file and save metadata', async () => {
      // Mock file to upload
      const mockFile = {
        originalname: 'test-file.jpg',
        size: 12345,
        mimetype: 'image/jpeg',
        buffer: Buffer.from('test'),
      } as Express.Multer.File;

      // Mock source IP address
      const sourceIpAddress = '127.0.0.1';

      // Call the uploadFile method with the mock data
      const result = await fileService.uploadFile(mockFile, sourceIpAddress);

      // Assertions to validate the expected results and interactions
      expect(result.message).toBe('File uploaded successfully');
      expect(result.fileUrl).toBe('http://127.0.0.1:10000/devstoreaccount1/files/test-file.jpg');
      expect(mockFileDocument.save).toHaveBeenCalled(); // Ensure metadata save method was called
      expect(mockBlobServiceClient.getContainerClient).toHaveBeenCalledWith('files'); // Validate container client access
    });
  });
});