import { Injectable } from '@nestjs/common';
import * as fs from 'fs/promises';
import { createReadStream } from 'fs';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { InjectModel } from '@nestjs/sequelize';
import { FileStorage } from './models/file-storage.model';

@Injectable()
export class FileStorageService {
    private readonly uploadPath = path.join(__dirname, '../../', 'uploads');

    constructor(@InjectModel(FileStorage) private fileStorageRepository: typeof FileStorage) {

    }

    async downloadFile(fileName: string) {
        try {
            const filePath = path.join(this.uploadPath, fileName);
            const file = fs.readFile(filePath);
            return file;
        } catch (error) {
            console.warn('FileUploaderService -> getFile: ', error);
        }
    }

    async watchFile(fileName: string) {
        try {
            const filePath = path.join(this.uploadPath, fileName);
            const fileStream = createReadStream(filePath);
            return fileStream;
        } catch (error) {
            console.warn('FileUploaderService -> getFile: ', error);
        }
    }

    async upload(file: Express.Multer.File): Promise<string> {
        try {
            await this.createFolderIfNotExists(this.uploadPath);
            const filename = uuidv4() + '.' + file.originalname.split('.').pop();
            const filePath = path.join(this.uploadPath, filename);
            await fs.writeFile(filePath, file.buffer);

            const FileData = {
                name: filename,
                url_watch: `http://localhost:3000/file-storage/watch/${filename}`,
                url_download: `http://localhost:3000/file-storage/download/${filename}`
            }
            await this.fileStorageRepository.create(FileData)

            return filename;
        } catch (error) {
            console.warn('FileUploaderService -> uploadLocalFile: ', error);
        }
    }

    async deleteForTable(id: number) {
        const file = await this.fileStorageRepository.findByPk(id)
        await this.delete(file.name)
        await file.destroy()
        return true
    }

    async delete(fileName: string) {
        try {
            const filePath = path.join(this.uploadPath, fileName);
            await fs.unlink(filePath);
        } catch (error) {
            console.warn('FileUploaderService -> deleteLocalFile: ', error);
        }
    }

    async getOne(id: number) {
        return await this.fileStorageRepository.findByPk(id)
    }

    async list() {
        return await this.fileStorageRepository.findAll()
    }

    private async createFolderIfNotExists(folderPath: string) {
        try {
            await fs.access(folderPath);
        } catch (error) {
            await fs.mkdir(folderPath);
        }
    }

}