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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.IntegrationAIMiddleware = void 0;
const common_1 = require("@nestjs/common");
const index_1 = require("../../../plugins/common/dist/index");
const contracts_1 = require("../../../plugins/contracts");
const index_2 = require("../../../plugins/plugins/integration-ai/dist/index");
const utils_1 = require("./../../core/utils");
const integration_tenant_service_1 = require("./../../integration-tenant/integration-tenant.service");
const cache_manager_1 = require("@nestjs/cache-manager");
let IntegrationAIMiddleware = exports.IntegrationAIMiddleware = class IntegrationAIMiddleware {
    cacheManager;
    _integrationTenantService;
    _requestConfigProvider;
    logging = true;
    constructor(cacheManager, _integrationTenantService, _requestConfigProvider) {
        this.cacheManager = cacheManager;
        this._integrationTenantService = _integrationTenantService;
        this._requestConfigProvider = _requestConfigProvider;
    }
    async use(request, _response, next) {
        try {
            // Extract tenant and organization IDs from request headers and body
            const tenantId = request.header('tenant-id') || request.body?.tenantId;
            const organizationId = request.header('organization-id') || request.body?.organizationId;
            if (this.logging) {
                // Log tenant and organization IDs
                console.log('Auth Tenant-ID Header: %s', tenantId);
                console.log('Auth Organization-ID Header: %s', organizationId);
            }
            // Initialize custom headers
            request.headers['X-APP-ID'] = null;
            request.headers['X-API-KEY'] = null;
            request.headers['X-OPENAI-SECRET-KEY'] = null;
            request.headers['X-OPENAI-ORGANIZATION-ID'] = null;
            // Set default configuration in the requestConfigProvider if no integration settings found
            this._requestConfigProvider.resetConfig();
            // Check if tenant and organization IDs are not empty
            if ((0, index_1.isNotEmpty)(tenantId) && (0, index_1.isNotEmpty)(organizationId)) {
                console.log(`Getting Gauzy AI integration settings from Cache for tenantId: ${tenantId}, organizationId: ${organizationId}`);
                const cacheKey = `integrationTenantSettings_${tenantId}_${organizationId}_${contracts_1.IntegrationEnum.GAUZY_AI}`;
                // Fetch integration settings from the service
                let integrationTenantSettings = await this.cacheManager.get(cacheKey);
                if (!integrationTenantSettings) {
                    console.log(`Gauzy AI integration settings NOT loaded from Cache for tenantId: ${tenantId}, organizationId: ${organizationId}`);
                    const fromDb = await this._integrationTenantService.getIntegrationTenantSettings({
                        tenantId,
                        organizationId,
                        name: contracts_1.IntegrationEnum.GAUZY_AI
                    });
                    if (fromDb && fromDb.settings) {
                        integrationTenantSettings = fromDb.settings;
                        const ttl = 5 * 60 * 1000; // 5 min caching period for Integration Tenant Settings
                        await this.cacheManager.set(cacheKey, integrationTenantSettings, ttl);
                        console.log(`Gauzy AI integration settings loaded from DB and stored in Cache for tenantId: ${tenantId}, organizationId: ${organizationId}`);
                    }
                }
                else {
                    console.log(`Gauzy AI integration settings loaded from Cache for tenantId: ${tenantId}, organizationId: ${organizationId}`);
                }
                if (integrationTenantSettings && integrationTenantSettings.length > 0) {
                    const settings = (0, utils_1.arrayToObject)(integrationTenantSettings, 'settingsName', 'settingsValue');
                    // Log API Key and API Secret if logging is enabled
                    if (this.logging) {
                        console.log('AI Integration API Key:', settings.apiKey);
                        console.log('AI Integration API Secret:', settings.apiSecret);
                    }
                    const { apiKey, apiSecret, openAiSecretKey, openAiOrganizationId } = settings;
                    if (apiKey && apiSecret) {
                        // Update custom headers and request configuration with API key and secret
                        request.headers['X-APP-ID'] = apiKey;
                        request.headers['X-API-KEY'] = apiSecret;
                        // Add OpenAI headers if available
                        if ((0, index_1.isNotEmpty)(openAiSecretKey)) {
                            request.headers['X-OPENAI-SECRET-KEY'] = openAiSecretKey;
                        }
                        if ((0, index_1.isNotEmpty)(openAiOrganizationId)) {
                            request.headers['X-OPENAI-ORGANIZATION-ID'] = openAiOrganizationId;
                        }
                        // Log configuration settings if logging is enabled
                        if (this.logging) {
                            console.log('AI Integration Config Settings:', {
                                apiKey,
                                apiSecret,
                                openAiSecretKey,
                                openAiOrganizationId
                            });
                        }
                        // Set configuration in the requestConfigProvider
                        this._requestConfigProvider.setConfig({
                            apiKey,
                            apiSecret,
                            ...((0, index_1.isNotEmpty)(openAiSecretKey) && { openAiSecretKey }),
                            ...((0, index_1.isNotEmpty)(openAiOrganizationId) && { openAiOrganizationId })
                        });
                    }
                }
            }
        }
        catch (error) {
            console.log('Error while getting AI integration settings: %s', error?.message);
            console.log(request.path, request.url);
        }
        // Continue to the next middleware or route handler
        next();
    }
};
exports.IntegrationAIMiddleware = IntegrationAIMiddleware = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(cache_manager_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [Object, integration_tenant_service_1.IntegrationTenantService, typeof (_a = typeof index_2.RequestConfigProvider !== "undefined" && index_2.RequestConfigProvider) === "function" ? _a : Object])
], IntegrationAIMiddleware);
//# sourceMappingURL=integration-ai.middleware.js.map