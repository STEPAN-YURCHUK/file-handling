import { Column, DataType, HasOne, Model, Table } from 'sequelize-typescript';

interface FileStorageCreationAttrs {
    name: string
}

@Table({ tableName: 'file-storage' })
export class FileStorage extends Model<FileStorage, FileStorageCreationAttrs> {

    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @Column({ type: DataType.STRING, allowNull: false })
    name: string;

    @Column({ type: DataType.STRING, allowNull: false })
    url_watch: string;

    @Column({ type: DataType.STRING, allowNull: false })
    url_download: string;

}