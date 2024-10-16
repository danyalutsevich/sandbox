import { ICommand } from '@nestjs/cqrs';
import { IIntegrationFilter } from '../../../plugins/contracts';
export declare class IntegrationGetCommand implements ICommand {
    readonly input: IIntegrationFilter;
    static readonly type = "[Integration] Get Integrations";
    constructor(input: IIntegrationFilter);
}
