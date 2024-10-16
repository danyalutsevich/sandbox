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
exports.IntegrationSettingController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const index_1 = require("../../plugins/contracts/dist/index");
const guards_1 = require("../shared/guards");
const decorators_1 = require("../shared/decorators");
const pipes_1 = require("../shared/pipes");
const integration_setting_entity_1 = require("./integration-setting.entity");
const integration_setting_service_1 = require("./integration-setting.service");
const update_integration_setting_dto_1 = require("./dto/update-integration-setting.dto");
let IntegrationSettingController = exports.IntegrationSettingController = class IntegrationSettingController {
    integrationSettingService;
    constructor(integrationSettingService) {
        this.integrationSettingService = integrationSettingService;
    }
    /**
     * Update integration setting.
     *
     * @param id - The ID of the integration setting to update.
     * @param input - The updated integration setting data.
     * @returns A Promise that resolves to the updated integration setting.
     */
    async update(id, input) {
        try {
            await this.integrationSettingService.create({
                ...input,
                id
            });
            return await this.integrationSettingService.findOneByIdString(id);
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update integration setting.' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Update integration setting',
        type: integration_setting_entity_1.IntegrationSetting
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Record not found'
    }),
    (0, common_1.Put)(':id'),
    (0, pipes_1.UseValidationPipe)({ whitelist: true }),
    __param(0, (0, common_1.Param)('id', pipes_1.UUIDValidationPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_integration_setting_dto_1.UpdateIntegrationSettingDTO]),
    __metadata("design:returntype", Promise)
], IntegrationSettingController.prototype, "update", null);
exports.IntegrationSettingController = IntegrationSettingController = __decorate([
    (0, swagger_1.ApiTags)('IntegrationSetting'),
    (0, common_1.UseGuards)(guards_1.TenantPermissionGuard, guards_1.PermissionGuard),
    (0, decorators_1.Permissions)(index_1.PermissionsEnum.INTEGRATION_VIEW),
    (0, common_1.Controller)('integration-setting'),
    __metadata("design:paramtypes", [integration_setting_service_1.IntegrationSettingService])
], IntegrationSettingController);
//# sourceMappingURL=integration-setting.controller.js.map