import { ICommandHandler } from '@nestjs/cqrs';
import { ScreenshotUpdateCommand } from './../screenshot-update.command';
import { ScreenshotService } from './../../../screenshot/screenshot.service';
export declare class ScreenshotUpdateHandler implements ICommandHandler<ScreenshotUpdateCommand> {
    private readonly _screenshotService;
    constructor(_screenshotService: ScreenshotService);
    execute(command: ScreenshotUpdateCommand): Promise<any>;
}
