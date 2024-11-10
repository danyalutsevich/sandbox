import { Repository } from 'typeorm';
import { ProductCategoryTranslation } from '../product-category-translation.entity';
export declare class TypeOrmProductCategoryTranslationRepository extends Repository<ProductCategoryTranslation> {
    readonly repository: Repository<ProductCategoryTranslation>;
    constructor(repository: Repository<ProductCategoryTranslation>);
}
