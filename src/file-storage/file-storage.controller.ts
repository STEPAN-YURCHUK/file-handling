import { Body, Controller, Delete, Get, Param, Post, Response, UploadedFile, UseInterceptors } from '@nestjs/common';
import { Response as Res } from 'express';
import { FileStorageService } from './file-storage.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('file-storage')
@Controller('file-storage')
export class FileStorageController {

    constructor(private fileStorageService: FileStorageService) {

    }

    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    uploadFileStorage(@UploadedFile() file: Express.Multer.File) {
        return this.fileStorageService.upload(file)
    }

    @Get('/watch/:fileName')
    async watchFile(@Param('fileName') fileName: string, @Response() res: Res) {
        const fileStream = await this.fileStorageService.watchFile(fileName);
        fileStream.pipe(res);
    }

    @Get('/download/:fileName')
    async getFile(@Param('fileName') fileName: string, @Response() res: Res) {
        const file = await this.fileStorageService.downloadFile(fileName);
        res.send(file);
    }

    @Get('one/:id')
    async getOne(@Param('id') id: number) {
        return this.fileStorageService.getOne(id)
    }

    @Get('list')
    async list() {
        return this.fileStorageService.list()
    }

    @Delete('delete/:id')
    async delete(@Param('id') id: number) {
        return this.fileStorageService.deleteForTable(id)
    }

}