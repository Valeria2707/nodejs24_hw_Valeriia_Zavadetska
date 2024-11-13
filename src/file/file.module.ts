import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { storage } from './storage.config';
import { FileController } from './file.controller';
import { FileService } from './file.service';

@Module({
  imports: [
    MulterModule.register({
      storage,
    }),
  ],
  controllers: [FileController],
  providers: [FileService],
})
export class FileModule {}
