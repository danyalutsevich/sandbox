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
exports.IntegrationTenantDeleteHandler = void 0;
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const index_1 = require("../../../../plugins/contracts/dist/index");
const commands_1 = require("./../../../integration/github/commands");
const integration_tenant_service_1 = require("../../integration-tenant.service");
const integration_tenant_delete_command_1 = require("../integration-tenant.delete.command");
let IntegrationTenantDeleteHandler = exports.IntegrationTenantDeleteHandler = class IntegrationTenantDeleteHandler {
    _commandBus;
    _integrationTenantService;
    constructor(_commandBus, _integrationTenantService) {
        this._commandBus = _commandBus;
        this._integrationTenantService = _integrationTenantService;
    }
    /**
 * Execute the command to delete the integration tenant.
 * @param command - The IntegrationTenantDeleteCommand instance.
 */
    async execute(command) {
        try {
            // Extract information from the command
            const { id, options } = command;
            const { tenantId, organizationId } = options;
            // Find the integration tenant by ID along with related data
            const integration = await this._integrationTenantService.findOneByIdString(id, {
                where: {
                    tenantId,
                    organizationId,
                },
                relations: {
                    integration: true,
                    settings: true
                }
            });
            // Check the provider type of the integration and perform actions accordingly
            switch (integration.integration.provider) {
                case index_1.IntegrationEnum.GITHUB:
                    // Execute a command to delete GitHub installation
                    this._commandBus.execute(new commands_1.GithubInstallationDeleteCommand(integration));
                    break;
                // Add cases for other integration providers if needed
                default:
                    // Handle other integration providers if needed
                    break;
            }
            // Delete the integration tenant
            return await this._integrationTenantService.delete(id, {
                where: {
                    tenantId,
                    organizationId,
                }
            });
        }
        catch (error) {
            // Handle errors and return an appropriate error response
            console.log(`Failed to delete integration tenant: %s`, error.message);
            throw new common_1.HttpException(`Failed to delete integration tenant: ${error.message}`, common_1.HttpStatus.BAD_REQUEST);
        }
    }
};
exports.IntegrationTenantDeleteHandler = IntegrationTenantDeleteHandler = __decorate([
    (0, cqrs_1.CommandHandler)(integration_tenant_delete_command_1.IntegrationTenantDeleteCommand),
    __metadata("design:paramtypes", [cqrs_1.CommandBus,
        integration_tenant_service_1.IntegrationTenantService])
], IntegrationTenantDeleteHandler);
//# sourceMappingURL=integration-tenant.delete.handler.js.map