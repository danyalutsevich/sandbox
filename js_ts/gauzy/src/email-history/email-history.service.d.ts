import { IEmailHistory, IPagination } from '../../plugins/contracts/dist/index';
import { PaginationParams, TenantAwareCrudService } from '../core/crud';
import { EmailHistory } from './email-history.entity';
import { MikroOrmEmailHistoryRepository, TypeOrmEmailHistoryRepository } from './repository';
export declare class EmailHistoryService extends TenantAwareCrudService<EmailHistory> {
    constructor(typeOrmEmailHistoryRepository: TypeOrmEmailHistoryRepository, mikroOrmEmailHistoryRepository: MikroOrmEmailHistoryRepository);
    /**
     * Retrieves a list of email history records with optional filtering.
     * @param filter Optional filtering options.
     * @returns A paginated list of email history records.
     */
    findAll(filter?: PaginationParams<EmailHistory>): Promise<IPagination<IEmailHistory>>;
}
