import { IHubstaffTimeSlotActivity, IIntegrationMapSyncEntity } from '../../../plugins/contracts';
import { ICommand } from '@nestjs/cqrs';
export declare class IntegrationMapSyncTimeSlotCommand implements ICommand {
    readonly input: IIntegrationMapSyncEntity<IHubstaffTimeSlotActivity>;
    static readonly type = "[Integration Map] Sync TimeSlot";
    constructor(input: IIntegrationMapSyncEntity<IHubstaffTimeSlotActivity>);
}
