import { ICommandHandler } from '@nestjs/cqrs';
import { IEmployee, IInvite, IUser } from '../../../../plugins/contracts/dist/index';
import { AuthService } from '../../../auth/auth.service';
import { InviteService } from '../../invite.service';
import { InviteAcceptEmployeeCommand } from '../invite.accept-employee.command';
import { TypeOrmEmployeeRepository } from '../../../employee/repository/type-orm-employee.repository';
import { TypeOrmOrganizationContactRepository } from '../../../organization-contact/repository/type-orm-organization-contact.repository';
import { TypeOrmOrganizationDepartmentRepository } from '../../../organization-department/repository/type-orm-organization-department.repository';
import { TypeOrmOrganizationProjectRepository } from '../../../organization-project/repository/type-orm-organization-project.repository';
import { TypeOrmOrganizationTeamRepository } from '../../../organization-team/repository/type-orm-organization-team.repository';
import { TypeOrmUserRepository } from '../../../user/repository/type-orm-user.repository';
/**
 * Use this command for registering employees.
 * This command first registers a user, then creates an employee entry for the organization.
 * If the above two steps are successful, it finally sets the invitation status to accepted
 */
export declare class InviteAcceptEmployeeHandler implements ICommandHandler<InviteAcceptEmployeeCommand> {
    private readonly inviteService;
    private readonly authService;
    private readonly typeOrmUserRepository;
    private readonly typeOrmEmployeeRepository;
    private readonly typeOrmOrganizationProjectRepository;
    private readonly typeOrmOrganizationContactRepository;
    private readonly typeOrmOrganizationDepartmentRepository;
    private readonly typeOrmOrganizationTeamRepository;
    constructor(inviteService: InviteService, authService: AuthService, typeOrmUserRepository: TypeOrmUserRepository, typeOrmEmployeeRepository: TypeOrmEmployeeRepository, typeOrmOrganizationProjectRepository: TypeOrmOrganizationProjectRepository, typeOrmOrganizationContactRepository: TypeOrmOrganizationContactRepository, typeOrmOrganizationDepartmentRepository: TypeOrmOrganizationDepartmentRepository, typeOrmOrganizationTeamRepository: TypeOrmOrganizationTeamRepository);
    /**
     * Executes the invite acceptance process for an employee.
     * @param command The command containing the invite acceptance data.
     * @returns The user associated with the invite.
     */
    execute(command: InviteAcceptEmployeeCommand): Promise<IUser>;
    /**
     * Finds an invite by its ID and loads its relations.
     * @param inviteId The ID of the invite to find.
     * @returns The found invite with its relations.
     * @throws NotFoundException if the invite does not exist.
     */
    private findInviteWithRelations;
    /**
     * Finds an existing employee user based on the invite details.
     * @param invite The invite containing the user's email and tenant ID.
     * @returns The found user.
     */
    private findExistingEmployeeUser;
    /**
     * Registers a new user based on the invite details.
     * @param input The user registration input and app integration config.
     * @param invite The invite containing the organization details.
     * @param languageCode The language code for localization.
     * @returns The registered user.
     */
    private registerNewUser;
    /**
     * Creates an employee based on the invite details and user information.
     * @param invite The invite containing the organization details.
     * @param user The user to be associated with the employee.
     * @returns The created employee.
     */
    private createEmployee;
    /**
     * Finds an employee based on the user ID.
     * @param userId The ID of the user to find the employee for.
     * @returns The found employee.
     */
    private findEmployee;
    /**
     * Updates the status of an invite to accepted and associates it with a user.
     * @param inviteId The ID of the invite to update.
     * @param userId The ID of the user who accepted the invite.
     * @returns The updated invite or the update result.
     */
    private updateInviteStatus;
    /**
     * Update employee memberships
     *
     * @param invite
     * @param employee
     */
    updateEmployeeMemberships(invite: IInvite, employee: IEmployee): Promise<void>;
}
