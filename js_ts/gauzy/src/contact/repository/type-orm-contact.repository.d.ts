import { Repository } from 'typeorm';
import { Contact } from '../contact.entity';
export declare class TypeOrmContactRepository extends Repository<Contact> {
    readonly repository: Repository<Contact>;
    constructor(repository: Repository<Contact>);
}
