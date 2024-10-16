import { IQuery } from '@nestjs/cqrs';
import { ITaskVersionFindInput } from '../../../../plugins/contracts/dist/index';

export class FindVersionsQuery implements IQuery {
	static readonly type = '[Task Versions] Query All';

	constructor(
		public readonly options: ITaskVersionFindInput
	) { }
}
