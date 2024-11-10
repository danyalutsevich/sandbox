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
exports.IntegrationTenantUpdateOrCreateHandler = void 0;
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const integration_tenant_service_1 = require("../../integration-tenant.service");
const integration_tenant_create_command_1 = require("../integration-tenant.create.command");
const integration_tenant_update_or_create_command_1 = require("../integration-tenant-update-or-create.command");
const integration_tenant_update_command_1 = require("../integration-tenant.update.command");
let IntegrationTenantUpdateOrCreateHandler = exports.IntegrationTenantUpdateOrCreateHandler = class IntegrationTenantUpdateOrCreateHandler {
    _commandBus;
    _integrationTenantService;
    constructor(_commandBus, _integrationTenantService) {
        this._commandBus = _commandBus;
        this._integrationTenantService = _integrationTenantService;
    }
    /**
     * Execute the IntegrationTenantUpdateOrCreateCommand to update or create an integration tenant.
     *
     * @param command - The IntegrationTenantUpdateOrCreateCommand containing the options and input data.
     * @returns {Promise<IIntegrationTenant>} - A promise that resolves with the updated or newly created integration tenant.
     */
    async execute(command) {
        const { options, input } = command;
        // Try to find the corresponding integration tenant
        try {
            const integration = await this._integrationTenantService.findOneByWhereOptions(options);
            // Update the corresponding integration tenant with the new input data
            return await this._commandBus.execute(new integration_tenant_update_command_1.IntegrationTenantUpdateCommand(integration.id, input));
        }
        catch (error) {
            // Create a corresponding integration tenant with the new input data
            return await this._commandBus.execute(new integration_tenant_create_command_1.IntegrationTenantCreateCommand(input));
        }
    }
};
exports.IntegrationTenantUpdateOrCreateHandler = IntegrationTenantUpdateOrCreateHandler = __decorate([
    (0, common_1.Injectable)(),
    (0, cqrs_1.CommandHandler)(integration_tenant_update_or_create_command_1.IntegrationTenantUpdateOrCreateCommand),
    __metadata("design:paramtypes", [cqrs_1.CommandBus,
        integration_tenant_service_1.IntegrationTenantService])
], IntegrationTenantUpdateOrCreateHandler);
//# sourceMappingURL=integration-tenant-update-or-create.handler.js.map