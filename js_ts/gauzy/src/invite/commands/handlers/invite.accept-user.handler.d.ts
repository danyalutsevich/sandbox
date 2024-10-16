import { IUser } from '../../../../plugins/contracts/dist/index';
import { ICommandHandler } from '@nestjs/cqrs';
import { AuthService } from '../../../auth/auth.service';
import { InviteService } from '../../invite.service';
import { InviteAcceptUserCommand } from '../invite.accept-user.command';
import { OrganizationService } from '../../../organization/organization.service';
import { TypeOrmUserRepository } from '../../../user/repository/type-orm-user.repository';
/**
 * Use this command for registering all non-employee users.
 * This command first registers a user, then creates a user_organization relation.
 * If the above two steps are successful, it finally sets the invitation status to accepted
 */
export declare class InviteAcceptUserHandler implements ICommandHandler<InviteAcceptUserCommand> {
    private readonly typeOrmUserRepository;
    private readonly inviteService;
    private readonly authService;
    private readonly organizationService;
    constructor(typeOrmUserRepository: TypeOrmUserRepository, inviteService: InviteService, authService: AuthService, organizationService: OrganizationService);
    execute(command: InviteAcceptUserCommand): Promise<IUser>;
}
