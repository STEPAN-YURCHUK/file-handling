import { Module } from '@nestjs/common';
import { FileS3Controller } from './file-s3.controller';
import { FileS3Service } from './file-s3.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { FileS3 } from './model/file-s3.model';

@Module({
    controllers: [FileS3Controller],
    providers: [FileS3Service],
    imports: [SequelizeModule.forFeature([FileS3])]
})

export class FileS3Module { }
