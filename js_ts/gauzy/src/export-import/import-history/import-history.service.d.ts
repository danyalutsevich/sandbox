import { IPagination } from '../../../plugins/contracts';
import { TenantAwareCrudService } from './../../core/crud';
import { ImportHistory } from './import-history.entity';
import { TypeOrmImportHistoryRepository } from './repository/type-orm-import-history.repository';
import { MikroOrmImportHistoryRepository } from './repository/mikro-orm-import-history.repository';
export declare class ImportHistoryService extends TenantAwareCrudService<ImportHistory> {
    constructor(typeOrmImportHistoryRepository: TypeOrmImportHistoryRepository, mikroOrmImportHistoryRepository: MikroOrmImportHistoryRepository);
    /**
     *
     * @returns
     */
    findAll(): Promise<IPagination<ImportHistory>>;
}
