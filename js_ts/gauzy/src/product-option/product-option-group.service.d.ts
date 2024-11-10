import { ProductOptionGroupTranslation } from './../core/entities/internal';
import { TenantAwareCrudService } from './../core/crud';
import { IProductOptionGroupTranslation, IProductOptionGroupTranslatable } from '../../plugins/contracts/dist/index';
import { ProductOptionGroup } from './product-option-group.entity';
import { MikroOrmProductOptionGroupRepository } from './repository/mikro-orm-product-option-group.repository';
import { TypeOrmProductOptionGroupRepository } from './repository/type-orm-product-option-group.repository';
import { MikroOrmProductOptionGroupTranslationRepository } from './repository/mikro-orm-product-option-group-translation.repository';
import { TypeOrmProductOptionGroupTranslationRepository } from './repository/type-orm-product-option-group-translation.repository';
export declare class ProductOptionGroupService extends TenantAwareCrudService<ProductOptionGroup> {
    private typeOrmProductOptionGroupTranslationRepository;
    constructor(typeOrmProductOptionGroupRepository: TypeOrmProductOptionGroupRepository, mikroOrmProductOptionGroupRepository: MikroOrmProductOptionGroupRepository, typeOrmProductOptionGroupTranslationRepository: TypeOrmProductOptionGroupTranslationRepository, mikroOrmProductOptionGroupTranslationRepository: MikroOrmProductOptionGroupTranslationRepository);
    create(productOptionsGroupInput: ProductOptionGroup): Promise<ProductOptionGroup>;
    createBulk(productOptionsGroupInput: ProductOptionGroup[]): Promise<ProductOptionGroup[]>;
    saveBulk(productOptionsGroupInput: ProductOptionGroup[]): Promise<ProductOptionGroup[]>;
    deleteBulk(productOptionGroupsInput: IProductOptionGroupTranslatable[]): Promise<ProductOptionGroup[]>;
    createTranslations(optionGroupTranslations: ProductOptionGroupTranslation[]): Promise<ProductOptionGroupTranslation[]>;
    createTranslation(optionGroupTranslation: ProductOptionGroupTranslation): Promise<ProductOptionGroupTranslation>;
    deleteGroupTranslationsBulk(productOptionGroupTranslationsInput: IProductOptionGroupTranslation[]): Promise<ProductOptionGroupTranslation[]>;
}
