import { ICommand } from '@nestjs/cqrs';
import { IIntegrationMapSyncEntityInput } from '../../../plugins/contracts';
export declare class IntegrationMapSyncEntityCommand implements ICommand {
    readonly input: IIntegrationMapSyncEntityInput;
    static readonly type = "[Integration Map] Sync Entity";
    constructor(input: IIntegrationMapSyncEntityInput);
}
