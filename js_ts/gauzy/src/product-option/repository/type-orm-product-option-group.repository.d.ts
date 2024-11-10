import { Repository } from 'typeorm';
import { ProductOptionGroup } from '../product-option-group.entity';
export declare class TypeOrmProductOptionGroupRepository extends Repository<ProductOptionGroup> {
    readonly repository: Repository<ProductOptionGroup>;
    constructor(repository: Repository<ProductOptionGroup>);
}
