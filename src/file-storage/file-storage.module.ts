import { Module } from '@nestjs/common';
import { FileStorageController } from './file-storage.controller';
import { FileStorageService } from './file-storage.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { FileStorage } from './models/file-storage.model';

@Module({
  controllers: [FileStorageController],
  providers: [FileStorageService],
  imports: [SequelizeModule.forFeature([FileStorage])]
})
export class FileStorageModule {}
