import { Controller, Delete, Get, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { FileS3Service } from './file-s3.service';

@ApiTags('file-s3')
@Controller('file-s3')
export class FileS3Controller {

    constructor(private fileS3Service: FileS3Service) {

    }

    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    uploadFileStatic(@UploadedFile() file: Express.Multer.File) {
        const img = this.fileS3Service.uploadFileS3(file);
        return img
    }

    @Get('list')
    getAll() {
        return this.fileS3Service.getAll()
    }

    @Get('one/:id')
    getOne(@Param('id') id: number) {
        return this.fileS3Service.getOne(id)
    }

    @Delete('delete/:id')
    delete(@Param('id') id: number) {
        return this.fileS3Service.deleteFileS3(id)
    }

}
