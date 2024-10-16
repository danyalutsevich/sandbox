import { IPagination, IProductCategoryTranslatable, LanguagesEnum } from '../../plugins/contracts/dist/index';
import { PaginationParams, TenantAwareCrudService } from './../core/crud';
import { ProductCategory } from './product-category.entity';
import { TypeOrmProductCategoryRepository } from './repository/type-orm-product-category.repository';
import { MikroOrmProductCategoryRepository } from './repository/mikro-orm-product-category.repository';
export declare class ProductCategoryService extends TenantAwareCrudService<ProductCategory> {
    constructor(typeOrmProductCategoryRepository: TypeOrmProductCategoryRepository, mikroOrmProductCategoryRepository: MikroOrmProductCategoryRepository);
    /**
     * GET product categories using pagination
     *
     * @param options
     * @param language
     * @returns
     */
    pagination(options: PaginationParams<ProductCategory>, language: LanguagesEnum): Promise<{
        items: any[];
        total: number;
    }>;
    /**
     * UPDATE product category
     *
     * @param id
     * @param entity
     * @returns
     */
    updateProductCategory(id: string, entity: ProductCategory): Promise<ProductCategory>;
    /**
     * GET all product categories
     *
     * @param input
     * @param language
     * @returns
     */
    findProductCategories(options: PaginationParams<ProductCategory>, language: LanguagesEnum): Promise<IPagination<ProductCategory>>;
    /**
     * MAP product category translations
     *
     * @param items
     * @param languageCode
     * @returns
     */
    mapTranslatedProductCategories(items: IProductCategoryTranslatable[], languageCode: LanguagesEnum): Promise<any[]>;
    /**
     * MAP product category translations
     *
     * @param type
     * @param languageCode
     * @returns
     */
    mapTranslatedProductType(type: IProductCategoryTranslatable, languageCode: LanguagesEnum): Promise<any>;
}
