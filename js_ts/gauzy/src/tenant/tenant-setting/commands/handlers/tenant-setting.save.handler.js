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
exports.TenantSettingSaveHandler = void 0;
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const context_1 = require("../../../../core/context");
const tenant_setting_service_1 = require("./../../tenant-setting.service");
const tenant_setting_save_command_1 = require("../tenant-setting.save.command");
let TenantSettingSaveHandler = exports.TenantSettingSaveHandler = class TenantSettingSaveHandler {
    _tenantSettingService;
    constructor(_tenantSettingService) {
        this._tenantSettingService = _tenantSettingService;
    }
    /**
     * Executes a command to save tenant settings. Delegates to _tenantSettingService,
     * using the current tenant ID from RequestContext or the one provided in the command.
     *
     * @param command A TenantSettingSaveCommand object with settings and tenant ID.
     * @returns The result of the save operation from _tenantSettingService.
     */
    async execute(command) {
        const { input, tenantId } = command;
        return await this._tenantSettingService.saveSettings(input, context_1.RequestContext.currentTenantId() || tenantId);
    }
};
exports.TenantSettingSaveHandler = TenantSettingSaveHandler = __decorate([
    (0, cqrs_1.CommandHandler)(tenant_setting_save_command_1.TenantSettingSaveCommand),
    __param(0, (0, common_1.Inject)((0, common_1.forwardRef)(() => tenant_setting_service_1.TenantSettingService))),
    __metadata("design:paramtypes", [tenant_setting_service_1.TenantSettingService])
], TenantSettingSaveHandler);
//# sourceMappingURL=tenant-setting.save.handler.js.map