import { IContact } from '../../../../plugins/contracts/dist/index';
import { ICommandHandler } from '@nestjs/cqrs';
import { ContactCreateCommand } from '../contact-create.commant';
import { ContactService } from '../../contact.service';
export declare class ContactCreateHandler implements ICommandHandler<ContactCreateCommand> {
    private readonly contactService;
    constructor(contactService: ContactService);
    execute(command: ContactCreateCommand): Promise<IContact>;
}
