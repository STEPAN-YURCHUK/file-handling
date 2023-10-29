import { DeleteObjectCommand, ObjectCannedACL, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { v4 as uuidv4 } from 'uuid';
import { FileS3 } from './model/file-s3.model';

@Injectable()
export class FileS3Service {

    private readonly s3Client: S3Client;

    constructor(@InjectModel(FileS3) private fileS3Repository: typeof FileS3) {
        this.s3Client = new S3Client({
            region: 'eu-north-1',
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            },
        })
    }

    async uploadFileS3(files: Express.Multer.File[]) {
        const result = [];
        for (const file of files) {
            const filename = uuidv4() + '.' + file.originalname.split('.').pop();
            const uploadParams = {
                Bucket: process.env.AWS_BUCKET,
                Key: filename,
                Body: file.buffer,
                ACL: 'public-read' as ObjectCannedACL,
                ContentType: 'image/png',
            };
            const uploadCommand = new PutObjectCommand(uploadParams);
            const fileData = {
                name: filename,
                url: `https://${process.env.AWS_BUCKET}.s3.amazonaws.com/${filename}`,
            };
            try {
                await this.s3Client.send(uploadCommand);
                await this.fileS3Repository.create(fileData);
                result.push(`https://${process.env.AWS_BUCKET}.s3.amazonaws.com/${filename}`);
            } catch (error) {
                throw new Error(`Ошибка загрузки файла в S3: ${error.message}`);
            }
        }
        return result;
    }

    async getAll() {
        return await this.fileS3Repository.findAll();
    }

    async getOne(id: number) {
        return await this.fileS3Repository.findByPk(id);
    }

    async deleteFileS3(id: number) {
        const file = await this.fileS3Repository.findByPk(id);
        const deleteParams = {
            Bucket: process.env.AWS_BUCKET,
            Key: file.name,
        };

        const deleteCommand = new DeleteObjectCommand(deleteParams);

        try {
            await file.destroy();
            await this.s3Client.send(deleteCommand);
            return { message: 'Файл успешно удален из S3.' };
        } catch (error) {
            throw new Error(`Ошибка удаления файла из S3: ${error.message}`);
        }
    }

}
