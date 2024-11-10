import { ICommandHandler } from '@nestjs/cqrs';
import { ProductVariant } from '../../product-variant.entity';
import { ProductVariantCreateCommand } from '../product-variant.create.command';
import { ProductVariantService } from '../../product-variant.service';
import { ProductVariantPriceService } from '../../../product-variant-price/product-variant-price.service';
import { ProductVariantSettingService } from '../../../product-setting/product-setting.service';
import { ProductService } from '../../../product/product.service';
export declare class ProductVariantCreateHandler implements ICommandHandler<ProductVariantCreateCommand> {
    private productService;
    private productVariantService;
    private productVariantPriceService;
    private productVariantSettingsService;
    constructor(productService: ProductService, productVariantService: ProductVariantService, productVariantPriceService: ProductVariantPriceService, productVariantSettingsService: ProductVariantSettingService);
    execute(command?: ProductVariantCreateCommand): Promise<ProductVariant[]>;
}
