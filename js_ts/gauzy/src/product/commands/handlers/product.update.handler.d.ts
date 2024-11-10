import { ICommandHandler } from '@nestjs/cqrs';
import { ProductService } from '../../../product/product.service';
import { ProductOptionService } from '../../../product-option/product-option.service';
import { Product } from '../../product.entity';
import { ProductUpdateCommand } from '../product.update.command';
import { ProductOptionGroupService } from 'product-option/product-option-group.service';
import { IProductOptionGroupTranslatable, IProductOptionTranslatable, IProductOptionTranslation, IProductOptionGroupTranslation } from '../../../../plugins/contracts/dist/index';
export declare class ProductUpdateHandler implements ICommandHandler<ProductUpdateCommand> {
    private productOptionService;
    private productService;
    private productOptionsGroupService;
    constructor(productOptionService: ProductOptionService, productService: ProductService, productOptionsGroupService: ProductOptionGroupService);
    execute(command?: ProductUpdateCommand): Promise<Product>;
    /**
     * check if product option translation has been changed and needs updating
     */
    productOptionTranslationUpdated(productOption: IProductOptionTranslatable, productOptionTranslation: IProductOptionTranslation): boolean;
    /**
     * check if product option group translation has been changed and needs updating
     */
    productOptionGroupTranslationUpdated(optionGroup: IProductOptionGroupTranslatable, optionGroupTranslation: IProductOptionGroupTranslation): boolean;
}
