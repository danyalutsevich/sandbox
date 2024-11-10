import { FindManyOptions } from 'typeorm';
import { IIntegrationTenant, IIntegrationTenantCreateInput, IIntegrationTenantFindInput, IPagination, IntegrationEntity } from '../../plugins/contracts/dist/index';
import { TenantAwareCrudService } from '../core/crud';
import { IntegrationTenant } from './integration-tenant.entity';
import { MikroOrmIntegrationTenantRepository } from './repository/mikro-orm-integration-tenant.repository';
import { TypeOrmIntegrationTenantRepository } from './repository/type-orm-integration-tenant.repository';
export declare class IntegrationTenantService extends TenantAwareCrudService<IntegrationTenant> {
    constructor(typeOrmIntegrationTenantRepository: TypeOrmIntegrationTenantRepository, mikroOrmIntegrationTenantRepository: MikroOrmIntegrationTenantRepository);
    /**
     * Find and return a paginated list of IntegrationTenant entities.
     *
     * @param options - Optional query and pagination options.
     * @returns A Promise that resolves to a paginated list of IntegrationTenant entities.
     */
    findAll(options?: FindManyOptions<IntegrationTenant>): Promise<IPagination<IntegrationTenant>>;
    /**
     * Create a new integration tenant with the provided input.
     * @param input The data for creating the integration tenant.
     * @returns A promise that resolves to the created integration tenant.
     */
    create(input: IIntegrationTenantCreateInput): Promise<IIntegrationTenant>;
    /**
     * Retrieve an integration tenant by specified options.
     * @param input - The input options for finding the integration tenant.
     * @returns The integration tenant if found, or `false` if not found or an error occurs.
     */
    getIntegrationByOptions(input: IIntegrationTenantFindInput): Promise<IIntegrationTenant | boolean>;
    /**
     * Get integration tenant settings by specified options.
     * @param input - The input options for finding the integration tenant settings.
     * @returns The integration tenant settings if found. null if not found or an error occurs.
     */
    getIntegrationTenantSettings(input: IIntegrationTenantFindInput): Promise<IIntegrationTenant | null>;
    /**
     * Find an IntegrationTenant by entity type.
     *
     * @param param0 - Destructured parameters object.
     *   @param organizationId - The ID of the organization.
     *   @param integrationId - The ID of the integration.
     *   @param entityType - The entity type for which to find the IntegrationTenant.
     * @returns A promise that resolves to the found IntegrationTenant or null if not found.
     */
    findIntegrationTenantByEntity({ organizationId, integrationId, entityType }: {
        organizationId: string;
        integrationId: string;
        entityType: IntegrationEntity;
    }): Promise<IIntegrationTenant>;
}
