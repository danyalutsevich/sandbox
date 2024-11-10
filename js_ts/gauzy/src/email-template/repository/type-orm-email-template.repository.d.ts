import { Repository } from 'typeorm';
import { EmailTemplate } from '../email-template.entity';
export declare class TypeOrmEmailTemplateRepository extends Repository<EmailTemplate> {
    readonly repository: Repository<EmailTemplate>;
    constructor(repository: Repository<EmailTemplate>);
}
