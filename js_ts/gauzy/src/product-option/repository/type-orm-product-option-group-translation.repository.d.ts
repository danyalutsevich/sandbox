import { Repository } from 'typeorm';
import { ProductOptionGroupTranslation } from '../product-option-group-translation.entity';
export declare class TypeOrmProductOptionGroupTranslationRepository extends Repository<ProductOptionGroupTranslation> {
    readonly repository: Repository<ProductOptionGroupTranslation>;
    constructor(repository: Repository<ProductOptionGroupTranslation>);
}
