import { IOrganizationContact } from '../../../../plugins/contracts/dist/index';
import { ICommandHandler } from '@nestjs/cqrs';
import { UserService } from '../../../user/user.service';
import { InviteOrganizationContactCommand } from '../invite.organization-contact.command';
import { OrganizationContactService } from '../../../organization-contact/organization-contact.service';
import { InviteService } from '../../invite.service';
import { RoleService } from '../../../role/role.service';
/**
 * Sends an invitation email to the organization organizationContact's primaryEmail
 */
export declare class InviteOrganizationContactHandler implements ICommandHandler<InviteOrganizationContactCommand> {
    private readonly organizationContactService;
    private readonly inviteService;
    private readonly userService;
    private readonly roleService;
    constructor(organizationContactService: OrganizationContactService, inviteService: InviteService, userService: UserService, roleService: RoleService);
    execute(command: InviteOrganizationContactCommand): Promise<IOrganizationContact>;
    /**
     * This function is used to make sure we are not sending an invitation email to a user that
     * exists for the same tenant.
     *
     * @param email Email address of the user to check
     * @param tenantId Tenant id of the contact organization
     */
    private userExistsForSameTenant;
}
