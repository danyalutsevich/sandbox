import { IInvite } from '../../../../plugins/contracts/dist/index';
import { CommandBus, ICommandHandler } from '@nestjs/cqrs';
import { UpdateResult } from 'typeorm';
import { AuthService } from '../../../auth/auth.service';
import { OrganizationContactService } from '../../../organization-contact/organization-contact.service';
import { OrganizationService } from '../../../organization/organization.service';
import { RoleService } from '../../../role/role.service';
import { TenantService } from '../../../tenant/tenant.service';
import { InviteService } from '../../invite.service';
import { InviteAcceptOrganizationContactCommand } from '../invite.accept-organization-contact.command';
export declare class InviteAcceptOrganizationContactHandler implements ICommandHandler<InviteAcceptOrganizationContactCommand> {
    private readonly inviteService;
    private readonly authService;
    private readonly organizationService;
    private readonly organizationContactService;
    private readonly tenantService;
    private readonly roleService;
    private readonly commandBus;
    constructor(inviteService: InviteService, authService: AuthService, organizationService: OrganizationService, organizationContactService: OrganizationContactService, tenantService: TenantService, roleService: RoleService, commandBus: CommandBus);
    execute(command: InviteAcceptOrganizationContactCommand): Promise<IInvite | UpdateResult>;
}
