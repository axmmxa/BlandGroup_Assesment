import { Document, Schema } from 'mongoose';

/**
 * Interface representing the document structure for file metadata in MongoDB.
 * Extends the base Mongoose Document interface to provide strong typing.
 */
export interface FileDocument extends Document {
  name: string;               // Original name of the file
  size: number;               // Size of the file in bytes
  contentType: string;        // MIME type of the file (e.g., 'image/png')
  filenameExtension: string;  // File extension (e.g., '.jpg', '.pdf')
  timestampProcessed: Date;   // Timestamp indicating when the file was processed
  sourceIpAddress: string;    // IP address from which the file was uploaded
  filePath: string;           // Full path to the file in Azure Blob Storage
}

/**
 * Mongoose schema for storing file metadata.
 * Defines structure and default values for each field.
 */
export const FileSchema = new Schema({
  name: { type: String, required: true },
  size: { type: Number, required: true },
  contentType: { type: String, required: true },
  filenameExtension: { type: String, required: true },
  timestampProcessed: { type: Date, default: Date.now }, // Automatically sets to current date
  sourceIpAddress: { type: String, required: true },
  filePath: { type: String, required: true },
});