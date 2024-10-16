import { TenantAwareCrudService } from './../core/crud';
import { ProductOptionTranslation } from './../core/entities/internal';
import { IProductOptionTranslatable, IProductOptionTranslation } from '../../plugins/contracts/dist/index';
import { ProductOption } from './product-option.entity';
import { TypeOrmProductOptionRepository } from './repository/type-orm-product-option.repository';
import { MikroOrmProductOptionRepository } from './repository/mikro-orm-product-option.repository';
import { MikroOrmProductOptionTranslationRepository } from './repository/mikro-orm-product-option-translation.repository';
import { TypeOrmProductOptionTranslationRepository } from './repository/type-orm-product-option-translation.repository';
export declare class ProductOptionService extends TenantAwareCrudService<ProductOption> {
    private typeOrmProductOptionTranslationRepository;
    constructor(typeOrmProductOptionRepository: TypeOrmProductOptionRepository, mikroOrmProductOptionRepository: MikroOrmProductOptionRepository, typeOrmProductOptionTranslationRepository: TypeOrmProductOptionTranslationRepository, mikroOrmProductOptionTranslationRepository: MikroOrmProductOptionTranslationRepository);
    saveProductOptionTranslations(translationsInput: ProductOptionTranslation[]): Promise<ProductOptionTranslation[]>;
    saveProductOptionTranslation(translationInput: ProductOptionTranslation): Promise<ProductOptionTranslation>;
    save(productOptionInput: IProductOptionTranslatable): Promise<ProductOption>;
    saveBulk(productOptionsInput: ProductOption[]): Promise<ProductOption[]>;
    deleteBulk(productOptionsInput: IProductOptionTranslatable[]): Promise<ProductOption[]>;
    deleteOptionTranslationsBulk(productOptionTranslationsInput: IProductOptionTranslation[]): Promise<ProductOptionTranslation[]>;
}
