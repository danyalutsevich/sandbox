import { ICommand } from '@nestjs/cqrs';
import { IActivity, IIntegrationMapSyncEntity } from '../../../plugins/contracts';
export declare class IntegrationMapSyncActivityCommand implements ICommand {
    readonly input: IIntegrationMapSyncEntity<IActivity>;
    static readonly type = "[Integration Map] Sync Activity";
    constructor(input: IIntegrationMapSyncEntity<IActivity>);
}
