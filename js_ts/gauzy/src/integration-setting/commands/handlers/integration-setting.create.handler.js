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
Object.defineProperty(exports, "__esModule", { value: true });
exports.IntegrationSettingCreateHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const __1 = require("..");
const integration_setting_service_1 = require("../../integration-setting.service");
const context_1 = require("../../../core/context");
let IntegrationSettingCreateHandler = exports.IntegrationSettingCreateHandler = class IntegrationSettingCreateHandler {
    integrationSettingService;
    constructor(integrationSettingService) {
        this.integrationSettingService = integrationSettingService;
    }
    async execute(command) {
        const { input } = command;
        const tenantId = context_1.RequestContext.currentTenantId();
        return await this.integrationSettingService.create(Object.assign(input, { tenantId }));
    }
};
exports.IntegrationSettingCreateHandler = IntegrationSettingCreateHandler = __decorate([
    (0, cqrs_1.CommandHandler)(__1.IntegrationSettingCreateCommand),
    __metadata("design:paramtypes", [integration_setting_service_1.IntegrationSettingService])
], IntegrationSettingCreateHandler);
//# sourceMappingURL=integration-setting.create.handler.js.map