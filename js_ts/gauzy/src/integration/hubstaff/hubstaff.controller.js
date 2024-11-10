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
exports.HubstaffController = void 0;
const common_1 = require("@nestjs/common");
const contracts_1 = require("../../../plugins/contracts");
const swagger_1 = require("@nestjs/swagger");
const decorators_1 = require("shared/decorators");
const guards_1 = require("../../shared/guards");
const pipes_1 = require("../../shared/pipes");
const hubstaff_service_1 = require("./hubstaff.service");
let HubstaffController = exports.HubstaffController = class HubstaffController {
    _hubstaffService;
    constructor(_hubstaffService) {
        this._hubstaffService = _hubstaffService;
    }
    /**
     *
     *
     * @param integrationId
     * @returns
     */
    async getHubstaffTokenByIntegration(integrationId) {
        return await this._hubstaffService.getHubstaffToken(integrationId);
    }
    /**
     *
     * @param integrationId
     * @returns
     */
    async refreshHubstaffTokenByIntegration(integrationId) {
        return await this._hubstaffService.refreshToken(integrationId);
    }
    /**
     *
     * @param body
     * @returns
     */
    async create(body) {
        return await this._hubstaffService.addIntegration(body);
    }
    /**
     *
     * @param integrationId
     * @param body
     * @returns
     */
    async getOrganizations(token) {
        return await this._hubstaffService.getOrganizations(token);
    }
    /**
     *
     * @param organizationId
     * @param body
     * @returns
     */
    async getProjects(organizationId, token) {
        return await this._hubstaffService.fetchOrganizationProjects({
            token,
            organizationId
        });
    }
    /**
     *
     * @param integrationId
     * @param body
     * @returns
     */
    async syncProjects(input) {
        return await this._hubstaffService.syncProjects(input);
    }
    /**
     *
     * @param integrationId
     * @param body
     * @returns
     */
    async syncOrganizations(input) {
        return await this._hubstaffService.syncOrganizations(input);
    }
    /**
     *
     * @param integrationId
     * @param body
     * @returns
     */
    async autoSync(integrationId, body) {
        return await this._hubstaffService.autoSync({
            ...body,
            integrationId
        });
    }
};
__decorate([
    (0, common_1.Get)('/token/:integrationId'),
    __param(0, (0, common_1.Param)('integrationId', pipes_1.UUIDValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], HubstaffController.prototype, "getHubstaffTokenByIntegration", null);
__decorate([
    (0, common_1.Get)('/refresh-token/:integrationId'),
    __param(0, (0, common_1.Param)('integrationId', pipes_1.UUIDValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], HubstaffController.prototype, "refreshHubstaffTokenByIntegration", null);
__decorate([
    (0, common_1.Post)('/integration'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], HubstaffController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('/organizations'),
    __param(0, (0, common_1.Query)('token')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], HubstaffController.prototype, "getOrganizations", null);
__decorate([
    (0, common_1.Get)('/projects/:organizationId'),
    __param(0, (0, common_1.Param)('organizationId')),
    __param(1, (0, common_1.Query)('token')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], HubstaffController.prototype, "getProjects", null);
__decorate([
    (0, common_1.Post)('/sync-projects'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], HubstaffController.prototype, "syncProjects", null);
__decorate([
    (0, common_1.Post)('/sync-organizations'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], HubstaffController.prototype, "syncOrganizations", null);
__decorate([
    (0, common_1.Post)('/auto-sync/:integrationId'),
    __param(0, (0, common_1.Param)('integrationId', pipes_1.UUIDValidationPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], HubstaffController.prototype, "autoSync", null);
exports.HubstaffController = HubstaffController = __decorate([
    (0, swagger_1.ApiTags)('Hubstaff Integrations'),
    (0, common_1.UseGuards)(guards_1.TenantPermissionGuard, guards_1.PermissionGuard),
    (0, decorators_1.Permissions)(contracts_1.PermissionsEnum.INTEGRATION_VIEW),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [hubstaff_service_1.HubstaffService])
], HubstaffController);
//# sourceMappingURL=hubstaff.controller.js.map