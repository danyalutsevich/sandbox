import { CommandBus, ICommandHandler } from '@nestjs/cqrs';
import { ScreenshotCreateCommand } from './../screenshot-create.command';
import { ScreenshotService } from './../../../screenshot/screenshot.service';
import { TimeSlotService } from './../../../time-slot/time-slot.service';
export declare class ScreenshotCreateHandler implements ICommandHandler<ScreenshotCreateCommand> {
    private readonly _screenshotService;
    private readonly _timeSlotService;
    private readonly _commandBus;
    constructor(_screenshotService: ScreenshotService, _timeSlotService: TimeSlotService, _commandBus: CommandBus);
    execute(command: ScreenshotCreateCommand): Promise<any>;
}
