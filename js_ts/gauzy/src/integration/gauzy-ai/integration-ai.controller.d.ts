import { IIntegrationAICreateInput, IIntegrationTenant, IIntegrationTenantUpdateInput } from '../../../plugins/contracts';
import { IntegrationAIService } from './integration-ai.service';
export declare class IntegrationAIController {
    private readonly _integrationAIService;
    constructor(_integrationAIService: IntegrationAIService);
    /**
     *
     * @param input
     * @returns
     */
    create(input: IIntegrationAICreateInput): Promise<IIntegrationTenant>;
    /**
     *
     * @param id
     * @param input
     * @returns
     */
    update(id: IIntegrationTenant['id'], input: IIntegrationTenantUpdateInput): Promise<IIntegrationTenant>;
}
