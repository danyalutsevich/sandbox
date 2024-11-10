import { ICommandHandler } from '@nestjs/cqrs';
import { ProductService } from '../../../product/product.service';
import { ProductCreateCommand } from '../product.create.command';
import { ProductOptionService } from '../../../product-option/product-option.service';
import { Product } from '../../product.entity';
import { ProductOptionGroupService } from 'product-option/product-option-group.service';
export declare class ProductCreateHandler implements ICommandHandler<ProductCreateCommand> {
    private productOptionService;
    private productService;
    private productOptionsGroupService;
    constructor(productOptionService: ProductOptionService, productService: ProductService, productOptionsGroupService: ProductOptionGroupService);
    execute(command?: ProductCreateCommand): Promise<Product>;
}
