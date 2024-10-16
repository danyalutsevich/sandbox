import { CrudController } from './../core/crud';
import { ProductVariantPrice } from './product-variant-price.entity';
import { ProductVariantPriceService } from './product-variant-price.service';
export declare class ProductVariantPriceController extends CrudController<ProductVariantPrice> {
    private readonly productVariantPriceService;
    constructor(productVariantPriceService: ProductVariantPriceService);
}
