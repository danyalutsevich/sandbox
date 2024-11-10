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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizationTeamJoinRequestController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const cqrs_1 = require("@nestjs/cqrs");
const nestjs_i18n_1 = require("nestjs-i18n");
const index_1 = require("../../plugins/contracts/dist/index");
const index_2 = require("../../plugins/common/dist/index");
const crud_1 = require("core/crud");
const pipes_1 = require("../shared/pipes");
const decorators_1 = require("../shared/decorators");
const guards_1 = require("../shared/guards");
const commands_1 = require("./commands");
const organization_team_join_request_entity_1 = require("./organization-team-join-request.entity");
const organization_team_join_request_service_1 = require("./organization-team-join-request.service");
const dto_1 = require("./dto");
let OrganizationTeamJoinRequestController = exports.OrganizationTeamJoinRequestController = class OrganizationTeamJoinRequestController {
    _commandBus;
    _organizationTeamJoinRequestService;
    constructor(_commandBus, _organizationTeamJoinRequestService) {
        this._commandBus = _commandBus;
        this._organizationTeamJoinRequestService = _organizationTeamJoinRequestService;
    }
    /**
     * Validate organization team join request
     *
     * @param params
     * @returns
     */
    async validateJoinRequest(entity) {
        return await this._organizationTeamJoinRequestService.validateJoinRequest(entity);
    }
    /**
     * Get organization team join requests
     *
     * @param params
     * @returns
     */
    async findAll(params) {
        return await this._organizationTeamJoinRequestService.findAll(params);
    }
    /**
     * Create organization team join request.
     *
     * @param entity
     * @returns
     */
    async create(entity, languageCode) {
        return await this._commandBus.execute(new commands_1.OrganizationTeamJoinRequestCreateCommand(entity, languageCode));
    }
    /**
     * Resend email verification code
     *
     * @returns
     */
    async resendConfirmationCode(entity) {
        return await this._organizationTeamJoinRequestService.resendConfirmationCode(entity);
    }
    async acceptRequestToJoin(id, action, languageCode) {
        return this._organizationTeamJoinRequestService.acceptRequestToJoin(id, action, languageCode);
    }
};
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.ACCEPTED),
    (0, common_1.Post)('validate'),
    (0, pipes_1.UseValidationPipe)({ whitelist: true }),
    (0, index_2.Public)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.ValidateJoinRequestDTO]),
    __metadata("design:returntype", Promise)
], OrganizationTeamJoinRequestController.prototype, "validateJoinRequest", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(guards_1.TenantPermissionGuard, guards_1.PermissionGuard),
    (0, decorators_1.Permissions)(index_1.PermissionsEnum.ALL_ORG_VIEW, index_1.PermissionsEnum.ORG_TEAM_JOIN_REQUEST_VIEW),
    (0, pipes_1.UseValidationPipe)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_a = typeof crud_1.PaginationParams !== "undefined" && crud_1.PaginationParams) === "function" ? _a : Object]),
    __metadata("design:returntype", Promise)
], OrganizationTeamJoinRequestController.prototype, "findAll", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, common_1.Post)(),
    (0, pipes_1.UseValidationPipe)(),
    (0, index_2.Public)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, decorators_1.LanguageDecorator)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [organization_team_join_request_entity_1.OrganizationTeamJoinRequest, String]),
    __metadata("design:returntype", Promise)
], OrganizationTeamJoinRequestController.prototype, "create", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Post)('resend-code'),
    (0, pipes_1.UseValidationPipe)(),
    (0, index_2.Public)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [organization_team_join_request_entity_1.OrganizationTeamJoinRequest]),
    __metadata("design:returntype", Promise)
], OrganizationTeamJoinRequestController.prototype, "resendConfirmationCode", null);
__decorate([
    (0, common_1.Put)(':id/:action'),
    (0, common_1.UseGuards)(guards_1.TenantPermissionGuard, guards_1.PermissionGuard),
    (0, decorators_1.Permissions)(index_1.PermissionsEnum.ORG_TEAM_JOIN_REQUEST_VIEW, index_1.PermissionsEnum.ORG_TEAM_JOIN_REQUEST_EDIT),
    __param(0, (0, common_1.Param)('id', pipes_1.UUIDValidationPipe)),
    __param(1, (0, common_1.Param)('action')),
    __param(2, (0, nestjs_i18n_1.I18nLang)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], OrganizationTeamJoinRequestController.prototype, "acceptRequestToJoin", null);
exports.OrganizationTeamJoinRequestController = OrganizationTeamJoinRequestController = __decorate([
    (0, swagger_1.ApiTags)('OrganizationTeamJoinRequest'),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [cqrs_1.CommandBus,
        organization_team_join_request_service_1.OrganizationTeamJoinRequestService])
], OrganizationTeamJoinRequestController);
//# sourceMappingURL=organization-team-join-request.controller.js.map