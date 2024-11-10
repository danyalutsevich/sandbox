import { FindManyOptions } from 'typeorm';
import { IAppIntegrationConfig } from '../../plugins/common/dist/index';
import { IOrganizationTeamJoinRequest, IOrganizationTeamJoinRequestCreateInput, IOrganizationTeamJoinRequestValidateInput, IPagination, LanguagesEnum, OrganizationTeamJoinRequestStatusEnum } from '../../plugins/contracts/dist/index';
import { TenantAwareCrudService } from './../core/crud';
import { EmailService } from './../email-send/email.service';
import { OrganizationTeamJoinRequest } from './organization-team-join-request.entity';
import { OrganizationTeamService } from './../organization-team/organization-team.service';
import { InviteService } from './../invite/invite.service';
import { RoleService } from './../role/role.service';
import { EmployeeService } from './../employee/employee.service';
import { TypeOrmOrganizationTeamJoinRequestRepository } from './repository/type-orm-organization-team-join-request.repository';
import { MikroOrmOrganizationTeamJoinRequestRepository } from './repository/mikro-orm-organization-team-join-request.repository';
import { TypeOrmUserRepository } from '../user/repository/type-orm-user.repository';
import { MikroOrmUserRepository } from '../user/repository/mikro-orm-user.repository';
import { TypeOrmOrganizationTeamEmployeeRepository } from 'organization-team-employee/repository/type-orm-organization-team-employee.repository';
import { MikroOrmOrganizationTeamEmployeeRepository } from 'organization-team-employee/repository/mikro-orm-organization-team-employee.repository';
export declare class OrganizationTeamJoinRequestService extends TenantAwareCrudService<OrganizationTeamJoinRequest> {
    private typeOrmUserRepository;
    protected readonly typeOrmOrganizationTeamEmployeeRepository: TypeOrmOrganizationTeamEmployeeRepository;
    private readonly _employeeService;
    private readonly _organizationTeamService;
    private readonly _emailService;
    private readonly _inviteService;
    private readonly _roleService;
    constructor(typeOrmOrganizationTeamJoinRequestRepository: TypeOrmOrganizationTeamJoinRequestRepository, mikroOrmOrganizationTeamJoinRequestRepository: MikroOrmOrganizationTeamJoinRequestRepository, typeOrmUserRepository: TypeOrmUserRepository, mikroOrmUserRepository: MikroOrmUserRepository, typeOrmOrganizationTeamEmployeeRepository: TypeOrmOrganizationTeamEmployeeRepository, mikroOrmOrganizationTeamEmployeeRepository: MikroOrmOrganizationTeamEmployeeRepository, _employeeService: EmployeeService, _organizationTeamService: OrganizationTeamService, _emailService: EmailService, _inviteService: InviteService, _roleService: RoleService);
    /**
     *
     * @param options
     * @returns
     */
    findAll(options?: FindManyOptions<OrganizationTeamJoinRequest>): Promise<IPagination<OrganizationTeamJoinRequest>>;
    /**
     * Create organization team join request
     *
     * @param entity
     * @param languageCode
     * @returns
     */
    create(entity: IOrganizationTeamJoinRequestCreateInput & Partial<IAppIntegrationConfig>, languageCode?: LanguagesEnum): Promise<IOrganizationTeamJoinRequest>;
    /**
     * Validate organization team join request
     *
     * @param options
     * @returns
     */
    validateJoinRequest(options: IOrganizationTeamJoinRequestValidateInput): Promise<IOrganizationTeamJoinRequest>;
    resendConfirmationCode(entity: IOrganizationTeamJoinRequestCreateInput & Partial<IAppIntegrationConfig>, languageCode?: LanguagesEnum): Promise<Object>;
    acceptRequestToJoin(id: string, action: OrganizationTeamJoinRequestStatusEnum, languageCode: LanguagesEnum): Promise<void>;
}
