import { ICommandHandler } from '@nestjs/cqrs';
import { ProductVariantDeleteCommand } from '../product-variant.delete.command';
import { ProductVariantService } from '../../product-variant.service';
import { ProductVariantSettingService } from '../../../product-setting/product-setting.service';
import { ProductVariantPriceService } from '../../../product-variant-price/product-variant-price.service';
import { DeleteResult } from 'typeorm/query-builder/result/DeleteResult';
export declare class ProductVariantDeleteHandler implements ICommandHandler<ProductVariantDeleteCommand> {
    private productVariantService;
    private productVariantSettingsService;
    private productVariantPricesService;
    constructor(productVariantService: ProductVariantService, productVariantSettingsService: ProductVariantSettingService, productVariantPricesService: ProductVariantPriceService);
    execute(command?: ProductVariantDeleteCommand): Promise<DeleteResult>;
}
