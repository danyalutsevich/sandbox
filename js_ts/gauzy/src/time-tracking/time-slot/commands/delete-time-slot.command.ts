import { ICommand } from '@nestjs/cqrs';
import { IDeleteTimeSlot } from '../../../../plugins/contracts/dist/index';

export class DeleteTimeSlotCommand implements ICommand {
	static readonly type = '[TimeSlot] delete';

	constructor(
		public readonly query: IDeleteTimeSlot
	) {}
}
