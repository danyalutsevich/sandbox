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
exports.GithubMiddleware = void 0;
const common_1 = require("@nestjs/common");
const cache_manager_1 = require("@nestjs/cache-manager");
const index_1 = require("../../../plugins/common/dist/index");
const contracts_1 = require("../../../plugins/contracts");
const utils_1 = require("../../core/utils");
const integration_tenant_service_1 = require("integration-tenant/integration-tenant.service");
let GithubMiddleware = exports.GithubMiddleware = class GithubMiddleware {
    cacheManager;
    _integrationTenantService;
    logging = true;
    constructor(cacheManager, _integrationTenantService) {
        this.cacheManager = cacheManager;
        this._integrationTenantService = _integrationTenantService;
    }
    /**
     *
     * @param request
     * @param _response
     * @param next
     */
    async use(request, _response, next) {
        try {
            const integrationId = request.params['integrationId'];
            if (integrationId) {
                const queryParameters = request.query;
                const tenantId = queryParameters.tenantId?.toString() ?? request.header('Tenant-Id');
                const organizationId = queryParameters.organizationId?.toString() ?? request.header('Organization-Id');
                // Check if tenant and organization IDs are not empty
                if ((0, index_1.isNotEmpty)(tenantId) && (0, index_1.isNotEmpty)(organizationId)) {
                    try {
                        // Fetch integration settings from the service
                        if (this.logging) {
                            console.log(`Getting Gauzy integration settings from Cache for tenantId: ${tenantId}, organizationId: ${organizationId}, integrationId: ${integrationId}`);
                        }
                        const cacheKey = `integrationTenantSettings_${tenantId}_${organizationId}_${integrationId}`;
                        let integrationTenantSettings = await this.cacheManager.get(cacheKey);
                        if (!integrationTenantSettings) {
                            if (this.logging) {
                                console.log(`Gauzy integration settings NOT loaded from Cache for tenantId: ${tenantId}, organizationId: ${organizationId}, integrationId: ${integrationId}`);
                            }
                            const fromDb = await this._integrationTenantService.findOneByIdString(integrationId, {
                                where: {
                                    tenantId,
                                    organizationId,
                                    isActive: true,
                                    isArchived: false,
                                    integration: {
                                        isActive: true,
                                        isArchived: false
                                    }
                                },
                                relations: {
                                    settings: true
                                }
                            });
                            if (fromDb && fromDb.settings) {
                                integrationTenantSettings = fromDb.settings;
                                const ttl = 5 * 60 * 1000; // 5 min caching period for GitHub Integration Tenant Settings
                                await this.cacheManager.set(cacheKey, integrationTenantSettings, ttl);
                                if (this.logging) {
                                    console.log(`Gauzy integration settings loaded from DB and stored in Cache for tenantId: ${tenantId}, organizationId: ${organizationId}, integrationId: ${integrationId}`);
                                }
                            }
                        }
                        else {
                            if (this.logging) {
                                console.log(`Gauzy integration settings loaded from Cache for tenantId: ${tenantId}, organizationId: ${organizationId}, integrationId: ${integrationId}`);
                            }
                        }
                        if (integrationTenantSettings && integrationTenantSettings.length > 0) {
                            /** Create an 'integration' object and assign properties to it. */
                            request['integration'] = new Object({
                                // Assign properties to the integration object
                                id: integrationId,
                                name: contracts_1.IntegrationEnum.GITHUB,
                                // Convert the 'settings' array to an object using the 'settingsName' and 'settingsValue' properties
                                settings: (0, utils_1.arrayToObject)(integrationTenantSettings, 'settingsName', 'settingsValue')
                            });
                        }
                    }
                    catch (error) {
                        console.log(`Error while getting integration (${contracts_1.IntegrationEnum.GITHUB}) tenant inside middleware: %s`, error?.message);
                        console.log(request.path, request.url);
                    }
                }
            }
        }
        catch (error) {
            console.log(`Error while getting integration (${contracts_1.IntegrationEnum.GITHUB}) tenant inside middleware: %s`, error?.message);
            console.log(request.path, request.url);
        }
        // Continue to the next middleware or route handler
        next();
    }
};
exports.GithubMiddleware = GithubMiddleware = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(cache_manager_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [Object, typeof (_a = typeof integration_tenant_service_1.IntegrationTenantService !== "undefined" && integration_tenant_service_1.IntegrationTenantService) === "function" ? _a : Object])
], GithubMiddleware);
//# sourceMappingURL=github.middleware.js.map