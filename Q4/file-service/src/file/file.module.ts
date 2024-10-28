import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import { FileSchema } from './file.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'File', schema: FileSchema }]),
  ],
  providers: [FileService],
  controllers: [FileController],
})
export class FileModule {}
