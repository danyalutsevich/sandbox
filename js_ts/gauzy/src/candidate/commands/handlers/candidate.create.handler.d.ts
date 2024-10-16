import { CommandBus, ICommandHandler } from '@nestjs/cqrs';
import { ICandidate } from '../../../../plugins/contracts/dist/index';
import { CandidateCreateCommand } from '../candidate.create.command';
import { AuthService } from './../../../auth/auth.service';
import { CandidateService } from '../../candidate.service';
import { RoleService } from './../../../role/role.service';
import { UserOrganizationService } from './../../../user-organization/user-organization.services';
import { EmailService } from './../../../email-send/email.service';
export declare class CandidateCreateHandler implements ICommandHandler<CandidateCreateCommand> {
    private readonly _commandBus;
    private readonly _authService;
    private readonly _candidateService;
    private readonly _roleService;
    private readonly _userOrganizationService;
    private readonly _emailService;
    constructor(_commandBus: CommandBus, _authService: AuthService, _candidateService: CandidateService, _roleService: RoleService, _userOrganizationService: UserOrganizationService, _emailService: EmailService);
    /**
     * Executes the candidate creation process.
     *
     * @param command - The command containing the necessary information to create a candidate.
     * @returns A promise that resolves to the created candidate.
     * @throws BadRequestException if any error occurs during the candidate creation process.
     */
    execute(command: CandidateCreateCommand): Promise<ICandidate>;
}
