import { CommandBus } from '@nestjs/cqrs';
import { Integration } from './integration.entity';
import { IntegrationType } from './integration-type.entity';
export declare class IntegrationController {
    private readonly _commandBus;
    constructor(_commandBus: CommandBus);
    /**
     * GET all integration types
     *
     * @returns
     */
    getIntegrationTypes(): Promise<IntegrationType[]>;
    /**
     * GET all system integrations
     *
     * @param filters
     * @returns
     */
    getIntegrations(filters: any): Promise<Integration[]>;
}
