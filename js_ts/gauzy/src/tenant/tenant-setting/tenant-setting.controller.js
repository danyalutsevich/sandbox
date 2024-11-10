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
exports.TenantSettingController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const cqrs_1 = require("@nestjs/cqrs");
const contracts_1 = require("../../../plugins/contracts");
const crud_1 = require("../../core/crud");
const decorators_1 = require("./../../shared/decorators");
const pipes_1 = require("../../shared/pipes");
const guards_1 = require("./../../shared/guards");
const tenant_setting_service_1 = require("./tenant-setting.service");
const commands_1 = require("./commands");
const dto_1 = require("./dto");
let TenantSettingController = exports.TenantSettingController = class TenantSettingController extends crud_1.CrudController {
    tenantSettingService;
    commandBus;
    constructor(tenantSettingService, commandBus) {
        super(tenantSettingService);
        this.tenantSettingService = tenantSettingService;
        this.commandBus = commandBus;
    }
    async getSettings() {
        return await this.commandBus.execute(new commands_1.TenantSettingGetCommand());
    }
    async saveSettings(entity) {
        return await this.commandBus.execute(new commands_1.TenantSettingSaveCommand(entity));
    }
    async validateWasabiConfiguration(entity) {
        return await this.tenantSettingService.verifyWasabiConfiguration(entity);
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Get tenant settings',
        security: [
            {
                permission: [contracts_1.PermissionsEnum.TENANT_SETTING]
            }
        ]
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Tenant not found'
    }),
    (0, common_1.HttpCode)(common_1.HttpStatus.ACCEPTED),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TenantSettingController.prototype, "getSettings", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Tenant settings create/updated successfully'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.CREATED,
        description: 'Tenant settings create/updated successfully.'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Invalid input, The response body may contain clues as to what went wrong'
    }),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, pipes_1.UseValidationPipe)({ transform: true, whitelist: true }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateTenantSettingDTO]),
    __metadata("design:returntype", Promise)
], TenantSettingController.prototype, "saveSettings", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Wasabi file storage configuration validator.'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Wasabi file storage configuration validated successfully.'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Invalid input, The response body may contain clues as to what went wrong'
    }),
    (0, pipes_1.UseValidationPipe)({ transform: true, whitelist: true }),
    (0, common_1.Post)('wasabi/validate'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.WasabiS3ProviderConfigDTO]),
    __metadata("design:returntype", Promise)
], TenantSettingController.prototype, "validateWasabiConfiguration", null);
exports.TenantSettingController = TenantSettingController = __decorate([
    (0, swagger_1.ApiTags)('TenantSetting'),
    (0, common_1.UseGuards)(guards_1.TenantPermissionGuard, guards_1.PermissionGuard),
    (0, decorators_1.Permissions)(contracts_1.PermissionsEnum.TENANT_SETTING),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [tenant_setting_service_1.TenantSettingService, cqrs_1.CommandBus])
], TenantSettingController);
//# sourceMappingURL=tenant-setting.controller.js.map