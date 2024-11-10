import { Repository } from 'typeorm';
import { ProductTypeTranslation } from '../product-type-translation.entity';
export declare class TypeOrmProductTypeTranslationRepository extends Repository<ProductTypeTranslation> {
    readonly repository: Repository<ProductTypeTranslation>;
    constructor(repository: Repository<ProductTypeTranslation>);
}
