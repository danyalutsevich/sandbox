import { Repository } from 'typeorm';
import { WarehouseProductVariant } from '../warehouse-product-variant.entity';
export declare class TypeOrmWarehouseProductVariantRepository extends Repository<WarehouseProductVariant> {
    readonly repository: Repository<WarehouseProductVariant>;
    constructor(repository: Repository<WarehouseProductVariant>);
}
