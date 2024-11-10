import { CommandBus, ICommandHandler } from '@nestjs/cqrs';
import { ActivityCreateCommand } from '../activity-create.command';
import { ActivityService } from './../../../activity/activity.service';
import { TimeSlotService } from './../../../time-slot/time-slot.service';
export declare class ActivityCreateHandler implements ICommandHandler<ActivityCreateCommand> {
    private readonly _activityService;
    private readonly _timeSlotService;
    private readonly _commandBus;
    constructor(_activityService: ActivityService, _timeSlotService: TimeSlotService, _commandBus: CommandBus);
    execute(command: ActivityCreateCommand): Promise<any>;
}
