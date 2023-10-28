import { Column, DataType, HasOne, Model, Table } from 'sequelize-typescript';

interface FileS3CreationAttrs {
    name: string
}

@Table({ tableName: 'file-s3' })
export class FileS3 extends Model<FileS3, FileS3CreationAttrs> {

    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @Column({ type: DataType.STRING, allowNull: false })
    name: string;

    @Column({ type: DataType.STRING, allowNull: false })
    url: string;

}