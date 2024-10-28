import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

//extra imports

import { MongooseModule } from '@nestjs/mongoose';
import { FileModule } from './file/file.module';


@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/filemetadata'),
    FileModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
