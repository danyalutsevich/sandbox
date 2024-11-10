import { ICommandHandler } from '@nestjs/cqrs';
import { IOrganizationContact } from '../../../../plugins/contracts/dist/index';
import { OrganizationContactUpdateCommand } from '../organization-contact-update.command';
import { OrganizationContactService } from '../../organization-contact.service';
import { ContactService } from '../../../contact/contact.service';
export declare class OrganizationContactUpdateHandler implements ICommandHandler<OrganizationContactUpdateCommand> {
    private readonly _organizationContactService;
    private readonly _contactService;
    constructor(_organizationContactService: OrganizationContactService, _contactService: ContactService);
    /**
     * Updates an organization contact based on a given command and retrieves the updated contact.
     *
     * @param command Contains the ID and new data for updating the organization contact.
     * @returns A Promise resolving to the updated organization contact.
     * @throws BadRequestException for any errors during the update process.
     */
    execute(command: OrganizationContactUpdateCommand): Promise<IOrganizationContact>;
}
