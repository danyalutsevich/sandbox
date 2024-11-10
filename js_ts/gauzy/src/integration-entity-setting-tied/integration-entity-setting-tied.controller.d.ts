import { CommandBus } from '@nestjs/cqrs';
import { IIntegrationEntitySettingTied } from '../../plugins/contracts/dist/index';
export declare class IntegrationEntitySettingTiedController {
    private readonly _commandBus;
    constructor(_commandBus: CommandBus);
    updateIntegrationEntitySettingTiedByIntegration(integrationId: string, entity: any): Promise<IIntegrationEntitySettingTied>;
}
