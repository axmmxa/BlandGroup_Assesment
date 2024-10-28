import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Req,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileService } from './file.service';
import { Request } from 'express';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  /**
   * Handles file uploads and forwards the file metadata along with the source IP
   * address to the file service for processing.
   * 
   * @param file - The uploaded file object, provided by Multer middleware.
   * @param req - The request object, used here to extract the source IP address.
   * @returns Response object containing the result of the file upload processing.
   */
  @Post('upload')
  @UseInterceptors(FileInterceptor('file')) // Middleware to handle file uploads
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Req() req: Request
  ) {
    // Capture source IP address from the incoming request
    const sourceIpAddress = req.ip;

    // Delegate the file processing to the file service
    const response = await this.fileService.uploadFile(file, sourceIpAddress);

    // Return the processed response to the client
    return response;
  }
}