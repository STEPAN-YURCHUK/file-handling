import { ApiProperty } from '@nestjs/swagger';

export class UploadFilesStorageDto {

    @ApiProperty({ type: 'file', items: { type: 'string', format: 'binary' }, description: 'File to add' })
    readonly file: Express.Multer.File;

}