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
exports.IntegrationTenantUpdateHandler = void 0;
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const index_1 = require("../../../../plugins/common/dist/index");
const context_1 = require("core/context");
const commands_1 = require("../../commands");
const integration_tenant_service_1 = require("../../integration-tenant.service");
const commands_2 = require("integration-setting/commands");
let IntegrationTenantUpdateHandler = exports.IntegrationTenantUpdateHandler = class IntegrationTenantUpdateHandler {
    _commandBus;
    _integrationTenantService;
    constructor(_commandBus, _integrationTenantService) {
        this._commandBus = _commandBus;
        this._integrationTenantService = _integrationTenantService;
    }
    async execute(command) {
        try {
            const { id, input } = command;
            return await this.update(id, input);
        }
        catch (error) {
            // Handle errors and return an appropriate error response
            console.log(`Failed to update integration tenant: %s`, error.message);
            throw new common_1.HttpException(`Failed to update integration tenant: ${error.message}`, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    /**
     * Update an integration tenant with the provided data.
     * @param id The ID of the integration tenant to update.
     * @param request The data to update the integration tenant.
     * @returns A promise that resolves to the updated integration tenant.
     */
    async update(integrationId, request) {
        try {
            // Determine the current tenant ID from the request context or use the one from the request.
            const tenantId = context_1.RequestContext.currentTenantId() || request.tenantId;
            // Extract properties from the request.
            let { organizationId, isActive, isArchived, settings = [] } = request;
            // Map and assign 'settings' and 'entitySettings' with tenant and organization IDs
            settings = settings.map((item) => ({
                ...item,
                integrationId,
                tenantId,
                organizationId
            }));
            // If there are settings to update, execute an update command for integration settings.
            if ((0, index_1.isNotEmpty)(settings)) {
                /**
                * Executes an update command for integration settings.
                *
                * @param integrationId - The identifier of the integration to update settings for.
                * @param settings - The new settings data to be applied to the integration.
                * @returns {Promise<any>} - A promise that resolves when the update command is executed.
                */
                await this._commandBus.execute(new commands_2.IntegrationSettingUpdateCommand(integrationId, settings));
            }
            // Update the integration tenant's status and archive status.
            await this._integrationTenantService.update(integrationId, {
                isActive,
                isArchived
            });
            // Retrieve and return the updated integration tenant.
            return await this._integrationTenantService.findOneByIdString(integrationId);
        }
        catch (error) {
            // Handle errors and return an appropriate error response
            console.log(`Failed to update integration tenant: %s`, error.message);
            throw new common_1.HttpException(`Failed to update integration tenant: ${error.message}`, common_1.HttpStatus.BAD_REQUEST);
        }
    }
};
exports.IntegrationTenantUpdateHandler = IntegrationTenantUpdateHandler = __decorate([
    (0, cqrs_1.CommandHandler)(commands_1.IntegrationTenantUpdateCommand),
    __metadata("design:paramtypes", [cqrs_1.CommandBus,
        integration_tenant_service_1.IntegrationTenantService])
], IntegrationTenantUpdateHandler);
//# sourceMappingURL=integration-tenant.update.handler.js.map