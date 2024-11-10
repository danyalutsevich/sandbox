import { Repository } from 'typeorm';
import { CustomSmtp } from '../custom-smtp.entity';
export declare class TypeOrmCustomSmtpRepository extends Repository<CustomSmtp> {
    readonly repository: Repository<CustomSmtp>;
    constructor(repository: Repository<CustomSmtp>);
}
