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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InviteAcceptEmployeeHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const typeorm_1 = require("@nestjs/typeorm");
const index_1 = require("../../../../plugins/contracts/dist/index");
const auth_service_1 = require("../../../auth/auth.service");
const invite_service_1 = require("../../invite.service");
const invite_accept_employee_command_1 = require("../invite.accept-employee.command");
const internal_1 = require("./../../../core/entities/internal");
const type_orm_employee_repository_1 = require("../../../employee/repository/type-orm-employee.repository");
const type_orm_organization_contact_repository_1 = require("../../../organization-contact/repository/type-orm-organization-contact.repository");
const type_orm_organization_department_repository_1 = require("../../../organization-department/repository/type-orm-organization-department.repository");
const type_orm_organization_project_repository_1 = require("../../../organization-project/repository/type-orm-organization-project.repository");
const type_orm_organization_team_repository_1 = require("../../../organization-team/repository/type-orm-organization-team.repository");
const type_orm_user_repository_1 = require("../../../user/repository/type-orm-user.repository");
const common_1 = require("@nestjs/common");
/**
 * Use this command for registering employees.
 * This command first registers a user, then creates an employee entry for the organization.
 * If the above two steps are successful, it finally sets the invitation status to accepted
 */
let InviteAcceptEmployeeHandler = exports.InviteAcceptEmployeeHandler = class InviteAcceptEmployeeHandler {
    inviteService;
    authService;
    typeOrmUserRepository;
    typeOrmEmployeeRepository;
    typeOrmOrganizationProjectRepository;
    typeOrmOrganizationContactRepository;
    typeOrmOrganizationDepartmentRepository;
    typeOrmOrganizationTeamRepository;
    constructor(inviteService, authService, typeOrmUserRepository, typeOrmEmployeeRepository, typeOrmOrganizationProjectRepository, typeOrmOrganizationContactRepository, typeOrmOrganizationDepartmentRepository, typeOrmOrganizationTeamRepository) {
        this.inviteService = inviteService;
        this.authService = authService;
        this.typeOrmUserRepository = typeOrmUserRepository;
        this.typeOrmEmployeeRepository = typeOrmEmployeeRepository;
        this.typeOrmOrganizationProjectRepository = typeOrmOrganizationProjectRepository;
        this.typeOrmOrganizationContactRepository = typeOrmOrganizationContactRepository;
        this.typeOrmOrganizationDepartmentRepository = typeOrmOrganizationDepartmentRepository;
        this.typeOrmOrganizationTeamRepository = typeOrmOrganizationTeamRepository;
    }
    /**
     * Executes the invite acceptance process for an employee.
     * @param command The command containing the invite acceptance data.
     * @returns The user associated with the invite.
     */
    async execute(command) {
        const { input, languageCode } = command;
        const { inviteId } = input;
        const invite = await this.findInviteWithRelations(inviteId);
        const { organization } = invite;
        if (!organization.invitesAllowed) {
            throw new Error('Organization no longer allows invites');
        }
        let user;
        let employee;
        try {
            // Find existing employee user
            user = await this.findExistingEmployeeUser(invite);
            // Implementation to find an employee by user ID
            employee = await this.findEmployee(user.id);
        }
        catch (error) {
            // New user registers before accepting the invitation
            user = await this.registerNewUser(input, invite, languageCode);
            // Create employee after creating user
            employee = await this.createEmployee(invite, user);
        }
        // Implementation for updating employee memberships based on the invite details
        await this.updateEmployeeMemberships(invite, employee);
        // Accept invitation
        await this.updateInviteStatus(inviteId, user.id);
        return user;
    }
    /**
     * Finds an invite by its ID and loads its relations.
     * @param inviteId The ID of the invite to find.
     * @returns The found invite with its relations.
     * @throws NotFoundException if the invite does not exist.
     */
    async findInviteWithRelations(inviteId) {
        const invite = await this.inviteService.findOneByIdString(inviteId, {
            relations: {
                projects: { members: true },
                departments: { members: true },
                organizationContacts: { members: true },
                teams: { members: true },
                organization: true
            }
        });
        if (!invite) {
            throw new common_1.NotFoundException('Invite does not exist');
        }
        return invite;
    }
    /**
     * Finds an existing employee user based on the invite details.
     * @param invite The invite containing the user's email and tenant ID.
     * @returns The found user.
     */
    async findExistingEmployeeUser(invite) {
        const { tenantId, email } = invite;
        return await this.typeOrmUserRepository.findOneOrFail({
            where: {
                email,
                tenantId,
                role: { name: index_1.RolesEnum.EMPLOYEE }
            },
            order: { createdAt: 'DESC' }
        });
    }
    /**
     * Registers a new user based on the invite details.
     * @param input The user registration input and app integration config.
     * @param invite The invite containing the organization details.
     * @param languageCode The language code for localization.
     * @returns The registered user.
     */
    async registerNewUser(input, invite, languageCode) {
        const { id: organizationId, tenantId } = invite.organization;
        return await this.authService.register({
            ...input,
            user: { ...input.user, tenant: { id: tenantId } },
            organizationId,
            inviteId: invite.id
        }, languageCode);
    }
    /**
     * Creates an employee based on the invite details and user information.
     * @param invite The invite containing the organization details.
     * @param user The user to be associated with the employee.
     * @returns The created employee.
     */
    async createEmployee(invite, user) {
        const { organization, tenantId, actionDate } = invite;
        // Create employee after creating user
        const employee = this.typeOrmEmployeeRepository.create({
            user,
            organization,
            tenantId,
            startedWorkOn: actionDate || null,
            isActive: true,
            isArchived: false
        });
        return await this.typeOrmEmployeeRepository.save(employee);
    }
    /**
     * Finds an employee based on the user ID.
     * @param userId The ID of the user to find the employee for.
     * @returns The found employee.
     */
    async findEmployee(userId) {
        return await this.typeOrmEmployeeRepository.findOneOrFail({
            where: { userId, user: { id: userId } }
        });
    }
    /**
     * Updates the status of an invite to accepted and associates it with a user.
     * @param inviteId The ID of the invite to update.
     * @param userId The ID of the user who accepted the invite.
     * @returns The updated invite or the update result.
     */
    async updateInviteStatus(inviteId, userId) {
        return await this.inviteService.update(inviteId, {
            status: index_1.InviteStatusEnum.ACCEPTED,
            userId
        });
    }
    /**
     * Update employee memberships
     *
     * @param invite
     * @param employee
     */
    async updateEmployeeMemberships(invite, employee) {
        //Update project members
        if (invite.projects) {
            invite.projects.forEach(async (project) => {
                let members = project.members || [];
                members = [...members, employee];
                /**
                 * Creates a new entity instance and copies all entity properties from this object into a new entity.
                 */
                const create = this.typeOrmOrganizationProjectRepository.create({
                    ...project,
                    members
                });
                //This will call save() on the project (and not really create a new organization project)
                await this.typeOrmOrganizationProjectRepository.save(create);
            });
        }
        //Update organization Contacts members
        if (invite.organizationContacts) {
            invite.organizationContacts.forEach(async (organizationContact) => {
                let members = organizationContact.members || [];
                members = [...members, employee];
                /**
                 * Creates a new entity instance and copies all entity properties from this object into a new entity.
                 */
                const create = this.typeOrmOrganizationContactRepository.create({
                    ...organizationContact,
                    members
                });
                //This will call save() on the project (and not really create a new organization contact)
                await this.typeOrmOrganizationContactRepository.save(create);
            });
        }
        //Update department members
        if (invite.departments) {
            invite.departments.forEach(async (department) => {
                let members = department.members || [];
                members = [...members, employee];
                /**
                 * Creates a new entity instance and copies all entity properties from this object into a new entity.
                 */
                const create = this.typeOrmOrganizationDepartmentRepository.create({
                    ...department,
                    members
                });
                //This will call save() on the department (and not really create a new organization department)
                await this.typeOrmOrganizationDepartmentRepository.save(create);
            });
        }
        //Update team members
        if (invite.teams) {
            invite.teams.forEach(async (team) => {
                let members = team.members || [];
                const member = new internal_1.OrganizationTeamEmployee();
                member.organizationId = employee.organizationId;
                member.tenantId = employee.tenantId;
                member.employee = employee;
                members = [...members, member];
                /**
                 * Creates a new entity instance and copies all entity properties from this object into a new entity.
                 */
                const create = this.typeOrmOrganizationTeamRepository.create({
                    ...team,
                    members
                });
                //This will call save() on the department (and not really create a new organization department)
                await this.typeOrmOrganizationTeamRepository.save(create);
            });
        }
    }
};
exports.InviteAcceptEmployeeHandler = InviteAcceptEmployeeHandler = __decorate([
    (0, cqrs_1.CommandHandler)(invite_accept_employee_command_1.InviteAcceptEmployeeCommand),
    __param(2, (0, typeorm_1.InjectRepository)(internal_1.User)),
    __param(3, (0, typeorm_1.InjectRepository)(internal_1.Employee)),
    __param(4, (0, typeorm_1.InjectRepository)(internal_1.OrganizationProject)),
    __param(5, (0, typeorm_1.InjectRepository)(internal_1.OrganizationContact)),
    __param(6, (0, typeorm_1.InjectRepository)(internal_1.OrganizationDepartment)),
    __param(7, (0, typeorm_1.InjectRepository)(internal_1.OrganizationTeam)),
    __metadata("design:paramtypes", [invite_service_1.InviteService,
        auth_service_1.AuthService,
        type_orm_user_repository_1.TypeOrmUserRepository,
        type_orm_employee_repository_1.TypeOrmEmployeeRepository,
        type_orm_organization_project_repository_1.TypeOrmOrganizationProjectRepository,
        type_orm_organization_contact_repository_1.TypeOrmOrganizationContactRepository,
        type_orm_organization_department_repository_1.TypeOrmOrganizationDepartmentRepository,
        type_orm_organization_team_repository_1.TypeOrmOrganizationTeamRepository])
], InviteAcceptEmployeeHandler);
//# sourceMappingURL=invite.accept-employee.handler.js.map