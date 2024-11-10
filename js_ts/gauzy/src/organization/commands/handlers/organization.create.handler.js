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
exports.OrganizationCreateHandler = void 0;
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const faker_1 = require("@faker-js/faker");
const index_1 = require("../../../../plugins/contracts/dist/index");
const user_service_1 = require("../../../user/user.service");
const user_organization_services_1 = require("../../../user-organization/user-organization.services");
const organization_service_1 = require("../../organization.service");
const contact_service_1 = require("../../../contact/contact.service");
const organization_create_command_1 = require("../organization.create.command");
const commands_1 = require("./../../../reports/commands");
const context_1 = require("../../../core/context");
const import_record_1 = require("./../../../export-import/import-record");
const commands_2 = require("./../../../tasks/statuses/commands");
const commands_3 = require("./../../../tasks/sizes/commands");
const commands_4 = require("./../../../tasks/priorities/commands");
const commands_5 = require("./../../../tasks/issue-type/commands");
const commands_6 = require("../../../organization-task-setting/commands");
let OrganizationCreateHandler = exports.OrganizationCreateHandler = class OrganizationCreateHandler {
    commandBus;
    organizationService;
    userOrganizationService;
    userService;
    contactService;
    constructor(commandBus, organizationService, userOrganizationService, userService, contactService) {
        this.commandBus = commandBus;
        this.organizationService = organizationService;
        this.userOrganizationService = userOrganizationService;
        this.userService = userService;
        this.contactService = contactService;
    }
    /**
     * Asynchronously executes the process of creating a new organization, along with associated tasks such as
     * adding users to the organization, creating contact details, executing various update tasks, and handling import records.
     * This function encapsulates several steps, each responsible for a part of the organization creation process.
     *
     * @param command An instance of OrganizationCreateCommand, containing the input data and settings required to create the organization.
     * @returns A promise that resolves to an instance of IOrganization, representing the newly created organization.
     */
    async execute(command) {
        try {
            const { input } = command;
            const { isImporting = false, sourceId = null, userOrganizationSourceId = null } = input;
            const tenantId = context_1.RequestContext.currentTenantId();
            const admins = [];
            // 1. Get all Super Admin Users of the Tenant
            const superAdminUsers = await this.userService.find({
                where: {
                    tenantId,
                    role: {
                        name: index_1.RolesEnum.SUPER_ADMIN,
                        tenantId
                    },
                },
            });
            admins.push(...superAdminUsers);
            // 2. Organization will add to all SUPER_ADMIN/ADMIN users, if ADMIN create organization.
            if (context_1.RequestContext.hasRole(index_1.RolesEnum.ADMIN)) {
                const adminUsers = await this.userService.find({
                    where: {
                        tenantId,
                        role: {
                            name: index_1.RolesEnum.ADMIN,
                            tenantId
                        },
                    },
                });
                admins.push(...adminUsers);
            }
            let { contact = {} } = input;
            delete input['contact'];
            // 3. Create organization
            const organization = await this.organizationService.create({
                ...input,
                upworkOrganizationId: input.upworkOrganizationId || null,
                upworkOrganizationName: input.upworkOrganizationName || null,
                // Simplify boolean assignments
                futureDateAllowed: input.futureDateAllowed !== false,
                show_profits: input.show_profits === true,
                show_bonuses_paid: input.show_bonuses_paid === true,
                show_income: input.show_income === true,
                show_total_hours: input.show_total_hours === true,
                show_projects_count: input.show_projects_count !== false,
                show_minimum_project_size: input.show_minimum_project_size !== false,
                show_clients_count: input.show_clients_count !== false,
                show_clients: input.show_clients !== false,
                show_employees_count: input.show_employees_count !== false,
                brandColor: faker_1.faker.internet.color()
            });
            const { id: organizationId } = organization;
            // 4. Take each super admin user and add him/her to created organization
            try {
                const userOrganizations = admins.map(async (user) => {
                    const userOrganization = await this.userOrganizationService.create({
                        organization: {
                            id: organizationId
                        },
                        user
                    });
                    if (isImporting && userOrganizationSourceId) {
                        await this.commandBus.execute(new import_record_1.ImportRecordUpdateOrCreateCommand({
                            entityType: this.userOrganizationService.tableName,
                            sourceId: userOrganizationSourceId,
                            destinationId: userOrganization.id,
                            tenantId,
                        }));
                    }
                });
                await Promise.all(userOrganizations);
            }
            catch (e) {
                console.log('An error occurred while processing user organizations. Details:', e);
            }
            // 5. Create contact details of created organization
            try {
                contact = await this.contactService.create({
                    ...contact,
                    organization: { id: organizationId }
                });
                await this.organizationService.update(organizationId, {
                    contactId: contact.id
                });
            }
            catch (error) {
                console.log('Error occurred during creation of contact details or updating the organization:', error);
            }
            // 6. Executes various organization update tasks concurrently.
            this.executeOrganizationUpdateTasks(organization);
            // 7. Create Import Records while migrating for relative organization.
            if (isImporting && sourceId) {
                const { sourceId } = input;
                await this.commandBus.execute(new import_record_1.ImportRecordUpdateOrCreateCommand({
                    entityType: this.organizationService.tableName,
                    sourceId,
                    destinationId: organizationId,
                    tenantId,
                }));
            }
            return await this.organizationService.findOneByIdString(organizationId);
        }
        catch (error) {
            console.log('An error occurred during the organization creation process.', error);
            throw new common_1.BadRequestException(error, 'An error occurred during the organization creation process.');
        }
    }
    /**
     * Executes various organization update tasks concurrently. This function
     * triggers several operations related to an organization, such as creating reports,
     * task statuses, task sizes, task priorities, issue types, and task settings.
     * These operations are executed in parallel. If any operation fails,
     * the error is caught and logged.
     *
     * @param organization An instance of the Organization class, representing the organization for which the update tasks are to be executed.
     * @param organizationId The unique identifier of the organization, used in some of the update tasks.
     * @returns Promise<void> This function returns a promise that resolves to void.
     */
    async executeOrganizationUpdateTasks(organization) {
        try {
            // 1. Create report for relative organization.
            await this.commandBus.execute(new commands_1.ReportOrganizationCreateCommand(organization));
            // 2. Create task statuses for relative organization.
            await this.commandBus.execute(new commands_2.OrganizationStatusBulkCreateCommand(organization));
            // 3. Create task sizes for relative organization.
            await this.commandBus.execute(new commands_3.OrganizationTaskSizeBulkCreateCommand(organization));
            // 4. Create task priorities for relative organization.
            await this.commandBus.execute(new commands_4.OrganizationTaskPriorityBulkCreateCommand(organization));
            // 5. Create issue types for relative organization.
            await this.commandBus.execute(new commands_5.OrganizationIssueTypeBulkCreateCommand(organization));
            // 6. Create task setting for relative organization.
            await this.commandBus.execute(new commands_6.OrganizationTaskSettingCreateCommand({
                organization
            }));
        }
        catch (error) {
            console.log(error, 'Error occurred while executing organization update tasks:', error.message);
        }
    }
};
exports.OrganizationCreateHandler = OrganizationCreateHandler = __decorate([
    (0, cqrs_1.CommandHandler)(organization_create_command_1.OrganizationCreateCommand),
    __metadata("design:paramtypes", [cqrs_1.CommandBus,
        organization_service_1.OrganizationService,
        user_organization_services_1.UserOrganizationService,
        user_service_1.UserService,
        contact_service_1.ContactService])
], OrganizationCreateHandler);
//# sourceMappingURL=organization.create.handler.js.map