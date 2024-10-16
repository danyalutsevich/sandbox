import { ICommand } from '@nestjs/cqrs';
import { ITimeSlotCreateInput } from '../../../../plugins/contracts/dist/index';

export class TimeSlotCreateCommand implements ICommand {
	static readonly type = '[TimeSlot] Create TimeSlot';

	constructor(public readonly input: ITimeSlotCreateInput) {}
}
