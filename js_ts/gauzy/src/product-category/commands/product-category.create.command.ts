import { ICommand } from '@nestjs/cqrs';
import { IProductCategoryTranslatable, LanguagesEnum } from '../../../plugins/contracts';

export class ProductCategoryCreateCommand implements ICommand {
	static readonly type = '[Product Category] Create';

	constructor(
		public readonly input: IProductCategoryTranslatable,
		public readonly language: LanguagesEnum
	) {}
}
