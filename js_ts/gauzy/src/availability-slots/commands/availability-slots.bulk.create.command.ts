import { ICommand } from '@nestjs/cqrs';
import { IAvailabilitySlotsCreateInput } from '../../../plugins/contracts';

export class AvailabilitySlotsBulkCreateCommand implements ICommand {
	static readonly type = '[Availability Bulk Slots] Register';

	constructor(
		public readonly input: IAvailabilitySlotsCreateInput[]
	) {}
}
