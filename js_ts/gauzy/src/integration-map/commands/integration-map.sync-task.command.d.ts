import { ICommand } from '@nestjs/cqrs';
import { IIntegrationMapSyncEntity, ITaskCreateInput, ITaskUpdateInput } from '../../../plugins/contracts';
export declare class IntegrationMapSyncTaskCommand implements ICommand {
    readonly input: IIntegrationMapSyncEntity<ITaskCreateInput | ITaskUpdateInput>;
    readonly triggeredEvent: boolean;
    static readonly type = "[Integration Map] Sync Task";
    constructor(input: IIntegrationMapSyncEntity<ITaskCreateInput | ITaskUpdateInput>, triggeredEvent?: boolean);
}
