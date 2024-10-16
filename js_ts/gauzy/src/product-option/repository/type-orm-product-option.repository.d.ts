import { Repository } from 'typeorm';
import { ProductOption } from '../product-option.entity';
export declare class TypeOrmProductOptionRepository extends Repository<ProductOption> {
    readonly repository: Repository<ProductOption>;
    constructor(repository: Repository<ProductOption>);
}
