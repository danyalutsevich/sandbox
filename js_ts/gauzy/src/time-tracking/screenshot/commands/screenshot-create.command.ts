import { ICommand } from '@nestjs/cqrs';
import { ICreateScreenshotInput } from '../../../../plugins/contracts/dist/index';

export class ScreenshotCreateCommand implements ICommand {
	static readonly type = '[Screenshot] Create Screenshot';

	constructor(public readonly input: ICreateScreenshotInput) {}
}
