import { CommandBus } from '@nestjs/cqrs';
import { DeleteResult } from 'typeorm';
import { IIntegrationTenant, IPagination } from '../../plugins/contracts/dist/index';
import { CrudController, PaginationParams } from 'core/crud';
import { TenantOrganizationBaseDTO } from 'core/dto';
import { RelationsQueryDTO } from './../shared/dto';
import { IntegrationTenant } from './integration-tenant.entity';
import { IntegrationTenantService } from './integration-tenant.service';
import { IntegrationTenantQueryDTO, UpdateIntegrationTenantDTO } from './dto';
export declare class IntegrationTenantController extends CrudController<IntegrationTenant> {
    private readonly _commandBus;
    private readonly _integrationTenantService;
    constructor(_commandBus: CommandBus, _integrationTenantService: IntegrationTenantService);
    /**
     * Retrieve an integration tenant by specified options.
     *
     * @param options - The input options for finding the integration tenant.
     * @returns The integration tenant if found, or `false` if not found or an error occurs.
     */
    getIntegrationByOptions(options: IntegrationTenantQueryDTO): Promise<IIntegrationTenant | boolean>;
    /**
     * Fetch a paginated list of IntegrationTenant entities.
     * @param params - Query parameters for pagination and filtering.
     * @returns A paginated list of IntegrationTenant entities.
     */
    findAll(params: PaginationParams<IntegrationTenant>): Promise<IPagination<IntegrationTenant>>;
    /**
     * Fetches an IntegrationTenant entity by ID from the database.
     *
     * @param integrationId - The ID of the IntegrationTenant entity (validated by UUIDValidationPipe).
     * @param query - Optional query parameters, such as relations.
     * @returns {Promise<IIntegrationTenant>} The fetched IntegrationTenant entity.
     * @throws {InternalServerErrorException} If an error occurs during the fetching process.
     */
    findById(integrationId: IIntegrationTenant['id'], query: RelationsQueryDTO): Promise<IIntegrationTenant>;
    /**
     * Update an integration tenant with the provided data.
     *
     * @param id - The identifier of the integration tenant to update.
     * @param input - The data to update the integration tenant with.
     * @returns A response, typically the updated integration tenant or an error response.
     */
    update(id: IIntegrationTenant['id'], input: UpdateIntegrationTenantDTO): Promise<IIntegrationTenant>;
    /**
     * Delete a resource identified by the provided 'id'.
     *
     * @param {string} id - The identifier of the resource to be deleted.
     * @returns {Promise<DeleteResult>} A Promise that resolves with the DeleteResult indicating the result of the deletion.
     */
    delete(id: IIntegrationTenant['id'], query: TenantOrganizationBaseDTO): Promise<DeleteResult>;
}
