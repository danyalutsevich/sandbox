"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InviteService = void 0;
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const jsonwebtoken_1 = require("jsonwebtoken");
const typeorm_1 = require("typeorm");
const date_fns_1 = require("date-fns");
const underscore_1 = require("underscore");
const index_1 = require("../../plugins/config/dist/index");
const index_2 = require("../../plugins/contracts/dist/index");
const index_3 = require("../../plugins/common/dist/index");
const crud_1 = require("./../core/crud");
const constants_1 = require("./../constants");
const context_1 = require("./../core/context");
const utils_1 = require("./../core/utils");
const email_service_1 = require("./../email-send/email.service");
const user_service_1 = require("../user/user.service");
const role_service_1 = require("./../role/role.service");
const organization_service_1 = require("./../organization/organization.service");
const organization_team_service_1 = require("./../organization-team/organization-team.service");
const organization_department_service_1 = require("./../organization-department/organization-department.service");
const organization_contact_service_1 = require("./../organization-contact/organization-contact.service");
const organization_project_service_1 = require("./../organization-project/organization-project.service");
const auth_service_1 = require("./../auth/auth.service");
const user_organization_services_1 = require("./../user-organization/user-organization.services");
const repository_1 = require("../user/repository");
const repository_2 = require("../employee/repository");
const repository_3 = require("../organization-team-employee/repository");
const repository_4 = require("./repository");
const invite_entity_1 = require("./invite.entity");
const commands_1 = require("./commands");
let InviteService = exports.InviteService = class InviteService extends crud_1.TenantAwareCrudService {
    typeOrmInviteRepository;
    mikroOrmInviteRepository;
    typeOrmUserRepository;
    mikroOrmUserRepository;
    typeOrmEmployeeRepository;
    mikroOrmEmployeeRepository;
    typeOrmOrganizationTeamEmployeeRepository;
    mikroOrmOrganizationTeamEmployeeRepository;
    configService;
    emailService;
    organizationContactService;
    organizationDepartmentService;
    organizationProjectService;
    organizationService;
    organizationTeamService;
    roleService;
    userService;
    authService;
    commandBus;
    userOrganizationService;
    constructor(typeOrmInviteRepository, mikroOrmInviteRepository, typeOrmUserRepository, mikroOrmUserRepository, typeOrmEmployeeRepository, mikroOrmEmployeeRepository, typeOrmOrganizationTeamEmployeeRepository, mikroOrmOrganizationTeamEmployeeRepository, configService, emailService, organizationContactService, organizationDepartmentService, organizationProjectService, organizationService, organizationTeamService, roleService, userService, authService, commandBus, userOrganizationService) {
        super(typeOrmInviteRepository, mikroOrmInviteRepository);
        this.typeOrmInviteRepository = typeOrmInviteRepository;
        this.mikroOrmInviteRepository = mikroOrmInviteRepository;
        this.typeOrmUserRepository = typeOrmUserRepository;
        this.mikroOrmUserRepository = mikroOrmUserRepository;
        this.typeOrmEmployeeRepository = typeOrmEmployeeRepository;
        this.mikroOrmEmployeeRepository = mikroOrmEmployeeRepository;
        this.typeOrmOrganizationTeamEmployeeRepository = typeOrmOrganizationTeamEmployeeRepository;
        this.mikroOrmOrganizationTeamEmployeeRepository = mikroOrmOrganizationTeamEmployeeRepository;
        this.configService = configService;
        this.emailService = emailService;
        this.organizationContactService = organizationContactService;
        this.organizationDepartmentService = organizationDepartmentService;
        this.organizationProjectService = organizationProjectService;
        this.organizationService = organizationService;
        this.organizationTeamService = organizationTeamService;
        this.roleService = roleService;
        this.userService = userService;
        this.authService = authService;
        this.commandBus = commandBus;
        this.userOrganizationService = userOrganizationService;
    }
    /**
     * Creates all invites. If an email Id already exists, this function will first delete
     * the existing invite and then create a new row with the email address.
     * @param emailInvites Emails Ids to send invite
     */
    async createBulk(input, languageCode) {
        const originUrl = this.configService.get('clientBaseUrl');
        const tenantId = context_1.RequestContext.currentTenantId() || input.tenantId;
        const { emailIds = [], projectIds = [], organizationContactIds = [], departmentIds = [], teamIds = [], roleId, organizationId, startedWorkOn, appliedDate, invitationExpirationPeriod, fullName, callbackUrl } = input;
        const organizationProjectsPromise = this.organizationProjectService.find({
            where: { id: (0, typeorm_1.In)(projectIds || []), organizationId, tenantId }
        });
        const organizationDepartmentsPromise = this.organizationDepartmentService.find({
            where: { id: (0, typeorm_1.In)(departmentIds || []), organizationId, tenantId }
        });
        const organizationContactsPromise = this.organizationContactService.find({
            where: { id: (0, typeorm_1.In)(organizationContactIds || []), organizationId, tenantId }
        });
        const organizationTeamsPromise = this.organizationTeamService.find({
            where: { id: (0, typeorm_1.In)(teamIds || []), organizationId, tenantId }
        });
        const promisesAll = await Promise.all([
            organizationProjectsPromise,
            organizationDepartmentsPromise,
            organizationContactsPromise,
            organizationTeamsPromise
        ]);
        const [organizationProjects, organizationDepartments, organizationContacts, organizationTeams] = promisesAll;
        // Invited User
        const invitedById = context_1.RequestContext.currentUserId();
        const invitedBy = await this.userService.findOneByIdString(invitedById, {
            relations: { role: true }
        });
        // Invited Organization
        const organization = await this.organizationService.findOneByIdString(organizationId);
        // Invited Role
        let role;
        try {
            const currentRoleId = context_1.RequestContext.currentRoleId();
            // Ensure the current role can only invite others with the 'EMPLOYEE' role
            role = await this.roleService.findOneByIdString(currentRoleId, {
                where: { name: index_2.RolesEnum.EMPLOYEE }
            });
        }
        catch (error) {
            // If the current role is not an 'EMPLOYEE' role, fallback to specified 'roleId'
            role = await this.roleService.findOneByIdString(roleId);
            // Handle unauthorized access if the invitedBy user is not a 'SUPER_ADMIN'
            if (role.name === index_2.RolesEnum.SUPER_ADMIN && invitedBy.role.name !== index_2.RolesEnum.SUPER_ADMIN) {
                throw new common_1.UnauthorizedException();
            }
        }
        let expireDate;
        if (invitationExpirationPeriod === index_2.InvitationExpirationEnum.NEVER) {
            expireDate = null;
        }
        else {
            const inviteExpiryPeriod = invitationExpirationPeriod || organization.inviteExpiryPeriod;
            expireDate = (0, date_fns_1.addDays)(new Date(), inviteExpiryPeriod || index_2.DEFAULT_INVITE_EXPIRY_PERIOD);
        }
        // already existed invites
        const { items: existedInvites } = await this.findAll({
            ...((0, index_3.isNotEmpty)(teamIds) ? { relations: { teams: true } } : {}),
            where: {
                tenantId,
                ...((0, index_3.isNotEmpty)(organizationId) ? { organizationId } : {}),
                ...((0, index_3.isNotEmpty)(emailIds) ? { email: (0, typeorm_1.In)(emailIds) } : {})
            }
        });
        let ignoreInvites = 0;
        const invites = [];
        for await (const email of emailIds) {
            let alreadyInTeamIds = [];
            const code = (0, utils_1.generateRandomAlphaNumericCode)(6);
            const token = (0, jsonwebtoken_1.sign)({ email, code }, index_1.environment.JWT_SECRET, {});
            const organizationTeamEmployees = await this.typeOrmOrganizationTeamEmployeeRepository.find({
                where: {
                    employee: { user: { email } },
                    organizationTeamId: (0, typeorm_1.In)(teamIds)
                }
            });
            if (organizationTeamEmployees.length > 0) {
                alreadyInTeamIds = organizationTeamEmployees.map((organizationTeamEmployee) => organizationTeamEmployee.organizationTeamId);
            }
            const matchedInvites = existedInvites.filter((invite) => invite.email === email &&
                (0, utils_1.getArrayIntersection)(invite.teams?.map((team) => team.id) || [], teamIds)
                    .length > 0);
            if ((0, index_3.isNotEmpty)(matchedInvites)) {
                const needsToInviteTeams = organizationTeams.filter((team) => !alreadyInTeamIds.includes(team.id) &&
                    matchedInvites.every((invite) => invite.status !== index_2.InviteStatusEnum.INVITED));
                if ((0, index_3.isNotEmpty)(needsToInviteTeams)) {
                    invites.push(new invite_entity_1.Invite({
                        token,
                        email,
                        roleId,
                        organizationId,
                        invitedById,
                        tenantId,
                        status: index_2.InviteStatusEnum.INVITED,
                        expireDate,
                        projects: organizationProjects,
                        teams: needsToInviteTeams,
                        departments: organizationDepartments,
                        organizationContacts,
                        actionDate: startedWorkOn || appliedDate,
                        code,
                        fullName
                    }));
                }
                else {
                    ignoreInvites++;
                }
            }
            else {
                invites.push(new invite_entity_1.Invite({
                    token,
                    email,
                    roleId,
                    organizationId,
                    tenantId: context_1.RequestContext.currentTenantId(),
                    invitedById: context_1.RequestContext.currentUserId(),
                    status: index_2.InviteStatusEnum.INVITED,
                    expireDate,
                    projects: organizationProjects,
                    teams: organizationTeams,
                    departments: organizationDepartments,
                    organizationContacts,
                    actionDate: startedWorkOn || appliedDate,
                    code,
                    fullName
                }));
            }
        }
        const items = await this.typeOrmRepository.save(invites);
        items.forEach((item) => {
            let inviteLink = this.createAcceptInvitationUrl(originUrl, item.email, item.token);
            if (input.inviteType === index_2.InvitationTypeEnum.TEAM && callbackUrl) {
                // Convert query params object to string
                const queryParamsString = this.createQueryParamsString({
                    email: item.email,
                    code: item.code
                });
                inviteLink = [callbackUrl, queryParamsString].filter(Boolean).join('?'); // Combine current URL with updated query params
            }
            switch (input.inviteType) {
                case index_2.InvitationTypeEnum.USER:
                    this.emailService.inviteUser({
                        email: item.email,
                        role: role.name,
                        organization: organization,
                        registerUrl: inviteLink,
                        originUrl,
                        languageCode,
                        invitedBy
                    });
                    break;
                case index_2.InvitationTypeEnum.EMPLOYEE:
                case index_2.InvitationTypeEnum.CANDIDATE:
                    this.emailService.inviteEmployee({
                        email: item.email,
                        registerUrl: inviteLink,
                        organizationContacts,
                        departments: organizationDepartments,
                        originUrl,
                        organization: organization,
                        languageCode,
                        invitedBy
                    });
                    break;
                case index_2.InvitationTypeEnum.TEAM:
                    this.emailService.inviteTeamMember({
                        email: item.email,
                        teams: item.teams.map((team) => team.name).join(', '),
                        languageCode,
                        invitedBy,
                        organization,
                        inviteCode: item.code,
                        inviteLink,
                        originUrl
                    });
                    break;
                default:
                    throw new Error(`Unknown invitation type: ${input.inviteType}`);
            }
        });
        return { items, total: items.length, ignored: ignoreInvites };
    }
    /**
     * Generates the register URL for accepting invites.
     * @param origin - The base URL.
     * @param email - The email of the invitee.
     * @param token - The token for the invite.
     * @returns The full URL with query parameters.
     */
    createAcceptInvitationUrl(origin, email, token) {
        const acceptInviteUrl = `${origin}/#/auth/accept-invite`;
        const queryParamsString = this.createQueryParamsString({ email, token });
        return [acceptInviteUrl, queryParamsString].filter(Boolean).join('?'); // Combine current URL with updated query params
    }
    /**
     * Creates a query parameters string from an object of query parameters.
     * @param queryParams An object containing query parameters.
     * @returns A string representation of the query parameters.
     */
    createQueryParamsString(queryParams) {
        return Object.keys(queryParams)
            .map((key) => {
            const value = queryParams[key];
            if (Array.isArray(value)) {
                return value.map((v) => `${encodeURIComponent(key)}=${encodeURIComponent(v)}`).join('&');
            }
            else {
                return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
            }
        })
            .join('&');
    }
    async resendEmail(input, languageCode) {
        const originUrl = this.configService.get('clientBaseUrl');
        const { inviteId, inviteType, callbackUrl } = input;
        /**
         * Invitation
         */
        const invite = await this.findOneByIdString(inviteId, {
            relations: {
                organization: true,
                role: true,
                teams: true
            }
        });
        if (!invite) {
            throw Error('Invite does not exist');
        }
        // Invited organization
        const organization = invite.organization;
        const role = invite.role;
        const email = invite.email;
        const teams = invite.teams;
        /**
         * Invited by the user
         */
        const invitedBy = await this.userService.findOneByIdString(context_1.RequestContext.currentUserId());
        try {
            const code = (0, utils_1.generateRandomAlphaNumericCode)(constants_1.ALPHA_NUMERIC_CODE_LENGTH);
            const token = (0, jsonwebtoken_1.sign)({ email, code }, index_1.environment.JWT_SECRET, {});
            const registerUrl = `${originUrl}/#/auth/accept-invite?email=${encodeURIComponent(email)}&token=${token}`;
            if (inviteType === index_2.InvitationTypeEnum.USER) {
                this.emailService.inviteUser({
                    email,
                    role: role.name,
                    organization,
                    registerUrl,
                    originUrl,
                    languageCode,
                    invitedBy
                });
            }
            else if (inviteType === index_2.InvitationTypeEnum.EMPLOYEE || inviteType === index_2.InvitationTypeEnum.CANDIDATE) {
                this.emailService.inviteEmployee({
                    email,
                    registerUrl,
                    originUrl,
                    organization,
                    languageCode,
                    invitedBy
                });
            }
            else if (inviteType === index_2.InvitationTypeEnum.TEAM) {
                let inviteLink;
                if (callbackUrl) {
                    inviteLink = `${callbackUrl}?email=${encodeURIComponent(email)}&code=${code}`;
                }
                else {
                    inviteLink = `${registerUrl}`;
                }
                this.emailService.inviteTeamMember({
                    email: email,
                    inviteCode: code,
                    teams: teams.map((team) => team.name).join(', '),
                    languageCode,
                    invitedBy,
                    organization,
                    inviteLink,
                    originUrl
                });
            }
            return await this.update(inviteId, {
                status: index_2.InviteStatusEnum.INVITED,
                invitedById: context_1.RequestContext.currentUserId(),
                token,
                code
            });
        }
        catch (error) {
            return error;
        }
    }
    async sendAcceptInvitationEmail(organization, employee, languageCode) {
        const superAdminUsers = await this.userService.getAdminUsers(organization.tenantId);
        try {
            for await (const superAdmin of superAdminUsers) {
                this.emailService.sendAcceptInvitationEmail({
                    email: superAdmin.email,
                    employee,
                    organization,
                    languageCode
                });
            }
        }
        catch (e) {
            console.log('caught', e);
        }
    }
    async createOrganizationContactInvite(inviteInput) {
        const { emailId, roleId, organizationContactId, organizationId, invitedById, originalUrl, languageCode } = inviteInput;
        const organizationContact = await this.organizationContactService.findOneByIdString(organizationContactId);
        const organization = await this.organizationService.findOneByIdString(organizationId);
        const inviterUser = await this.userService.findOneByIdString(invitedById);
        const inviteExpiryPeriod = organization && organization.inviteExpiryPeriod
            ? organization.inviteExpiryPeriod
            : index_2.DEFAULT_INVITE_EXPIRY_PERIOD;
        const expireDate = (0, date_fns_1.addDays)(new Date(), inviteExpiryPeriod);
        const invite = new invite_entity_1.Invite();
        invite.token = this.createToken(emailId);
        invite.email = emailId;
        invite.roleId = roleId;
        invite.organizationId = organizationId;
        invite.tenantId = context_1.RequestContext.currentTenantId();
        invite.invitedById = invitedById;
        invite.status = index_2.InviteStatusEnum.INVITED;
        invite.expireDate = expireDate;
        invite.organizationContacts = [organizationContact];
        const createdInvite = await this.typeOrmRepository.save(invite);
        this.emailService.inviteOrganizationContact(organizationContact, inviterUser, organization, createdInvite, languageCode, originalUrl);
        return createdInvite;
    }
    /**
     * Check, if invite exist or expired for user
     * Validate invited by token
     *
     * @param where
     * @returns
     */
    async validateByToken(where) {
        try {
            const { email, token } = where;
            const payload = (0, jsonwebtoken_1.verify)(token, index_1.environment.JWT_SECRET);
            if (typeof payload === 'object' && 'email' in payload) {
                if (payload.email === email) {
                    const query = this.typeOrmRepository.createQueryBuilder(this.tableName);
                    query.setFindOptions({
                        select: {
                            id: true,
                            email: true,
                            fullName: true,
                            organization: {
                                name: true
                            }
                        },
                        relations: {
                            organization: true
                        }
                    });
                    query.where((qb) => {
                        qb.andWhere({
                            email,
                            token,
                            status: index_2.InviteStatusEnum.INVITED,
                            ...(payload['code']
                                ? {
                                    code: payload['code']
                                }
                                : {})
                        });
                        qb.andWhere([
                            {
                                expireDate: (0, typeorm_1.MoreThanOrEqual)(new Date())
                            },
                            {
                                expireDate: (0, typeorm_1.IsNull)()
                            }
                        ]);
                    });
                    return await query.getOneOrFail();
                }
            }
            throw new common_1.BadRequestException();
        }
        catch (error) {
            throw new common_1.BadRequestException();
        }
    }
    /**
     * Validate invited by code
     *
     * @param where
     * @returns
     */
    async validateByCode(where) {
        const { email, code } = where;
        try {
            const query = this.typeOrmRepository.createQueryBuilder(this.tableName);
            query.setFindOptions({
                select: {
                    id: true,
                    email: true,
                    fullName: true,
                    organization: {
                        name: true
                    }
                },
                relations: {
                    organization: true
                }
            });
            query.where((qb) => {
                qb.andWhere({
                    email,
                    code,
                    status: index_2.InviteStatusEnum.INVITED
                });
                qb.andWhere([
                    {
                        expireDate: (0, typeorm_1.MoreThanOrEqual)(new Date())
                    },
                    {
                        expireDate: (0, typeorm_1.IsNull)()
                    }
                ]);
            });
            return await query.getOneOrFail();
        }
        catch (error) {
            console.error(`Cant validate code '${code}' for email '${email}'`, error);
            throw new common_1.BadRequestException();
        }
    }
    createToken(email) {
        const token = (0, jsonwebtoken_1.sign)({ email }, index_1.environment.JWT_SECRET, {});
        return token;
    }
    /**
     * Find All Invites Using Pagination
     *
     * @param options
     * @returns
     */
    async findAllInvites(options) {
        try {
            return await super.findAll({
                ...(options && options.skip
                    ? {
                        skip: options.take * (options.skip - 1)
                    }
                    : {}),
                ...(options && options.take
                    ? {
                        take: options.take
                    }
                    : {}),
                ...(options && options.relations
                    ? {
                        relations: options.relations
                    }
                    : {}),
                where: {
                    tenantId: context_1.RequestContext.currentTenantId(),
                    ...((0, index_3.isNotEmpty)(options) && (0, index_3.isNotEmpty)(options.where) ? options.where : {}),
                    ...((0, index_3.isNotEmpty)(options) && (0, index_3.isNotEmpty)(options.where)
                        ? (0, index_3.isNotEmpty)(options.where.role)
                            ? {
                                role: {
                                    ...options.where.role
                                }
                            }
                            : {
                                role: {
                                    name: (0, typeorm_1.Not)(index_2.RolesEnum.EMPLOYEE)
                                }
                            }
                        : {}),
                    /**
                     * Organization invites filter by specific projects
                     */
                    ...((0, index_3.isNotEmpty)(options) && (0, index_3.isNotEmpty)(options.where)
                        ? (0, index_3.isNotEmpty)(options.where.projects)
                            ? {
                                projects: {
                                    id: (0, typeorm_1.In)(options.where.projects.id)
                                }
                            }
                            : {}
                        : {}),
                    /**
                     * Organization invites filter by specific teams
                     */
                    ...((0, index_3.isNotEmpty)(options) && (0, index_3.isNotEmpty)(options.where)
                        ? (0, index_3.isNotEmpty)(options.where.teams)
                            ? {
                                teams: {
                                    id: (0, typeorm_1.In)(options.where.teams.id)
                                }
                            }
                            : {}
                        : {})
                }
            });
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    /**
     * Finds invites associated with the current user.
     * Retrieves invite items and total count based on the current user's email, status, and expiry date.
     * Supports different ORMs (Object-Relational Mappers): MikroORM and TypeORM.
     *
     * @returns An object containing an array of invite items and the total count of invites.
     */
    async getCurrentUserInvites() {
        try {
            let total;
            let items = [];
            const user = context_1.RequestContext.currentUser();
            // Define common parameters for querying
            const options = {
                select: {
                    id: true,
                    expireDate: true,
                    teams: {
                        id: true,
                        name: true
                    }
                },
                where: [
                    {
                        email: user.email,
                        status: index_2.InviteStatusEnum.INVITED,
                        expireDate: (0, typeorm_1.MoreThanOrEqual)(new Date()),
                        isActive: true,
                        isArchived: false
                    },
                    {
                        email: user.email,
                        status: index_2.InviteStatusEnum.INVITED,
                        expireDate: (0, typeorm_1.IsNull)(),
                        isActive: true,
                        isArchived: false
                    }
                ],
                relations: { teams: true }
            };
            switch (this.ormType) {
                case utils_1.MultiORMEnum.MikroORM:
                    const { where, mikroOptions } = (0, utils_1.parseTypeORMFindToMikroOrm)(options);
                    [items, total] = (await this.mikroOrmInviteRepository.findAndCount(where, mikroOptions));
                    items = items.map((entity) => this.serialize(entity));
                    break;
                case utils_1.MultiORMEnum.TypeORM:
                    [items, total] = await this.typeOrmInviteRepository.findAndCount(options);
                    break;
                default:
                    throw new Error(`Not implemented for ${this.ormType}`);
            }
            return { items, total };
        }
        catch (error) {
            // Handle the error here, e.g., logging, returning an error response, etc.
            console.error('An error occurred in get current user tnvites:', error);
            throw new common_1.BadRequestException(error); // Re-throwing the error for higher-level handling if needed
        }
    }
    /**
     * Handle the response to an invitation action.
     *
     * @param id The ID of the invitation.
     * @param action The action to be performed (accept or reject).
     * @param origin The origin from which the request originated.
     * @param languageCode The language code for localization.
     * @returns A promise that resolves to the updated invitation.
     */
    async handleInvitationResponse(id, action, origin, languageCode) {
        try {
            const user = context_1.RequestContext.currentUser();
            const currentTenantId = context_1.RequestContext.currentTenantId();
            const query = this.typeOrmRepository.createQueryBuilder(this.tableName);
            query.setFindOptions({
                select: {
                    id: true,
                    code: true,
                    token: true,
                    email: true,
                    fullName: true,
                    organizationId: true,
                    invitedById: true,
                    tenantId: true,
                    teams: {
                        id: true,
                        name: true
                    }
                },
                relations: {
                    teams: true,
                    tenant: true,
                    role: true
                }
            });
            query.where((qb) => {
                qb.andWhere({
                    id,
                    email: user.email,
                    status: index_2.InviteStatusEnum.INVITED
                });
                qb.andWhere([
                    {
                        expireDate: (0, typeorm_1.MoreThanOrEqual)(new Date())
                    },
                    {
                        expireDate: (0, typeorm_1.IsNull)()
                    }
                ]);
            });
            const invitation = await query.getOne();
            if (!invitation) {
                throw new common_1.NotFoundException('You do not have any invitation.');
            }
            const { fullName, email, tenant, tenantId, role, organizationId, invitedById, id: inviteId, token, code, teams } = invitation;
            let invitedTenantUser;
            if (currentTenantId !== tenantId) {
                invitedTenantUser = await this.typeOrmUserRepository.findOne({
                    where: { email, tenantId },
                    relations: {
                        tenant: true,
                        role: true
                    }
                });
            }
            /**
             * ACCEPTED
             */
            if (action === index_2.InviteActionEnum.ACCEPTED) {
                /**
                 * Accepted Case - 1
                 * Current user is belong to invited tenant
                 */
                if (user.tenantId === tenantId) {
                    await this.commandBus.execute(new commands_1.InviteAcceptCommand({
                        user,
                        email,
                        token,
                        code,
                        originalUrl: origin
                    }, languageCode));
                }
                /**
                 * Accepted Case - 2
                 * Current user is already part of invited tenant as separate user
                 */
                if (invitedTenantUser) {
                    const employee = await this.typeOrmEmployeeRepository.findOneOrFail({
                        where: {
                            userId: invitedTenantUser.id
                        }
                    });
                    if (employee) {
                        const [team] = teams;
                        /**
                         * Add employee to invited team
                         */
                        await this.typeOrmOrganizationTeamEmployeeRepository.save({
                            employeeId: employee.id,
                            organizationTeamId: team.id,
                            roleId: invitedTenantUser.roleId,
                            tenantId,
                            organizationId
                        });
                        await this.typeOrmRepository.update(inviteId, {
                            status: index_2.InviteStatusEnum.ACCEPTED,
                            userId: invitedTenantUser.id
                        });
                    }
                }
                /**
                 * Accepted Case - 3
                 * Current user is not belong to invited tenant & current user email with invited tenant is not present
                 */
                if (user.tenantId !== tenantId && !invitedTenantUser) {
                    const [team] = teams;
                    const names = fullName?.split(' ');
                    const newTenantUser = await this.createUser({
                        user: {
                            firstName: (names && names.length && names[0]) || '',
                            lastName: (names && names.length && names[1]) || '',
                            email: email,
                            tenant: tenant,
                            role: role
                        },
                        organizationId,
                        inviteId,
                        createdById: invitedById
                    }, team.id, languageCode);
                    await this.typeOrmRepository.update(inviteId, {
                        status: index_2.InviteStatusEnum.ACCEPTED,
                        userId: newTenantUser.id
                    });
                }
            }
            /**
             * REJECTED
             */
            if (action === index_2.InviteActionEnum.REJECTED) {
                await this.typeOrmRepository.update(id, {
                    status: index_2.InviteStatusEnum.REJECTED
                });
            }
            return await this.typeOrmRepository.findOne({
                where: { id },
                select: { status: true }
            });
        }
        catch (error) {
            // Handle the error here, e.g., logging, returning an error response, etc.
            console.error('An error occurred when accept invitation by ID:', error);
            throw new common_1.BadRequestException(error);
        }
    }
    /**
     * Create a new user.
     *
     * @param input The input data for user registration and integration configuration.
     * @param organizationTeamId The ID of the organization team to associate the user with.
     * @param languageCode The language code for localization.
     * @returns A promise that resolves to the created user.
     */
    async createUser(input, organizationTeamId, languageCode) {
        let tenant = input.user.tenant;
        if (input.createdById) {
            const creatingUser = await this.typeOrmUserRepository.findOneOrFail({
                where: { id: input.createdById },
                relations: { tenant: true }
            });
            tenant = creatingUser.tenant;
        }
        /**
         * Register new user
         */
        const create = this.typeOrmUserRepository.create({
            ...input.user,
            tenant,
            ...(input.password ? { hash: await this.authService.getPasswordHash(input.password) } : {})
        });
        const entity = await this.typeOrmUserRepository.save(create);
        /**
         * Email automatically verified after accept invitation
         */
        await this.typeOrmUserRepository.update(entity.id, {
            ...(input.inviteId ? { emailVerifiedAt: (0, utils_1.freshTimestamp)() } : {})
        });
        /**
         * Find latest register user with role
         */
        const user = await this.typeOrmUserRepository.findOne({
            where: { id: entity.id },
            relations: { role: true }
        });
        if (input.organizationId) {
            /**
             * Add user to invited Organization
             */
            await this.userOrganizationService.addUserToOrganization(user, input.organizationId);
            /**
             * Create employee associated to invited organization and tenant
             */
            const employee = await this.typeOrmEmployeeRepository.save({
                organizationId: input.organizationId,
                tenantId: tenant.id,
                userId: user.id,
                startedWorkOn: (0, utils_1.freshTimestamp)()
            });
            /**
             * Add employee to invited team
             */
            await this.typeOrmOrganizationTeamEmployeeRepository.save({
                employeeId: employee.id,
                organizationTeamId,
                tenantId: user.tenantId,
                organizationId: input.organizationId,
                roleId: user.roleId
            });
        }
        // Extract integration information
        let integration = (0, underscore_1.pick)(input, ['appName', 'appLogo', 'appSignature', 'appLink', 'companyLink', 'companyName']);
        this.emailService.welcomeUser(input.user, languageCode, input.organizationId, input.originalUrl, integration);
        return user;
    }
};
exports.InviteService = InviteService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [repository_4.TypeOrmInviteRepository,
        repository_4.MikroOrmInviteRepository,
        repository_1.TypeOrmUserRepository,
        repository_1.MikroOrmUserRepository,
        repository_2.TypeOrmEmployeeRepository,
        repository_2.MikroOrmEmployeeRepository,
        repository_3.TypeOrmOrganizationTeamEmployeeRepository,
        repository_3.MikroOrmOrganizationTeamEmployeeRepository,
        index_1.ConfigService,
        email_service_1.EmailService,
        organization_contact_service_1.OrganizationContactService,
        organization_department_service_1.OrganizationDepartmentService,
        organization_project_service_1.OrganizationProjectService,
        organization_service_1.OrganizationService,
        organization_team_service_1.OrganizationTeamService,
        role_service_1.RoleService,
        user_service_1.UserService,
        auth_service_1.AuthService,
        cqrs_1.CommandBus,
        user_organization_services_1.UserOrganizationService])
], InviteService);
//# sourceMappingURL=invite.service.js.map