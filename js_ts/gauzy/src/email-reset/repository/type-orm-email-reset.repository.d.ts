import { Repository } from 'typeorm';
import { EmailReset } from '../email-reset.entity';
export declare class TypeOrmEmailResetRepository extends Repository<EmailReset> {
    readonly repository: Repository<EmailReset>;
    constructor(repository: Repository<EmailReset>);
}
