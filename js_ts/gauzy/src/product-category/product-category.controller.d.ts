import { CommandBus } from '@nestjs/cqrs';
import { FindOptionsWhere } from 'typeorm';
import { LanguagesEnum, IPagination, IProductCategoryTranslatable } from '../../plugins/contracts/dist/index';
import { ProductCategory } from './product-category.entity';
import { ProductCategoryService } from './product-category.service';
import { CrudController, PaginationParams } from './../core/crud';
import { ProductCategoryDTO } from './dto';
export declare class ProductCategoryController extends CrudController<ProductCategory> {
    private readonly productCategoryService;
    private readonly commandBus;
    constructor(productCategoryService: ProductCategoryService, commandBus: CommandBus);
    /**
     * GET inventory product categories count
     *
     * @param options
     * @returns
     */
    getCount(options: FindOptionsWhere<ProductCategory>): Promise<number>;
    /**
     * GET inventory product categories by pagination
     *
     * @param options
     * @returns
     */
    pagination(options: PaginationParams<ProductCategory>, themeLanguage: LanguagesEnum, languageCode: LanguagesEnum): Promise<IPagination<ProductCategory>>;
    /**
     * GET all product categories
     *
     * @param options
     * @param themeLanguage
     * @param languageCode
     * @returns
     */
    findAll(options: PaginationParams<ProductCategory>, themeLanguage: LanguagesEnum, languageCode: LanguagesEnum): Promise<IPagination<ProductCategory>>;
    /**
     * CREATE product category
     *
     * @param entity
     * @returns
     */
    create(entity: ProductCategoryDTO, themeLanguage: LanguagesEnum, languageCode: LanguagesEnum): Promise<ProductCategory>;
    /**
     * UPDATE product category by id
     *
     * @param id
     * @param entity
     * @returns
     */
    update(id: IProductCategoryTranslatable['id'], entity: ProductCategoryDTO): Promise<ProductCategory>;
}
