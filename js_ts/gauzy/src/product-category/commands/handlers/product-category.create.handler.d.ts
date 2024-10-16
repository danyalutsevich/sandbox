import { ICommandHandler } from '@nestjs/cqrs';
import { IProductTypeTranslatable } from '../../../../plugins/contracts/dist/index';
import { ProductCategoryCreateCommand } from '../product-category.create.command';
import { ProductCategoryService } from './../../product-category.service';
export declare class ProductCategoryCreateHandler implements ICommandHandler<ProductCategoryCreateCommand> {
    private readonly productCategoryService;
    constructor(productCategoryService: ProductCategoryService);
    execute(command: ProductCategoryCreateCommand): Promise<IProductTypeTranslatable>;
}
