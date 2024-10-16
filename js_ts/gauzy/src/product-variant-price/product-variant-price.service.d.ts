import { TenantAwareCrudService } from './../core/crud';
import { ProductVariantPrice } from './product-variant-price.entity';
import { TypeOrmProductVariantPriceRepository } from './repository/type-orm-product-variant-price.repository';
import { MikroOrmProductVariantPriceRepository } from './repository/mikro-orm-product-variant-price.repository';
export declare class ProductVariantPriceService extends TenantAwareCrudService<ProductVariantPrice> {
    constructor(typeOrmProductVariantPriceRepository: TypeOrmProductVariantPriceRepository, mikroOrmProductVariantPriceRepository: MikroOrmProductVariantPriceRepository);
    /**
     *
     * @returns
     */
    createDefaultProductVariantPrice(): Promise<ProductVariantPrice>;
    /**
     *
     * @param productVariantPrices
     * @returns
     */
    deleteMany(productVariantPrices: ProductVariantPrice[]): Promise<ProductVariantPrice[]>;
}
