import { ICommand } from '@nestjs/cqrs';
import { IUpdateScreenshotInput } from '../../../../plugins/contracts/dist/index';
export declare class ScreenshotUpdateCommand implements ICommand {
    readonly input: IUpdateScreenshotInput;
    static readonly type = "[Screenshot] Update Screenshot";
    constructor(input: IUpdateScreenshotInput);
}
