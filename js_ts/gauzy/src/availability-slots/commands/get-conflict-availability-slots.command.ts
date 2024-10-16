import { ICommand } from '@nestjs/cqrs';
import { IGetAvailabilitySlotsConflictInput } from '../../../plugins/contracts';

export class GetConflictAvailabilitySlotsCommand implements ICommand {
	static readonly type = '[AvailabilitySlots] get conflict';

	constructor(public readonly input: IGetAvailabilitySlotsConflictInput) {}
}
