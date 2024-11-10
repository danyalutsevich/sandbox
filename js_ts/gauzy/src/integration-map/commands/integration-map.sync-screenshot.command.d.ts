import { ICommand } from '@nestjs/cqrs';
import { IHubstaffScreenshotActivity, IIntegrationMapSyncEntity } from '../../../plugins/contracts';
export declare class IntegrationMapSyncScreenshotCommand implements ICommand {
    readonly input: IIntegrationMapSyncEntity<IHubstaffScreenshotActivity>;
    static readonly type = "[Integration Map] Sync Screenshot";
    constructor(input: IIntegrationMapSyncEntity<IHubstaffScreenshotActivity>);
}
