import { Repository } from 'typeorm';
import { ProductTranslation } from '../product-translation.entity';
export declare class TypeOrmProductTranslationRepository extends Repository<ProductTranslation> {
    readonly repository: Repository<ProductTranslation>;
    constructor(repository: Repository<ProductTranslation>);
}
