import { Repository } from 'typeorm';
import { ProductCategory } from '../product-category.entity';
export declare class TypeOrmProductCategoryRepository extends Repository<ProductCategory> {
    readonly repository: Repository<ProductCategory>;
    constructor(repository: Repository<ProductCategory>);
}
