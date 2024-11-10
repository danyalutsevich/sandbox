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
exports.TenantSettingGetHandler = void 0;
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const context_1 = require("./../../../../core/context");
const tenant_setting_get_command_1 = require("../tenant-setting.get.command");
const tenant_setting_service_1 = require("./../../tenant-setting.service");
const decorators_1 = require("./../../../../core/decorators");
const dto_1 = require("./../../dto");
let TenantSettingGetHandler = exports.TenantSettingGetHandler = class TenantSettingGetHandler {
    _tenantSettingService;
    constructor(_tenantSettingService) {
        this._tenantSettingService = _tenantSettingService;
    }
    async execute() {
        const tenantId = context_1.RequestContext.currentTenantId();
        let settings = await this._tenantSettingService.get({
            where: {
                tenantId
            }
        });
        return Object.assign({}, (0, decorators_1.WrapSecrets)(settings, new dto_1.WasabiS3ProviderConfigDTO()), (0, decorators_1.WrapSecrets)(settings, new dto_1.AwsS3ProviderConfigDTO()), (0, decorators_1.WrapSecrets)(settings, new dto_1.CloudinaryProviderConfigDTO()), (0, decorators_1.WrapSecrets)(settings, new dto_1.DigitalOceanS3ProviderConfigDTO()));
    }
};
exports.TenantSettingGetHandler = TenantSettingGetHandler = __decorate([
    (0, cqrs_1.CommandHandler)(tenant_setting_get_command_1.TenantSettingGetCommand),
    __param(0, (0, common_1.Inject)((0, common_1.forwardRef)(() => tenant_setting_service_1.TenantSettingService))),
    __metadata("design:paramtypes", [tenant_setting_service_1.TenantSettingService])
], TenantSettingGetHandler);
//# sourceMappingURL=tenant-setting.get.handler.js.map