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
exports.InviteAcceptOrganizationContactHandler = void 0;
const index_1 = require("../../../../plugins/contracts/dist/index");
const cqrs_1 = require("@nestjs/cqrs");
const commands_1 = require("./../../../tenant/commands");
const auth_service_1 = require("../../../auth/auth.service");
const organization_contact_service_1 = require("../../../organization-contact/organization-contact.service");
const organization_service_1 = require("../../../organization/organization.service");
const commands_2 = require("../../../role/commands");
const role_service_1 = require("../../../role/role.service");
const tenant_service_1 = require("../../../tenant/tenant.service");
const invite_service_1 = require("../../invite.service");
const invite_accept_organization_contact_command_1 = require("../invite.accept-organization-contact.command");
const commands_3 = require("./../../../reports/commands");
let InviteAcceptOrganizationContactHandler = exports.InviteAcceptOrganizationContactHandler = class InviteAcceptOrganizationContactHandler {
    inviteService;
    authService;
    organizationService;
    organizationContactService;
    tenantService;
    roleService;
    commandBus;
    constructor(inviteService, authService, organizationService, organizationContactService, tenantService, roleService, commandBus) {
        this.inviteService = inviteService;
        this.authService = authService;
        this.organizationService = organizationService;
        this.organizationContactService = organizationContactService;
        this.tenantService = tenantService;
        this.roleService = roleService;
        this.commandBus = commandBus;
    }
    async execute(command) {
        const { input: { user, password, contactOrganization, inviteId, originalUrl }, languageCode } = command;
        // 1. Create new tenant for the contact
        const { name } = contactOrganization;
        const tenant = await this.tenantService.create({
            name
        });
        // 2. Create Role and Role Permissions for contact
        await this.commandBus.execute(new commands_2.TenantRoleBulkCreateCommand([tenant]));
        // 3. Create Enabled/Disabled features for relative tenants.
        await this.commandBus.execute(new commands_1.TenantFeatureOrganizationCreateCommand([tenant]));
        let { contact = {} } = contactOrganization;
        delete contactOrganization['contact'];
        // 4. Create Organization for the contact
        const organization = await this.organizationService.create({
            ...contactOrganization,
            tenant
        });
        // 5. Create Enabled/Disabled reports for relative organization.
        await this.commandBus.execute(new commands_3.ReportOrganizationCreateCommand(organization));
        // 6. Create contact details of created organization
        const { id: organizationId } = organization;
        const { id: tenantId } = tenant;
        contact = Object.assign({}, contact, {
            organizationId,
            tenantId
        });
        await this.organizationService.create({
            contact,
            ...organization
        });
        // 7. Find SUPER_ADMIN role to relative tenant.
        const role = await this.roleService.findOneByWhereOptions({
            tenantId,
            name: index_1.RolesEnum.SUPER_ADMIN
        });
        // 8. Create user account for contact and link role, tenant and organization
        await this.authService.register({
            user: {
                ...user,
                tenant,
                role
            },
            password,
            originalUrl,
            organizationId,
            inviteId
        }, languageCode);
        // 8. Link newly created contact organization to organization contact invite
        const { organizationContacts } = await this.inviteService.findOneByIdString(inviteId, {
            relations: {
                organizationContacts: true
            }
        });
        // TODO Make invite and contact as one to one, since an invite is not shared by multiple contacts
        const [organizationContact] = organizationContacts;
        const { id: organizationContactId } = organizationContact;
        await this.organizationContactService.update(organizationContactId, {
            tenant,
            organization,
            inviteStatus: index_1.ContactOrganizationInviteStatus.ACCEPTED
        });
        return await this.inviteService.update(inviteId, {
            status: index_1.InviteStatusEnum.ACCEPTED
        });
    }
};
exports.InviteAcceptOrganizationContactHandler = InviteAcceptOrganizationContactHandler = __decorate([
    (0, cqrs_1.CommandHandler)(invite_accept_organization_contact_command_1.InviteAcceptOrganizationContactCommand),
    __metadata("design:paramtypes", [invite_service_1.InviteService,
        auth_service_1.AuthService,
        organization_service_1.OrganizationService,
        organization_contact_service_1.OrganizationContactService,
        tenant_service_1.TenantService,
        role_service_1.RoleService,
        cqrs_1.CommandBus])
], InviteAcceptOrganizationContactHandler);
//# sourceMappingURL=invite.accept-organization-contact.handler.js.map