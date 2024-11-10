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
exports.IntegrationTenantService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const context_1 = require("../core/context");
const crud_1 = require("../core/crud");
const mikro_orm_integration_tenant_repository_1 = require("./repository/mikro-orm-integration-tenant.repository");
const type_orm_integration_tenant_repository_1 = require("./repository/type-orm-integration-tenant.repository");
let IntegrationTenantService = exports.IntegrationTenantService = class IntegrationTenantService extends crud_1.TenantAwareCrudService {
    constructor(typeOrmIntegrationTenantRepository, mikroOrmIntegrationTenantRepository) {
        super(typeOrmIntegrationTenantRepository, mikroOrmIntegrationTenantRepository);
    }
    /**
     * Find and return a paginated list of IntegrationTenant entities.
     *
     * @param options - Optional query and pagination options.
     * @returns A Promise that resolves to a paginated list of IntegrationTenant entities.
     */
    async findAll(options) {
        // Define where conditions by merging provided options with a condition for non-null integrationId.
        const whereConditions = {
            ...options?.where,
            integrationId: (0, typeorm_1.Not)((0, typeorm_1.IsNull)())
        };
        // Call the superclass's findAll method with merged options and where conditions.
        return await super.findAll({
            ...options,
            where: whereConditions
        });
    }
    /**
     * Create a new integration tenant with the provided input.
     * @param input The data for creating the integration tenant.
     * @returns A promise that resolves to the created integration tenant.
     */
    async create(input) {
        try {
            const tenantId = context_1.RequestContext.currentTenantId() || input.tenantId;
            let { organizationId, entitySettings = [], settings = [] } = input;
            settings = settings.map((item) => ({
                ...item,
                tenantId,
                organizationId
            }));
            entitySettings = entitySettings.map((item) => ({
                ...item,
                tenantId,
                organizationId
            }));
            return await super.create({
                ...input,
                tenantId,
                organizationId,
                settings,
                entitySettings
            });
        }
        catch (error) {
            console.log('Error while creating integration tenant:', error);
            throw new common_1.BadRequestException(error);
        }
    }
    /**
     * Retrieve an integration tenant by specified options.
     * @param input - The input options for finding the integration tenant.
     * @returns The integration tenant if found, or `false` if not found or an error occurs.
     */
    async getIntegrationByOptions(input) {
        try {
            const tenantId = context_1.RequestContext.currentTenantId() || input.tenantId;
            const { organizationId, name } = input;
            const integration = await this.findOneByOptions({
                where: {
                    tenantId,
                    organizationId,
                    name,
                    isActive: true,
                    isArchived: false,
                    integration: {
                        provider: name,
                        isActive: true,
                        isArchived: false
                    }
                },
                order: {
                    updatedAt: 'DESC'
                },
                ...(input.relations ? { relations: input.relations } : {})
            });
            return integration || false;
        }
        catch {
            return false;
        }
    }
    /**
     * Get integration tenant settings by specified options.
     * @param input - The input options for finding the integration tenant settings.
     * @returns The integration tenant settings if found. null if not found or an error occurs.
     */
    async getIntegrationTenantSettings(input) {
        try {
            const tenantId = context_1.RequestContext.currentTenantId() || input.tenantId;
            const { organizationId, name } = input;
            return await this.findOneByOptions({
                where: {
                    tenantId,
                    organizationId,
                    name,
                    isActive: true,
                    isArchived: false,
                    integration: {
                        provider: name,
                        isActive: true,
                        isArchived: false
                    }
                },
                relations: {
                    settings: true
                }
            });
        }
        catch (error) {
            console.error('Error occurred while retrieving integration tenant settings:', error);
            return null;
        }
    }
    /**
     * Find an IntegrationTenant by entity type.
     *
     * @param param0 - Destructured parameters object.
     *   @param organizationId - The ID of the organization.
     *   @param integrationId - The ID of the integration.
     *   @param entityType - The entity type for which to find the IntegrationTenant.
     * @returns A promise that resolves to the found IntegrationTenant or null if not found.
     */
    async findIntegrationTenantByEntity({ organizationId, integrationId, entityType }) {
        return await this.findOneByIdString(integrationId, {
            where: {
                organizationId,
                isActive: true,
                isArchived: false,
                entitySettings: {
                    entity: entityType,
                    organizationId,
                    sync: true,
                    isActive: true,
                    isArchived: false
                }
            }
        });
    }
};
exports.IntegrationTenantService = IntegrationTenantService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [type_orm_integration_tenant_repository_1.TypeOrmIntegrationTenantRepository,
        mikro_orm_integration_tenant_repository_1.MikroOrmIntegrationTenantRepository])
], IntegrationTenantService);
//# sourceMappingURL=integration-tenant.service.js.map