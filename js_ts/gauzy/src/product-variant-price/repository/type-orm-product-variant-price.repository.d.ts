import { Repository } from 'typeorm';
import { ProductVariantPrice } from '../product-variant-price.entity';
export declare class TypeOrmProductVariantPriceRepository extends Repository<ProductVariantPrice> {
    readonly repository: Repository<ProductVariantPrice>;
    constructor(repository: Repository<ProductVariantPrice>);
}
