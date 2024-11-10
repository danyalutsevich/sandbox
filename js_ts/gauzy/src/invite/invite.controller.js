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
exports.InviteController = void 0;
const index_1 = require("../../plugins/contracts/dist/index");
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const swagger_1 = require("@nestjs/swagger");
const nestjs_i18n_1 = require("nestjs-i18n");
const index_2 = require("../../plugins/common/dist/index");
const invite_entity_1 = require("./invite.entity");
const invite_service_1 = require("./invite.service");
const decorators_1 = require("./../shared/decorators");
const guards_1 = require("./../shared/guards");
const pipes_1 = require("./../shared/pipes");
const crud_1 = require("./../core/crud");
const commands_1 = require("./commands");
const dto_1 = require("./dto");
const queries_1 = require("./queries");
let InviteController = exports.InviteController = class InviteController {
    inviteService;
    commandBus;
    queryBus;
    constructor(inviteService, commandBus, queryBus) {
        this.inviteService = inviteService;
        this.commandBus = commandBus;
        this.queryBus = queryBus;
    }
    /**
     * This method handles the creation of multiple email invites.
     * It receives the invite details and language code from the request body,
     * validates the input, and uses a command bus to execute the invite creation command.
     *
     * @param entity - The data transfer object containing invite details.
     * @param languageCode - The language code for localization purposes.
     * @returns A promise that resolves to the output of the email invite creation process.
     */
    async createManyWithEmailsId(entity, languageCode) {
        return await this.commandBus.execute(new commands_1.InviteBulkCreateCommand(entity, languageCode));
    }
    /**
     * This method handles resending an invite.
     * It receives the invite details and language code from the request body,
     * validates the input, and uses a command bus to execute the invite resend command.
     *
     * @param entity - The data transfer object containing invite details to be resent.
     * @param languageCode - The language code for localization purposes.
     * @returns A promise that resolves to either the update result or the invite entity.
     */
    async resendInvite(entity, languageCode) {
        return await this.commandBus.execute(new commands_1.InviteResendCommand(entity, languageCode));
    }
    /**
     * Validate invite by token and email
     *
     * @param options - The query parameters containing email and token.
     * @returns A promise that resolves to the invite if found.
     */
    async validateInviteByToken(options) {
        return await this.queryBus.execute(new queries_1.FindInviteByEmailTokenQuery({
            email: options.email,
            token: options.token
        }));
    }
    /**
     * Validate invite by code and email
     *
     * @param body - The body containing email and code.
     * @returns A promise that resolves to the invite if found.
     */
    async validateInviteByCode(body) {
        return await this.queryBus.execute(new queries_1.FindInviteByEmailCodeQuery({
            email: body.email,
            code: body.code
        }));
    }
    /**
     * Accept employee/user/candidate invite.
     *
     * @param entity - The data transfer object containing invite acceptance details.
     * @param origin - The origin header from the request.
     * @param languageCode - The language code for localization purposes.
     * @returns A promise that resolves to the result of the invite acceptance process.
     */
    async acceptInvitation(entity, origin, languageCode) {
        return await this.commandBus.execute(new commands_1.InviteAcceptCommand({ ...entity, originalUrl: origin }, languageCode));
    }
    /**
     * Accept organization contact invite.
     *
     * @param input - The data transfer object containing invite acceptance details.
     * @param request - The incoming HTTP request, used to extract the origin header.
     * @param languageCode - The language code for localization purposes.
     * @returns A promise that resolves to the result of the invite acceptance process.
     */
    async acceptOrganizationContactInvite(input, request, languageCode) {
        input.originalUrl = request.get('Origin');
        return await this.commandBus.execute(new commands_1.InviteAcceptOrganizationContactCommand(input, languageCode));
    }
    /**
     * Update an existing record
     *
     * @param id - The ID of the organization contact to update.
     * @param request - The incoming HTTP request, used to extract the origin header and the inviter user.
     * @param languageCode - The language code for localization purposes.
     * @returns A promise that resolves to the updated organization contact.
     */
    async inviteOrganizationContact(id, request, languageCode) {
        return await this.commandBus.execute(new commands_1.InviteOrganizationContactCommand({
            id,
            originalUrl: request.get('Origin'),
            inviterUser: request.user,
            languageCode
        }));
    }
    /**
     * Find all invites of the current user.
     *
     * @returns Promise<IPagination<IInvite>> Invite object or NotFoundException
     */
    async getCurrentUserInvites() {
        return await this.inviteService.getCurrentUserInvites();
    }
    /**
     * Find all invites.
     *
     * @param options - The query parameters for pagination and filtering.
     * @returns A promise that resolves to a paginated list of invites.
     */
    async findAll(options) {
        return await this.inviteService.findAllInvites(options);
    }
    /**
     * Delete record.
     *
     * @param id - The ID of the record to delete.
     * @returns A promise that resolves to the delete result.
     */
    async delete(id) {
        return await this.inviteService.delete(id);
    }
    /**
     * Handle invitation response by accepting or rejecting it.
     *
     * @param id The ID of the invitation.
     * @param action The action to perform (Accept or Reject).
     * @param request The request object.
     * @param languageCode The language code for internationalization.
     * @returns Promise<any>
     */
    async handleInvitationResponse(id, action, request, languageCode) {
        return await this.inviteService.handleInvitationResponse(id, action, request.get('Origin'), languageCode);
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create email invites' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.CREATED,
        description: 'The record has been successfully created.',
        type: invite_entity_1.Invite
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Invalid input, The response body may contain clues as to what went wrong'
    }),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, common_1.UseGuards)(guards_1.TenantPermissionGuard, guards_1.PermissionGuard),
    (0, decorators_1.Permissions)(index_1.PermissionsEnum.ORG_INVITE_EDIT, index_1.PermissionsEnum.ORG_TEAM_ADD),
    (0, common_1.Post)('/emails'),
    (0, pipes_1.UseValidationPipe)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, decorators_1.LanguageDecorator)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateInviteDTO, String]),
    __metadata("design:returntype", Promise)
], InviteController.prototype, "createManyWithEmailsId", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Resend invite.' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.CREATED,
        description: 'The record has been successfully updated.',
        type: invite_entity_1.Invite
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Invalid input, The response body may contain clues as to what went wrong'
    }),
    (0, common_1.UseGuards)(guards_1.TenantPermissionGuard, guards_1.PermissionGuard),
    (0, decorators_1.Permissions)(index_1.PermissionsEnum.ORG_INVITE_EDIT),
    (0, common_1.Post)('/resend'),
    (0, pipes_1.UseValidationPipe)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, decorators_1.LanguageDecorator)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.ResendInviteDTO, String]),
    __metadata("design:returntype", Promise)
], InviteController.prototype, "resendInvite", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get invite.' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Found invite',
        type: invite_entity_1.Invite
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Record not found'
    }),
    (0, index_2.Public)(),
    (0, common_1.Get)('validate'),
    (0, pipes_1.UseValidationPipe)({ whitelist: true }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.ValidateInviteQueryDTO]),
    __metadata("design:returntype", Promise)
], InviteController.prototype, "validateInviteByToken", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Validate invite by code and email.' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Found invite',
        type: invite_entity_1.Invite
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Record not found'
    }),
    (0, index_2.Public)(),
    (0, common_1.Post)('validate-by-code'),
    (0, pipes_1.UseValidationPipe)({ whitelist: true }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.ValidateInviteByCodeQueryDTO]),
    __metadata("design:returntype", Promise)
], InviteController.prototype, "validateInviteByCode", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Accept employee/user/candidate invite.' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.CREATED,
        description: 'The record has been successfully executed.'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Invalid input, The response body may contain clues as to what went wrong'
    }),
    (0, index_2.Public)(),
    (0, common_1.Post)('/accept'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Headers)('origin')),
    __param(2, (0, nestjs_i18n_1.I18nLang)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], InviteController.prototype, "acceptInvitation", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Accept organization contact invite.' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.CREATED,
        description: 'The record has been successfully created.'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Invalid input, The response body may contain clues as to what went wrong'
    }),
    (0, common_1.Post)('/contact'),
    (0, index_2.Public)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, nestjs_i18n_1.I18nLang)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String]),
    __metadata("design:returntype", Promise)
], InviteController.prototype, "acceptOrganizationContactInvite", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update an existing record' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.CREATED,
        description: 'The record has been successfully edited.'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Record not found'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Invalid input, The response body may contain clues as to what went wrong'
    }),
    (0, common_1.HttpCode)(common_1.HttpStatus.ACCEPTED),
    (0, common_1.UseGuards)(guards_1.TenantPermissionGuard, guards_1.PermissionGuard),
    (0, decorators_1.Permissions)(index_1.PermissionsEnum.ORG_INVITE_EDIT),
    (0, common_1.Put)('/organization-contact/:id'),
    __param(0, (0, common_1.Param)('id', pipes_1.UUIDValidationPipe)),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, nestjs_i18n_1.I18nLang)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, String]),
    __metadata("design:returntype", Promise)
], InviteController.prototype, "inviteOrganizationContact", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Find all invites of current user' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Found invites'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'No invites found for the current user'
    }),
    (0, common_1.UseGuards)(guards_1.TenantPermissionGuard, guards_1.PermissionGuard)
    //@Permissions(PermissionsEnum.ORG_INVITE_VIEW)
    ,
    (0, common_1.Get)('/me'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], InviteController.prototype, "getCurrentUserInvites", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Find all invites.' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Found invites',
        type: [invite_entity_1.Invite] // Note: Swagger expects an array of invites
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Record not found'
    }),
    (0, common_1.UseGuards)(guards_1.TenantPermissionGuard, guards_1.PermissionGuard),
    (0, decorators_1.Permissions)(index_1.PermissionsEnum.ORG_INVITE_VIEW),
    (0, pipes_1.UseValidationPipe)(),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [crud_1.PaginationParams]),
    __metadata("design:returntype", Promise)
], InviteController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Delete record' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NO_CONTENT,
        description: 'The record has been successfully deleted'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Record not found'
    }),
    (0, common_1.HttpCode)(common_1.HttpStatus.ACCEPTED),
    (0, common_1.UseGuards)(guards_1.TenantPermissionGuard, guards_1.PermissionGuard),
    (0, decorators_1.Permissions)(index_1.PermissionsEnum.ORG_INVITE_EDIT),
    (0, common_1.Delete)('/:id'),
    __param(0, (0, common_1.Param)('id', pipes_1.UUIDValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], InviteController.prototype, "delete", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Accept or Reject invite of current user' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Invite Accepted'
    }),
    (0, common_1.UseGuards)(guards_1.TenantPermissionGuard, guards_1.PermissionGuard),
    (0, decorators_1.Permissions)(index_1.PermissionsEnum.ORG_INVITE_EDIT),
    (0, common_1.Put)('/:id/:action'),
    __param(0, (0, common_1.Param)('id', pipes_1.UUIDValidationPipe)),
    __param(1, (0, common_1.Param)('action')),
    __param(2, (0, common_1.Req)()),
    __param(3, (0, nestjs_i18n_1.I18nLang)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object, String]),
    __metadata("design:returntype", Promise)
], InviteController.prototype, "handleInvitationResponse", null);
exports.InviteController = InviteController = __decorate([
    (0, swagger_1.ApiTags)('Invite'),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [invite_service_1.InviteService,
        cqrs_1.CommandBus,
        cqrs_1.QueryBus])
], InviteController);
//# sourceMappingURL=invite.controller.js.map