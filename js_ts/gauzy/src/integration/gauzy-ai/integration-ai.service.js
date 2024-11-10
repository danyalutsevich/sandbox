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
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.IntegrationAIService = void 0;
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const contracts_1 = require("../../../plugins/contracts");
const index_1 = require("../../../plugins/common/dist/index");
const index_2 = require("../../../plugins/plugins/integration-ai/dist/index");
const context_1 = require("../../core/context");
const utils_1 = require("../../core/utils");
const commands_1 = require("../../integration-tenant/commands");
const integration_tenant_service_1 = require("../../integration-tenant/integration-tenant.service");
const integration_service_1 = require("./../../integration/integration.service");
const integration_ai_entity_settings_1 = require("./integration-ai-entity-settings");
let IntegrationAIService = exports.IntegrationAIService = class IntegrationAIService {
    _commandBus;
    _requestConfigProvider;
    _gauzyAIService;
    _integrationService;
    _integrationTenantService;
    constructor(_commandBus, _requestConfigProvider, _gauzyAIService, _integrationService, _integrationTenantService) {
        this._commandBus = _commandBus;
        this._requestConfigProvider = _requestConfigProvider;
        this._gauzyAIService = _gauzyAIService;
        this._integrationService = _integrationService;
        this._integrationTenantService = _integrationTenantService;
    }
    /**
     * Creates a new integration tenant for Gauzy AI.
     * @param input - The input data for creating the integration tenant.
     * @returns A promise that resolves to the created integration tenant.
     */
    async create(input) {
        try {
            // Destructure input data
            const { apiKey, apiSecret, openAiSecretKey, openAiOrganizationId } = input;
            // Get the current tenant and organization IDs
            const tenantId = context_1.RequestContext.currentTenantId();
            const organizationId = input.organizationId;
            // Retrieve Gauzy AI integration from the database
            const integration = await this._integrationService.findOneByOptions({
                where: {
                    provider: contracts_1.IntegrationEnum.GAUZY_AI,
                    isActive: true,
                    isArchived: false
                }
            });
            // Generate entity settings for the integration tenant
            const entitySettings = integration_ai_entity_settings_1.DEFAULT_ENTITY_SETTINGS.map((setting) => ({
                ...setting,
                organizationId,
                tenantId
            }));
            // Execute the command to create/update the integration tenant settings
            const createdIntegration = await this._commandBus.execute(new commands_1.IntegrationTenantUpdateOrCreateCommand({
                name: contracts_1.IntegrationEnum.GAUZY_AI,
                integration: {
                    provider: contracts_1.IntegrationEnum.GAUZY_AI
                },
                tenantId,
                organizationId,
            }, {
                name: contracts_1.IntegrationEnum.GAUZY_AI,
                integration,
                organizationId,
                tenantId,
                entitySettings,
                settings: [
                    {
                        settingsName: 'apiKey',
                        settingsValue: apiKey
                    },
                    {
                        settingsName: 'apiSecret',
                        settingsValue: apiSecret
                    },
                    ...((0, index_1.isNotEmpty)(openAiSecretKey) ? [
                        {
                            settingsName: 'openAiSecretKey',
                            settingsValue: openAiSecretKey
                        }
                    ] : []),
                    ...((0, index_1.isNotEmpty)(openAiOrganizationId) ? [
                        {
                            settingsName: 'openAiOrganizationId',
                            settingsValue: openAiOrganizationId
                        }
                    ] : []),
                ].map((setting) => ({
                    ...setting,
                    tenantId,
                    organizationId,
                }))
            }));
            // Calling the updateOneTenantApiKey method with the input object
            await this.updateOneTenantApiKey({
                apiKey,
                apiSecret,
                ...((0, index_1.isNotEmpty)(openAiSecretKey) && { openAiSecretKey }),
                ...((0, index_1.isNotEmpty)(openAiOrganizationId) && { openAiOrganizationId }),
            });
            // Return the created integration tenant
            return createdIntegration;
        }
        catch (error) {
            // Handle errors and throw an HTTP exception with a specific message
            throw new common_1.HttpException(`Failed to add Gauzy AI integration`, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    /**
     * Updates an integration tenant by ID with the provided input.
     *
     * @param {IIntegrationTenant['id']} integrationId - The ID of the integration tenant to update.
     * @param {IIntegrationTenantUpdateInput} input - The input data for the update.
     * @returns {Promise<IIntegrationTenant>} - A promise resolving to the updated integration tenant.
     */
    async update(integrationId, input) {
        try {
            // Retrieve Gauzy AI integration from the database
            const integration = await this._integrationTenantService.findOneByIdString(integrationId, {
                relations: {
                    settings: true
                }
            });
            // Extract settings from the retrieved integration
            const { apiKey, apiSecret, openAiSecretKey, openAiOrganizationId } = (0, utils_1.arrayToObject)(integration.settings, 'settingsName', 'settingsValue');
            // Check if apiKey exists before calling updateOneTenantApiKey
            if (apiKey) {
                // Calling the updateOneTenantApiKey method with the input object
                await this.updateOneTenantApiKey({
                    apiKey,
                    apiSecret,
                    ...((0, index_1.isNotEmpty)(openAiSecretKey) && { openAiSecretKey }),
                    ...((0, index_1.isNotEmpty)(openAiOrganizationId) && { openAiOrganizationId }),
                });
            }
            // Return the updated integration
            return integration;
        }
        catch (error) {
            // If an error occurs, throw a BadRequestException
            throw new common_1.BadRequestException(error);
        }
    }
    /**
     * Updates a tenant's API key by configuring the necessary parameters,
     * triggering the update in the Gauzy AI service, and handling any potential errors in a robust manner.
     */
    async updateOneTenantApiKey({ apiKey, apiSecret, openAiSecretKey, openAiOrganizationId }) {
        try {
            // Set configuration in the requestConfigProvider
            this._requestConfigProvider.setConfig({
                apiKey,
                apiSecret,
                ...((0, index_1.isNotEmpty)(openAiSecretKey) && { openAiSecretKey }),
                ...((0, index_1.isNotEmpty)(openAiOrganizationId) && { openAiOrganizationId }),
            });
            // Update Gauzy AI service with the new API key
            await this._gauzyAIService.updateOneTenantApiKey({
                apiKey,
                apiSecret,
                openAiSecretKey,
                openAiOrganizationId
            });
            // Reset configuration in the requestConfigProvider
            this._requestConfigProvider.resetConfig();
        }
        catch (error) {
            // Log any errors that occur during the update process
            console.log(`Error while updating Tenant Api Key: %s`, error?.message);
        }
    }
};
exports.IntegrationAIService = IntegrationAIService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [cqrs_1.CommandBus, typeof (_a = typeof index_2.RequestConfigProvider !== "undefined" && index_2.RequestConfigProvider) === "function" ? _a : Object, typeof (_b = typeof index_2.GauzyAIService !== "undefined" && index_2.GauzyAIService) === "function" ? _b : Object, integration_service_1.IntegrationService,
        integration_tenant_service_1.IntegrationTenantService])
], IntegrationAIService);
//# sourceMappingURL=integration-ai.service.js.map