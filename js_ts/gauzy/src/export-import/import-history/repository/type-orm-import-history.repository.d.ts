import { Repository } from 'typeorm';
import { ImportHistory } from '../import-history.entity';
export declare class TypeOrmImportHistoryRepository extends Repository<ImportHistory> {
    readonly repository: Repository<ImportHistory>;
    constructor(repository: Repository<ImportHistory>);
}
