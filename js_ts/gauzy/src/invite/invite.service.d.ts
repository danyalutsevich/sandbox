import { CommandBus } from '@nestjs/cqrs';
import { FindOptionsWhere } from 'typeorm';
import { ConfigService } from '../../plugins/config/dist/index';
import { ICreateEmailInvitesInput, ICreateEmailInvitesOutput, ICreateOrganizationContactInviteInput, LanguagesEnum, IOrganization, IEmployee, IInvite, IInviteResendInput, InviteActionEnum, IUserRegistrationInput, IPagination } from '../../plugins/contracts/dist/index';
import { IAppIntegrationConfig } from '../../plugins/common/dist/index';
import { PaginationParams, TenantAwareCrudService } from './../core/crud';
import { EmailService } from './../email-send/email.service';
import { UserService } from '../user/user.service';
import { RoleService } from './../role/role.service';
import { OrganizationService } from './../organization/organization.service';
import { OrganizationTeamService } from './../organization-team/organization-team.service';
import { OrganizationDepartmentService } from './../organization-department/organization-department.service';
import { OrganizationContactService } from './../organization-contact/organization-contact.service';
import { OrganizationProjectService } from './../organization-project/organization-project.service';
import { AuthService } from './../auth/auth.service';
import { User } from './../user/user.entity';
import { UserOrganizationService } from './../user-organization/user-organization.services';
import { MikroOrmUserRepository, TypeOrmUserRepository } from '../user/repository';
import { MikroOrmEmployeeRepository, TypeOrmEmployeeRepository } from '../employee/repository';
import { MikroOrmOrganizationTeamEmployeeRepository, TypeOrmOrganizationTeamEmployeeRepository } from '../organization-team-employee/repository';
import { MikroOrmInviteRepository, TypeOrmInviteRepository } from './repository';
import { Invite } from './invite.entity';
export declare class InviteService extends TenantAwareCrudService<Invite> {
    readonly typeOrmInviteRepository: TypeOrmInviteRepository;
    readonly mikroOrmInviteRepository: MikroOrmInviteRepository;
    readonly typeOrmUserRepository: TypeOrmUserRepository;
    readonly mikroOrmUserRepository: MikroOrmUserRepository;
    readonly typeOrmEmployeeRepository: TypeOrmEmployeeRepository;
    readonly mikroOrmEmployeeRepository: MikroOrmEmployeeRepository;
    readonly typeOrmOrganizationTeamEmployeeRepository: TypeOrmOrganizationTeamEmployeeRepository;
    readonly mikroOrmOrganizationTeamEmployeeRepository: MikroOrmOrganizationTeamEmployeeRepository;
    private readonly configService;
    private readonly emailService;
    private readonly organizationContactService;
    private readonly organizationDepartmentService;
    private readonly organizationProjectService;
    private readonly organizationService;
    private readonly organizationTeamService;
    private readonly roleService;
    private readonly userService;
    private readonly authService;
    private readonly commandBus;
    private readonly userOrganizationService;
    constructor(typeOrmInviteRepository: TypeOrmInviteRepository, mikroOrmInviteRepository: MikroOrmInviteRepository, typeOrmUserRepository: TypeOrmUserRepository, mikroOrmUserRepository: MikroOrmUserRepository, typeOrmEmployeeRepository: TypeOrmEmployeeRepository, mikroOrmEmployeeRepository: MikroOrmEmployeeRepository, typeOrmOrganizationTeamEmployeeRepository: TypeOrmOrganizationTeamEmployeeRepository, mikroOrmOrganizationTeamEmployeeRepository: MikroOrmOrganizationTeamEmployeeRepository, configService: ConfigService, emailService: EmailService, organizationContactService: OrganizationContactService, organizationDepartmentService: OrganizationDepartmentService, organizationProjectService: OrganizationProjectService, organizationService: OrganizationService, organizationTeamService: OrganizationTeamService, roleService: RoleService, userService: UserService, authService: AuthService, commandBus: CommandBus, userOrganizationService: UserOrganizationService);
    /**
     * Creates all invites. If an email Id already exists, this function will first delete
     * the existing invite and then create a new row with the email address.
     * @param emailInvites Emails Ids to send invite
     */
    createBulk(input: ICreateEmailInvitesInput, languageCode: LanguagesEnum): Promise<ICreateEmailInvitesOutput>;
    /**
     * Generates the register URL for accepting invites.
     * @param origin - The base URL.
     * @param email - The email of the invitee.
     * @param token - The token for the invite.
     * @returns The full URL with query parameters.
     */
    private createAcceptInvitationUrl;
    /**
     * Creates a query parameters string from an object of query parameters.
     * @param queryParams An object containing query parameters.
     * @returns A string representation of the query parameters.
     */
    private createQueryParamsString;
    resendEmail(input: IInviteResendInput, languageCode: LanguagesEnum): Promise<any>;
    sendAcceptInvitationEmail(organization: IOrganization, employee: IEmployee, languageCode: LanguagesEnum): Promise<any>;
    createOrganizationContactInvite(inviteInput: ICreateOrganizationContactInviteInput): Promise<Invite>;
    /**
     * Check, if invite exist or expired for user
     * Validate invited by token
     *
     * @param where
     * @returns
     */
    validateByToken(where: FindOptionsWhere<Invite>): Promise<IInvite>;
    /**
     * Validate invited by code
     *
     * @param where
     * @returns
     */
    validateByCode(where: FindOptionsWhere<Invite>): Promise<IInvite>;
    createToken(email: string): string;
    /**
     * Find All Invites Using Pagination
     *
     * @param options
     * @returns
     */
    findAllInvites(options: PaginationParams<any>): Promise<IPagination<Invite>>;
    /**
     * Finds invites associated with the current user.
     * Retrieves invite items and total count based on the current user's email, status, and expiry date.
     * Supports different ORMs (Object-Relational Mappers): MikroORM and TypeORM.
     *
     * @returns An object containing an array of invite items and the total count of invites.
     */
    getCurrentUserInvites(): Promise<IPagination<IInvite>>;
    /**
     * Handle the response to an invitation action.
     *
     * @param id The ID of the invitation.
     * @param action The action to be performed (accept or reject).
     * @param origin The origin from which the request originated.
     * @param languageCode The language code for localization.
     * @returns A promise that resolves to the updated invitation.
     */
    handleInvitationResponse(id: string, action: InviteActionEnum, origin: string, languageCode: LanguagesEnum): Promise<IInvite>;
    /**
     * Create a new user.
     *
     * @param input The input data for user registration and integration configuration.
     * @param organizationTeamId The ID of the organization team to associate the user with.
     * @param languageCode The language code for localization.
     * @returns A promise that resolves to the created user.
     */
    createUser(input: IUserRegistrationInput & Partial<IAppIntegrationConfig>, organizationTeamId: string, languageCode: LanguagesEnum): Promise<User>;
}
