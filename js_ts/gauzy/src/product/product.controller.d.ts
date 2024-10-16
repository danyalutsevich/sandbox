import { CommandBus } from '@nestjs/cqrs';
import { DeleteResult } from 'typeorm';
import { IProductTranslated, IImageAsset, IPagination, LanguagesEnum } from '../../plugins/contracts/dist/index';
import { CrudController, PaginationParams } from './../core/crud';
import { ProductService } from './product.service';
import { Product } from './product.entity';
import { CreateProductDTO, UpdateProductDTO } from './dto';
export declare class ProductController extends CrudController<Product> {
    private readonly productService;
    private readonly commandBus;
    constructor(productService: ProductService, commandBus: CommandBus);
    /**
     * GET all products translated
     *
     * @param langCode
     * @param data
     * @param page
     * @param limit
     * @returns
     */
    findAllProductsTranslated(langCode: LanguagesEnum, data: any, page: any, limit: any): Promise<IPagination<Product | IProductTranslated>>;
    /**
     * GET product by language & id
     *
     * @param id
     * @param langCode
     * @param data
     * @returns
     */
    findOneProductTranslated(id: string, langCode: string, data: any): Promise<Product | IProductTranslated>;
    /**
     * CRAETE product image gallery
     *
     * @param productId
     * @param images
     * @returns
     */
    addGalleryImage(productId: string, images: IImageAsset[]): Promise<Product>;
    /**
     * UPDATE product set image as a feature
     *
     * @param productId
     * @param image
     * @returns
     */
    setAsFeatured(productId: string, image: IImageAsset): Promise<Product>;
    /**
     * DELETE product gallery image by id
     *
     * @param productId
     * @param imageId
     * @returns
     */
    deleteGaleryImage(productId: string, imageId: string): Promise<Product>;
    /**
     * DELETE product feature image by product id
     *
     * @param productId
     * @returns
     */
    deleteFeaturedImage(productId: string): Promise<Product>;
    /**
     * GET inventory products count
     *
     * @param data
     * @returns
     */
    getCount(data?: any): Promise<number>;
    /**
     * GET inventory products by pagination
     *
     * @param filter
     * @returns
     */
    pagination(filter: PaginationParams<Product>, themeLanguage: LanguagesEnum): Promise<IPagination<Product>>;
    /**
     * GET all inventory products in the same tenant
     *
     * @param data
     * @param themeLanguage
     * @returns
     */
    findAll(data: any, themeLanguage: LanguagesEnum): Promise<IPagination<any>>;
    /**
     * GET product by id
     *
     * @param id
     * @param data
     * @returns
     */
    findById(id: string, data?: any): Promise<Product>;
    /**
     * CREATE new product
     *
     * @param entity
     * @returns
     */
    create(entity: CreateProductDTO): Promise<Product>;
    /**
     * UPDATE existing product by id
     *
     * @param id
     * @param entity
     * @returns
     */
    update(id: string, entity: UpdateProductDTO): Promise<Product>;
    /**
     * DELETE product by id
     *
     * @param id
     * @returns
     */
    delete(id: string): Promise<DeleteResult>;
}
