import { ApiProperty } from '@nestjs/swagger';

export class UploadFilesS3Dto {

    @ApiProperty({ type: 'array', items: { type: 'string', format: 'binary' }, description: 'Files to add' })
    readonly files: Express.Multer.File[];

}