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
exports.IntegrationEntitySettingUpdateOrCreateHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const integration_entity_setting_update_or_create_command_1 = require("../integration-entity-setting-update-or-create.command");
const integration_entity_setting_service_1 = require("../../integration-entity-setting.service");
const integration_tenant_service_1 = require("../../../integration-tenant/integration-tenant.service");
let IntegrationEntitySettingUpdateOrCreateHandler = exports.IntegrationEntitySettingUpdateOrCreateHandler = class IntegrationEntitySettingUpdateOrCreateHandler {
    _integrationEntitySettingService;
    _integrationTenantService;
    constructor(_integrationEntitySettingService, _integrationTenantService) {
        this._integrationEntitySettingService = _integrationEntitySettingService;
        this._integrationTenantService = _integrationTenantService;
    }
    /**
     * Execute the update command for integration entity settings.
     *
     * @param command - The IntegrationEntitySettingUpdateOrCreateCommand containing the input and integrationId.
     * @returns A promise resolving to an array of updated or created integration entity settings.
     */
    async execute(command) {
        const { input, integrationId } = command;
        await this._integrationTenantService.findOneByIdString(integrationId);
        return await this._integrationEntitySettingService.bulkUpdateOrCreate(input);
    }
};
exports.IntegrationEntitySettingUpdateOrCreateHandler = IntegrationEntitySettingUpdateOrCreateHandler = __decorate([
    (0, cqrs_1.CommandHandler)(integration_entity_setting_update_or_create_command_1.IntegrationEntitySettingUpdateOrCreateCommand),
    __metadata("design:paramtypes", [integration_entity_setting_service_1.IntegrationEntitySettingService,
        integration_tenant_service_1.IntegrationTenantService])
], IntegrationEntitySettingUpdateOrCreateHandler);
//# sourceMappingURL=integration-entity-setting-update-or-create.handler.js.map