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
exports.InviteOrganizationContactHandler = void 0;
const index_1 = require("../../../../plugins/contracts/dist/index");
const cqrs_1 = require("@nestjs/cqrs");
const user_service_1 = require("../../../user/user.service");
const common_1 = require("@nestjs/common");
const invite_organization_contact_command_1 = require("../invite.organization-contact.command");
const organization_contact_service_1 = require("../../../organization-contact/organization-contact.service");
const invite_service_1 = require("../../invite.service");
const role_service_1 = require("../../../role/role.service");
/**
 * Sends an invitation email to the organization organizationContact's primaryEmail
 */
let InviteOrganizationContactHandler = exports.InviteOrganizationContactHandler = class InviteOrganizationContactHandler {
    organizationContactService;
    inviteService;
    userService;
    roleService;
    constructor(organizationContactService, inviteService, userService, roleService) {
        this.organizationContactService = organizationContactService;
        this.inviteService = inviteService;
        this.userService = userService;
        this.roleService = roleService;
    }
    async execute(command) {
        const { input: { id, originalUrl, inviterUser, languageCode } } = command;
        const organizationContact = await this.organizationContactService.findOneByIdString(id);
        if (!organizationContact.primaryEmail) {
            throw new common_1.InternalServerErrorException('No Primary Email');
        }
        const alreadyExists = await this.userExistsForSameTenant(organizationContact.primaryEmail, inviterUser.tenantId);
        if (alreadyExists) {
            throw new common_1.InternalServerErrorException('Contact email already exists in the account as a user');
        }
        const { id: roleId } = await this.roleService.findOneByOptions({
            where: { name: index_1.RolesEnum.VIEWER }
        });
        this.inviteService.createOrganizationContactInvite({
            emailId: organizationContact.primaryEmail,
            roleId,
            organizationContactId: organizationContact.id,
            organizationId: organizationContact.organizationId,
            invitedById: inviterUser.id,
            originalUrl,
            languageCode
        });
        await this.organizationContactService.update(id, {
            inviteStatus: index_1.ContactOrganizationInviteStatus.INVITED
        });
        return {
            ...organizationContact,
            inviteStatus: index_1.ContactOrganizationInviteStatus.INVITED
        };
    }
    /**
     * This function is used to make sure we are not sending an invitation email to a user that
     * exists for the same tenant.
     *
     * @param email Email address of the user to check
     * @param tenantId Tenant id of the contact organization
     */
    async userExistsForSameTenant(email, tenantId) {
        let user;
        try {
            user = await this.userService.getUserByEmail(email);
        }
        catch (error) { }
        if (!user) {
            return false;
        }
        // TODO: Once tenantId is stored in user properly
        // return user.tenantId === tenantId;
        return true;
    }
};
exports.InviteOrganizationContactHandler = InviteOrganizationContactHandler = __decorate([
    (0, cqrs_1.CommandHandler)(invite_organization_contact_command_1.InviteOrganizationContactCommand),
    __metadata("design:paramtypes", [organization_contact_service_1.OrganizationContactService,
        invite_service_1.InviteService,
        user_service_1.UserService,
        role_service_1.RoleService])
], InviteOrganizationContactHandler);
//# sourceMappingURL=invite.organization-contact.handler.js.map