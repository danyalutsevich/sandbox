import { Repository } from 'typeorm';
import { ProductType } from '../product-type.entity';
export declare class TypeOrmProductTypeRepository extends Repository<ProductType> {
    readonly repository: Repository<ProductType>;
    constructor(repository: Repository<ProductType>);
}
