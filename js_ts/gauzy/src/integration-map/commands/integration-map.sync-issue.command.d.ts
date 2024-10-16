import { ICommand } from '@nestjs/cqrs';
import { IIntegrationMapSyncEntity, ITaskCreateInput, ITaskUpdateInput } from '../../../plugins/contracts';
export declare class IntegrationMapSyncIssueCommand implements ICommand {
    readonly request: IIntegrationMapSyncEntity<ITaskCreateInput | ITaskUpdateInput>;
    readonly triggeredEvent: boolean;
    static readonly type = "[Integration Map] Sync Issue";
    constructor(request: IIntegrationMapSyncEntity<ITaskCreateInput | ITaskUpdateInput>, triggeredEvent?: boolean);
}
