import { IPagination, IProductTypeTranslatable, LanguagesEnum } from '../../plugins/contracts/dist/index';
import { PaginationParams, TenantAwareCrudService } from './../core/crud';
import { ProductType } from './product-type.entity';
import { MikroOrmProductTypeRepository } from './repository/mikro-orm-product-type.repository';
import { TypeOrmProductTypeRepository } from './repository/type-orm-product-type.repository';
export declare class ProductTypeService extends TenantAwareCrudService<ProductType> {
    constructor(typeOrmProductTypeRepository: TypeOrmProductTypeRepository, mikroOrmProductTypeRepository: MikroOrmProductTypeRepository);
    /**
     * GET product types using pagination
     *
     * @param options
     * @param language
     * @returns
     */
    pagination(options: PaginationParams<ProductType>, language: LanguagesEnum): Promise<{
        items: any[];
        total: number;
    }>;
    /**
     * UPDATE product type
     *
     * @param id
     * @param entity
     * @returns
     */
    updateProductType(id: string, entity: ProductType): Promise<ProductType>;
    /**
     * GET all product types
     *
     * @param options
     * @param language
     * @returns
     */
    findProductTypes(options: PaginationParams<ProductType>, language: LanguagesEnum): Promise<IPagination<ProductType>>;
    /**
     * MAP product types translations
     *
     * @param items
     * @param languageCode
     * @returns
     */
    mapTranslatedProductTypes(items: IProductTypeTranslatable[], languageCode: LanguagesEnum): Promise<any[]>;
    /**
     * MAP product type translations
     *
     * @param type
     * @param languageCode
     * @returns
     */
    mapTranslatedProductType(type: IProductTypeTranslatable, languageCode: LanguagesEnum): Promise<any>;
}
