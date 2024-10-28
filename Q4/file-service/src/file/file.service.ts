

import { Injectable } from '@nestjs/common';
import { BlobServiceClient } from '@azure/storage-blob';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FileDocument } from './file.schema';

// Connection string for the Azure Blob Storage emulator or production use
const AZURE_STORAGE_CONNECTION_STRING = 'UseDevelopmentStorage=true';

@Injectable()
export class FileService {
  private blobServiceClient: BlobServiceClient;

  constructor(
    @InjectModel('File') private fileModel: Model<FileDocument> // Injects the MongoDB file model
  ) {
    // Initialize BlobServiceClient with the connection string
    this.blobServiceClient = BlobServiceClient.fromConnectionString(
      AZURE_STORAGE_CONNECTION_STRING
    );
  }

  /**
   * Handles file upload to Azure Blob Storage and saves file metadata to MongoDB.
   * 
   * @param file - The file object containing metadata and buffer to upload.
   * @param sourceIpAddress - IP address of the upload source.
   * @returns A response object containing a success message and file URL.
   */
  async uploadFile(file: Express.Multer.File, sourceIpAddress: string): Promise<any> {
    const containerClient = this.blobServiceClient.getContainerClient('files');

    // Ensure the blob container 'files' exists or create it with public access
    await containerClient.createIfNotExists({
      access: 'container',
    });

    // Generate unique blob name using the current timestamp and original filename
    const blobName = `${Date.now()}-${file.originalname}`;
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    // Upload file data to Azure Blob Storage
    await blockBlobClient.uploadData(file.buffer);

    // URL to the uploaded file in Blob Storage
    const fileUrl = blockBlobClient.url;

    // Prepare file metadata to save to MongoDB
    const fileMetadata = new this.fileModel({
      name: file.originalname,                           // Original file name
      size: file.size,                                   // File size in bytes
      contentType: file.mimetype,                        // MIME type of the file
      filenameExtension: file.originalname.split('.').pop(), // Extract file extension
      timestampProcessed: new Date(),                    // Current timestamp for processing
      sourceIpAddress,                                   // IP address from upload request
      filePath: fileUrl,                                 // URL to the file in Blob Storage
    });

    // Save the metadata document to MongoDB
    await fileMetadata.save();

    // Return a success response with the file URL
    return { message: 'File uploaded successfully', fileUrl };
  }
}
