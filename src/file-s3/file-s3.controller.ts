import { Body, Controller, Delete, Get, Param, Post, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileS3Service } from './file-s3.service';
import { UploadFilesS3Dto } from './dto/upload-fileS3.dto';

@ApiTags('file-s3')
@Controller('file-s3')
export class FileS3Controller {

    constructor(private fileS3Service: FileS3Service) {

    }

    @Post('upload')
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(AnyFilesInterceptor())
    uploadFileStatic(@Body() dto: UploadFilesS3Dto, @UploadedFiles() files: Express.Multer.File[]) {
        const img = this.fileS3Service.uploadFileS3(files);
        return img;
    }

    @Get('list')
    getAll() {
        return this.fileS3Service.getAll();
    }

    @Get('one/:id')
    getOne(@Param('id') id: number) {
        return this.fileS3Service.getOne(id);
    }

    @Delete('delete/:id')
    delete(@Param('id') id: number) {
        return this.fileS3Service.deleteFileS3(id);
    }

}
