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
exports.InviteAcceptCandidateHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const typeorm_1 = require("@nestjs/typeorm");
const common_1 = require("@nestjs/common");
const index_1 = require("../../../../plugins/contracts/dist/index");
const auth_service_1 = require("../../../auth/auth.service");
const invite_service_1 = require("../../invite.service");
const invite_accept_candidate_command_1 = require("../invite.accept-candidate.command");
const internal_1 = require("./../../../core/entities/internal");
const type_orm_user_repository_1 = require("../../../user/repository/type-orm-user.repository");
const type_orm_candidate_repository_1 = require("../../../candidate/repository/type-orm-candidate.repository");
/**
 * Use this command for registering candidates.
 * This command first registers a user, then creates an candidate entry for the organization.
 * If the above two steps are successful, it finally sets the invitation status to accepted
 */
let InviteAcceptCandidateHandler = exports.InviteAcceptCandidateHandler = class InviteAcceptCandidateHandler {
    inviteService;
    authService;
    typeOrmUserRepository;
    typeOrmCandidateRepository;
    constructor(inviteService, authService, typeOrmUserRepository, typeOrmCandidateRepository) {
        this.inviteService = inviteService;
        this.authService = authService;
        this.typeOrmUserRepository = typeOrmUserRepository;
        this.typeOrmCandidateRepository = typeOrmCandidateRepository;
    }
    async execute(command) {
        const { input, languageCode } = command;
        const { inviteId } = input;
        const invite = await this.inviteService.findOneByIdString(inviteId, {
            relations: {
                departments: {
                    candidates: true
                },
                organization: true
            }
        });
        if (!invite) {
            throw Error('Invite does not exist');
        }
        const { organization } = invite;
        if (!organization.invitesAllowed) {
            throw Error('Organization no longer allows invites');
        }
        let user;
        try {
            const { tenantId, email } = invite;
            user = await this.typeOrmUserRepository.findOneOrFail({
                where: {
                    email,
                    tenantId,
                    role: {
                        name: index_1.RolesEnum.CANDIDATE
                    }
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
            try {
                /**
                 * Create candidate after create user
                 */
                const create = this.typeOrmCandidateRepository.create({
                    user,
                    organization,
                    tenantId,
                    appliedDate: invite.actionDate || null,
                    organizationDepartments: invite.departments || []
                });
                await this.typeOrmCandidateRepository.save(create);
            }
            catch (error) {
                throw new common_1.BadRequestException(error);
            }
        }
        const { id } = user;
        await this.inviteService.update(inviteId, {
            status: index_1.InviteStatusEnum.ACCEPTED,
            userId: id
        });
        return user;
    }
};
exports.InviteAcceptCandidateHandler = InviteAcceptCandidateHandler = __decorate([
    (0, cqrs_1.CommandHandler)(invite_accept_candidate_command_1.InviteAcceptCandidateCommand),
    __param(2, (0, typeorm_1.InjectRepository)(internal_1.User)),
    __param(3, (0, typeorm_1.InjectRepository)(internal_1.Candidate)),
    __metadata("design:paramtypes", [invite_service_1.InviteService,
        auth_service_1.AuthService,
        type_orm_user_repository_1.TypeOrmUserRepository,
        type_orm_candidate_repository_1.TypeOrmCandidateRepository])
], InviteAcceptCandidateHandler);
//# sourceMappingURL=invite.accept-candidate.handler.js.map