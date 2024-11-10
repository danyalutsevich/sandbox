import { Repository } from 'typeorm';
import { ProductVariant } from '../product-variant.entity';
export declare class TypeOrmProductVariantRepository extends Repository<ProductVariant> {
    readonly repository: Repository<ProductVariant>;
    constructor(repository: Repository<ProductVariant>);
}
