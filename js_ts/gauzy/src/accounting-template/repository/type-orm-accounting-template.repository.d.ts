import { Repository } from 'typeorm';
import { AccountingTemplate } from '../accounting-template.entity';
export declare class TypeOrmAccountingTemplateRepository extends Repository<AccountingTemplate> {
    readonly repository: Repository<AccountingTemplate>;
    constructor(repository: Repository<AccountingTemplate>);
}
