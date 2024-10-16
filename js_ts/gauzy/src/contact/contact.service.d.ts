import { TenantAwareCrudService } from './../core/crud';
import { TypeOrmContactRepository } from './repository/type-orm-contact.repository';
import { MikroOrmContactRepository } from './repository/mikro-orm-contact.repository';
import { Contact } from './contact.entity';
export declare class ContactService extends TenantAwareCrudService<Contact> {
    readonly typeOrmContactRepository: TypeOrmContactRepository;
    readonly mikroOrmContactRepository: MikroOrmContactRepository;
    constructor(typeOrmContactRepository: TypeOrmContactRepository, mikroOrmContactRepository: MikroOrmContactRepository);
}
