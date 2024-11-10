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
exports.IntegrationEntitySettingController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const cqrs_1 = require("@nestjs/cqrs");
const index_1 = require("../../plugins/contracts/dist/index");
const integration_entity_setting_entity_1 = require("./integration-entity-setting.entity");
const decorators_1 = require("./../shared/decorators");
const guards_1 = require("./../shared/guards");
const pipes_1 = require("./../shared/pipes");
const commands_1 = require("./commands");
let IntegrationEntitySettingController = exports.IntegrationEntitySettingController = class IntegrationEntitySettingController {
    _commandBus;
    constructor(_commandBus) {
        this._commandBus = _commandBus;
    }
    /**
     * Get settings by integration.
     *
     * @param integrationId - The ID of the integration (validated using UUIDValidationPipe).
     * @returns A promise resolving to paginated integration entity settings.
     */
    async getEntitySettingByIntegration(integrationId) {
        return await this._commandBus.execute(new commands_1.IntegrationEntitySettingGetCommand(integrationId));
    }
    /**
     * Update settings.
     *
     * @param integrationId - The ID of the integration (validated using UUIDValidationPipe).
     * @param entity - An individual IIntegrationEntitySetting or an array of IIntegrationEntitySetting objects to be updated.
     * @returns A promise resolving to an array of updated IIntegrationEntitySetting objects.
     */
    async updateIntegrationEntitySettingByIntegration(integrationId, input) {
        return await this._commandBus.execute(new commands_1.IntegrationEntitySettingUpdateOrCreateCommand(integrationId, input));
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get settings by integration.' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Found settings',
        type: integration_entity_setting_entity_1.IntegrationEntitySetting
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Record not found'
    }),
    (0, common_1.Get)('integration/:id'),
    __param(0, (0, common_1.Param)('id', pipes_1.UUIDValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], IntegrationEntitySettingController.prototype, "getEntitySettingByIntegration", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update settings.' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Update settings',
        type: integration_entity_setting_entity_1.IntegrationEntitySetting
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Record not found'
    }),
    (0, common_1.Put)('integration/:id'),
    __param(0, (0, common_1.Param)('id', pipes_1.UUIDValidationPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], IntegrationEntitySettingController.prototype, "updateIntegrationEntitySettingByIntegration", null);
exports.IntegrationEntitySettingController = IntegrationEntitySettingController = __decorate([
    (0, swagger_1.ApiTags)('IntegrationsEntitySetting'),
    (0, common_1.UseGuards)(guards_1.TenantPermissionGuard, guards_1.PermissionGuard),
    (0, decorators_1.Permissions)(index_1.PermissionsEnum.INTEGRATION_VIEW),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [cqrs_1.CommandBus])
], IntegrationEntitySettingController);
//# sourceMappingURL=integration-entity-setting.controller.js.map