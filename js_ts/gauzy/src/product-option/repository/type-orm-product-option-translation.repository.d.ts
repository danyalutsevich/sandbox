import { Repository } from 'typeorm';
import { ProductOptionTranslation } from '../product-option-translation.entity';
export declare class TypeOrmProductOptionTranslationRepository extends Repository<ProductOptionTranslation> {
    readonly repository: Repository<ProductOptionTranslation>;
    constructor(repository: Repository<ProductOptionTranslation>);
}
