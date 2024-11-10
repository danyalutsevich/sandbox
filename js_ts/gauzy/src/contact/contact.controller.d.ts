import { IContact, IPagination } from '../../plugins/contracts/dist/index';
import { CrudController } from './../core/crud';
import { Contact } from './contact.entity';
import { ContactService } from './contact.service';
export declare class ContactController extends CrudController<Contact> {
    private readonly contactService;
    constructor(contactService: ContactService);
    findAll(data: any): Promise<IPagination<IContact>>;
}
