import { CommandBus } from '@nestjs/cqrs';
import { FindOptionsWhere } from 'typeorm';
import { LanguagesEnum, IPagination } from '../../plugins/contracts/dist/index';
import { ProductTypeService } from './product-type.service';
import { ProductType } from './product-type.entity';
import { CrudController, PaginationParams } from './../core/crud';
import { ProductTypeDTO } from './dto';
export declare class ProductTypeController extends CrudController<ProductType> {
    private readonly productTypesService;
    private readonly commandBus;
    constructor(productTypesService: ProductTypeService, commandBus: CommandBus);
    /**
     * GET inventory product types count
     *
     * @param data
     * @returns
     */
    getCount(options: FindOptionsWhere<ProductType>): Promise<number>;
    /**
     * GET inventory product types by pagination
     *
     * @param options
     * @param themeLanguage
     * @param languageCode
     * @returns
     */
    pagination(options: PaginationParams<ProductType>, themeLanguage: LanguagesEnum, languageCode: LanguagesEnum): Promise<IPagination<ProductType>>;
    /**
     * GET all product types
     *
     * @param options
     * @param themeLanguage
     * @returns
     */
    findAll(options: PaginationParams<ProductType>, themeLanguage: LanguagesEnum, languageCode: LanguagesEnum): Promise<IPagination<ProductType>>;
    /**
     * CREATE product type
     *
     * @param entity
     * @returns
     */
    create(entity: ProductTypeDTO, themeLanguage: LanguagesEnum, languageCode: LanguagesEnum): Promise<ProductType>;
    /**
     * UPDATE product type by id
     *
     * @param id
     * @param entity
     * @returns
     */
    update(id: string, entity: ProductTypeDTO): Promise<ProductType>;
}
