import { ICommand } from '@nestjs/cqrs';
import { IProductCreateInput } from '../../../plugins/contracts';

export class ProductCreateCommand implements ICommand {
	static readonly type = '[Product] Register';

	constructor(public readonly productInput: IProductCreateInput) {}
}
