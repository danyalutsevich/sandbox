import { CommandBus } from '@nestjs/cqrs';
import { IIntegrationAICreateInput, IIntegrationTenant, IIntegrationTenantUpdateInput } from '../../../plugins/contracts';
import { GauzyAIService, RequestConfigProvider } from '../../../plugins/plugins/integration-ai/dist/index';
import { IntegrationTenantService } from '../../integration-tenant/integration-tenant.service';
import { IntegrationService } from './../../integration/integration.service';
export declare class IntegrationAIService {
    private readonly _commandBus;
    private readonly _requestConfigProvider;
    private readonly _gauzyAIService;
    private readonly _integrationService;
    private readonly _integrationTenantService;
    constructor(_commandBus: CommandBus, _requestConfigProvider: RequestConfigProvider, _gauzyAIService: GauzyAIService, _integrationService: IntegrationService, _integrationTenantService: IntegrationTenantService);
    /**
     * Creates a new integration tenant for Gauzy AI.
     * @param input - The input data for creating the integration tenant.
     * @returns A promise that resolves to the created integration tenant.
     */
    create(input: IIntegrationAICreateInput): Promise<IIntegrationTenant>;
    /**
     * Updates an integration tenant by ID with the provided input.
     *
     * @param {IIntegrationTenant['id']} integrationId - The ID of the integration tenant to update.
     * @param {IIntegrationTenantUpdateInput} input - The input data for the update.
     * @returns {Promise<IIntegrationTenant>} - A promise resolving to the updated integration tenant.
     */
    update(integrationId: IIntegrationTenant['id'], input: IIntegrationTenantUpdateInput): Promise<IIntegrationTenant>;
    /**
     * Updates a tenant's API key by configuring the necessary parameters,
     * triggering the update in the Gauzy AI service, and handling any potential errors in a robust manner.
     */
    updateOneTenantApiKey({ apiKey, apiSecret, openAiSecretKey, openAiOrganizationId }: {
        apiKey: any;
        apiSecret: any;
        openAiSecretKey: any;
        openAiOrganizationId: any;
    }): Promise<void>;
}
