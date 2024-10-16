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
exports.InviteAcceptUserHandler = void 0;
const index_1 = require("../../../../plugins/contracts/dist/index");
const cqrs_1 = require("@nestjs/cqrs");
const typeorm_1 = require("@nestjs/typeorm");
const auth_service_1 = require("../../../auth/auth.service");
const invite_service_1 = require("../../invite.service");
const invite_accept_user_command_1 = require("../invite.accept-user.command");
const organization_service_1 = require("../../../organization/organization.service");
const internal_1 = require("./../../../core/entities/internal");
const type_orm_user_repository_1 = require("../../../user/repository/type-orm-user.repository");
/**
 * Use this command for registering all non-employee users.
 * This command first registers a user, then creates a user_organization relation.
 * If the above two steps are successful, it finally sets the invitation status to accepted
 */
let InviteAcceptUserHandler = exports.InviteAcceptUserHandler = class InviteAcceptUserHandler {
    typeOrmUserRepository;
    inviteService;
    authService;
    organizationService;
    constructor(typeOrmUserRepository, inviteService, authService, organizationService) {
        this.typeOrmUserRepository = typeOrmUserRepository;
        this.inviteService = inviteService;
        this.authService = authService;
        this.organizationService = organizationService;
    }
    async execute(command) {
        const { input, languageCode } = command;
        const { inviteId } = input;
        const invite = await this.inviteService.findOneByIdString(inviteId);
        if (!invite) {
            throw Error('Invite does not exist');
        }
        const organization = await this.organizationService.findOneByIdString(invite.organizationId);
        if (!organization.invitesAllowed) {
            throw Error('Organization no longer allows invites');
        }
        let user;
        try {
            const { tenantId, email } = invite;
            user = await this.typeOrmUserRepository.findOneOrFail({
                where: {
                    email,
                    tenantId
                },
                order: {
                    createdAt: 'DESC'
                }
            });
        }
        catch (error) {
            const { id: organizationId, tenantId } = organization;
            /**
             * User register after accept invitation
             */
            user = await this.authService.register({
                ...input,
                user: {
                    ...input.user,
                    tenant: {
                        id: tenantId
                    }
                },
                organizationId,
                inviteId
            }, languageCode);
        }
        const { id } = user;
        await this.inviteService.update(inviteId, {
            status: index_1.InviteStatusEnum.ACCEPTED,
            userId: id
        });
        return user;
    }
};
exports.InviteAcceptUserHandler = InviteAcceptUserHandler = __decorate([
    (0, cqrs_1.CommandHandler)(invite_accept_user_command_1.InviteAcceptUserCommand),
    __param(0, (0, typeorm_1.InjectRepository)(internal_1.User)),
    __metadata("design:paramtypes", [type_orm_user_repository_1.TypeOrmUserRepository,
        invite_service_1.InviteService,
        auth_service_1.AuthService,
        organization_service_1.OrganizationService])
], InviteAcceptUserHandler);
//# sourceMappingURL=invite.accept-user.handler.js.map