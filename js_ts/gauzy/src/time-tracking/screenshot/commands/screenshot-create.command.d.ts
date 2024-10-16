import { ICommand } from '@nestjs/cqrs';
import { ICreateScreenshotInput } from '../../../../plugins/contracts/dist/index';
export declare class ScreenshotCreateCommand implements ICommand {
    readonly input: ICreateScreenshotInput;
    static readonly type = "[Screenshot] Create Screenshot";
    constructor(input: ICreateScreenshotInput);
}
