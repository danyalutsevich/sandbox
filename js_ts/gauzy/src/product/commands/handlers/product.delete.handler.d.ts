import { ICommandHandler } from '@nestjs/cqrs';
import { ProductDeleteCommand } from '../product.delete.command';
import { ProductService } from '../../product.service';
import { ProductVariantService } from '../../../product-variant/product-variant.service';
import { DeleteResult } from 'typeorm';
import { ProductVariantSettingService } from '../../../product-setting/product-setting.service';
import { ProductVariantPriceService } from '../../../product-variant-price/product-variant-price.service';
import { ProductOptionService } from 'product-option/product-option.service';
import { ProductOptionGroupService } from 'product-option/product-option-group.service';
export declare class ProductDeleteHandler implements ICommandHandler<ProductDeleteCommand> {
    private productService;
    private productOptionService;
    private productOptionsGroupService;
    private productVariantService;
    private productVariantSettingsService;
    private productVariantPricesService;
    constructor(productService: ProductService, productOptionService: ProductOptionService, productOptionsGroupService: ProductOptionGroupService, productVariantService: ProductVariantService, productVariantSettingsService: ProductVariantSettingService, productVariantPricesService: ProductVariantPriceService);
    execute(command?: ProductDeleteCommand): Promise<DeleteResult>;
}
