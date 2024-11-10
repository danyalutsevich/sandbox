import { ICommand } from '@nestjs/cqrs';
import { IIntegrationMapSyncEntity, ITimeLog } from '../../../plugins/contracts';
export declare class IntegrationMapSyncTimeLogCommand implements ICommand {
    readonly input: IIntegrationMapSyncEntity<Partial<ITimeLog>>;
    static readonly type = "[Integration Map] Sync TimeLog";
    constructor(input: IIntegrationMapSyncEntity<Partial<ITimeLog>>);
}
