import { ICommandHandler } from '@nestjs/cqrs';
import { IUser } from '../../../../plugins/contracts/dist/index';
import { AuthService } from '../../../auth/auth.service';
import { InviteService } from '../../invite.service';
import { InviteAcceptCandidateCommand } from '../invite.accept-candidate.command';
import { TypeOrmUserRepository } from '../../../user/repository/type-orm-user.repository';
import { TypeOrmCandidateRepository } from '../../../candidate/repository/type-orm-candidate.repository';
/**
 * Use this command for registering candidates.
 * This command first registers a user, then creates an candidate entry for the organization.
 * If the above two steps are successful, it finally sets the invitation status to accepted
 */
export declare class InviteAcceptCandidateHandler implements ICommandHandler<InviteAcceptCandidateCommand> {
    private readonly inviteService;
    private readonly authService;
    private readonly typeOrmUserRepository;
    private readonly typeOrmCandidateRepository;
    constructor(inviteService: InviteService, authService: AuthService, typeOrmUserRepository: TypeOrmUserRepository, typeOrmCandidateRepository: TypeOrmCandidateRepository);
    execute(command: InviteAcceptCandidateCommand): Promise<IUser>;
}
