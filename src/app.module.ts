import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { FileS3Module } from './file-s3/file-s3.module';
import * as dotenv from 'dotenv';
import { FileS3 } from './file-s3/model/file-s3.model';
import { FileStorageModule } from './file-storage/file-storage.module';
import { FileStorage } from './file-storage/models/file-storage.model';
dotenv.config();

@Module({
    controllers: [],
    providers: [],
    imports: [
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: +(process.env.POSTGRES_PORT),
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB,
            models: [FileS3, FileStorage],
            autoLoadModels: true
        }),
        ConfigModule.forRoot({
            envFilePath: '.env',
            isGlobal: true,
        }),
        FileS3Module,
        FileStorageModule,
    ],
})

export class AppModule { }
