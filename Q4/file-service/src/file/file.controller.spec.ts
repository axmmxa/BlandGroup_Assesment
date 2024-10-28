import { Test, TestingModule } from '@nestjs/testing'; // Import necessary testing modules from NestJS
import { FileController } from './file.controller'; // Import the FileController to test
import { FileService } from './file.service'; // Import the FileService, which is used by the controller
import { Request } from 'express'; // Import Request type from express for type annotations

/**
 * Unit tests for the FileController.
 * This suite verifies the behavior of the uploadFile method.
 */
describe('FileController', () => {
  let fileController: FileController; // Declare the fileController instance
  let mockFileService; // Declare a variable to hold the mocked FileService

  /**
   * Set up the testing environment before each test case.
   */
  beforeEach(async () => {
    // Create a mock implementation of FileService
    mockFileService = {
      uploadFile: jest.fn(), // Mock the uploadFile method as a Jest function
    };

    // Create a testing module that provides the FileController and the mocked service
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FileController], // Specify the controller to test
      providers: [
        {
          provide: FileService, // Provide the mocked FileService instead of the real one
          useValue: mockFileService,
        },
      ],
    }).compile(); // Compile the module

    // Retrieve the instance of FileController from the testing module
    fileController = module.get<FileController>(FileController);
  });

  /**
   * Clean up after each test case to reset mocks.
   */
  afterEach(() => {
    jest.clearAllMocks(); // Clear mock calls and instances to prevent interference between tests
  });

  /**
   * Tests for the uploadFile method in FileController.
   */
  describe('uploadFile', () => {
    it('should call fileService.uploadFile and return the response', async () => {
      // Create a mock file object as it would be provided by the file upload middleware
      const mockFile = {
        originalname: 'test-file.jpg', // Name of the file being uploaded
        size: 12345, // Size of the file in bytes
        mimetype: 'image/jpeg', // MIME type of the file
        buffer: Buffer.from('test'), // Buffer containing the file data
      } as Express.Multer.File; // Type assertion to Express.Multer.File

      // Create a mock request object with the IP address
      const mockRequest = {
        ip: '127.0.0.1', // Simulated request IP address
      } as Request; // Type assertion to Request

      // Create a mock response object that simulates the return value from the file service
      const mockResponse = {
        message: 'File uploaded successfully', // Message indicating success
        fileUrl: 'http://127.0.0.1:10000/devstoreaccount1/files/test-file.jpg', // URL of the uploaded file
      };

      // Mock the response from the file service to return the mockResponse
      mockFileService.uploadFile.mockResolvedValue(mockResponse);

      // Call the uploadFile method on the controller with the mock file and request
      const result = await fileController.uploadFile(mockFile, mockRequest);

      // Verify that the uploadFile method was called with the correct parameters
      expect(mockFileService.uploadFile).toHaveBeenCalledWith(mockFile, mockRequest.ip);
      // Check that the result returned from the controller matches the mock response
      expect(result).toEqual(mockResponse);
    });
  });
});
