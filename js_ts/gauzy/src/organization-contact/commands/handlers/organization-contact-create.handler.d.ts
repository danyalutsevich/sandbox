import { IOrganizationContact } from '../../../../plugins/contracts/dist/index';
import { ICommandHandler } from '@nestjs/cqrs';
import { OrganizationContactCreateCommand } from '../organization-contact-create.command';
import { OrganizationContactService } from '../../organization-contact.service';
import { OrganizationProjectService } from './../../../organization-project/organization-project.service';
import { ContactService } from 'contact/contact.service';
export declare class OrganizationContactCreateHandler implements ICommandHandler<OrganizationContactCreateCommand> {
    private readonly _organizationContactService;
    private readonly _organizationProjectService;
    private readonly _contactService;
    constructor(_organizationContactService: OrganizationContactService, _organizationProjectService: OrganizationProjectService, _contactService: ContactService);
    /**
     * Executes the creation of an organization contact.
     *
     * @param command An instance of OrganizationContactCreateCommand containing the necessary input for creating a new organization contact.
     * @returns A promise that resolves to the newly created organization contact (IOrganizationContact).
     */
    execute(command: OrganizationContactCreateCommand): Promise<IOrganizationContact>;
}
