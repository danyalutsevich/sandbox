import { Repository } from 'typeorm';
import { ImportRecord } from '../import-record.entity';
export declare class TypeOrmImportRecordRepository extends Repository<ImportRecord> {
    readonly repository: Repository<ImportRecord>;
    constructor(repository: Repository<ImportRecord>);
}
