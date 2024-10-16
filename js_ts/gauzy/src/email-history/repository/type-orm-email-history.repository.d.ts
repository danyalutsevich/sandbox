import { Repository } from 'typeorm';
import { EmailHistory } from '../email-history.entity';
export declare class TypeOrmEmailHistoryRepository extends Repository<EmailHistory> {
    readonly repository: Repository<EmailHistory>;
    constructor(repository: Repository<EmailHistory>);
}
