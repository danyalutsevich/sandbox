import { ICommandHandler } from '@nestjs/cqrs';
import { ActivityUpdateCommand } from '../activity-update.command';
import { ActivityService } from './../../../activity/activity.service';
export declare class ActivityUpdateHandler implements ICommandHandler<ActivityUpdateCommand> {
    private readonly _activityService;
    constructor(_activityService: ActivityService);
    execute(command: ActivityUpdateCommand): Promise<any>;
}
