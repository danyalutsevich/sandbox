import { TenantAwareCrudService } from './../../core/crud';
import { ImportRecord } from './../../core/entities/internal';
import { MikroOrmImportRecordRepository } from './repository/mikro-orm-import-record.repository';
import { TypeOrmImportRecordRepository } from './repository/type-orm-import-record.repository';
export declare class ImportRecordService extends TenantAwareCrudService<ImportRecord> {
    readonly typeOrmImportRecordRepository: TypeOrmImportRecordRepository;
    readonly mikroOrmImportRecordRepository: MikroOrmImportRecordRepository;
    constructor(typeOrmImportRecordRepository: TypeOrmImportRecordRepository, mikroOrmImportRecordRepository: MikroOrmImportRecordRepository);
}
