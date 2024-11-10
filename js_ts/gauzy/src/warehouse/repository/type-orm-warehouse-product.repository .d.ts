import { Repository } from 'typeorm';
import { WarehouseProduct } from '../warehouse-product.entity';
export declare class TypeOrmWarehouseProductRepository extends Repository<WarehouseProduct> {
    readonly repository: Repository<WarehouseProduct>;
    constructor(repository: Repository<WarehouseProduct>);
}
