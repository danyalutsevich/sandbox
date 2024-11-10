import { IImageAsset, IPagination, IProductCreateInput, IProductFindInput, IProductTranslatable, IProductTranslated, LanguagesEnum, TranslatePropertyInput } from '../../plugins/contracts/dist/index';
import { TenantAwareCrudService } from './../core/crud';
import { Product } from './product.entity';
import { ProductTranslation } from './product-translation.entity';
import { TypeOrmProductRepository } from './repository/type-orm-product.repository';
import { MikroOrmProductRepository } from './repository/mikro-orm-product.repository';
import { MikroOrmProductTranslationRepository } from './repository/mikro-orm-product-translation.repository';
import { TypeOrmProductTranslationRepository } from './repository/type-orm-product-translation.repository';
export declare class ProductService extends TenantAwareCrudService<Product> {
    private typeOrmProductTranslationRepository;
    propsTranslate: TranslatePropertyInput[];
    constructor(typeOrmProductRepository: TypeOrmProductRepository, mikroOrmProductRepository: MikroOrmProductRepository, typeOrmProductTranslationRepository: TypeOrmProductTranslationRepository, mikroOrmProductTranslationRepository: MikroOrmProductTranslationRepository);
    pagination(filter: any, language: LanguagesEnum): Promise<{
        items: any[];
        total: number;
    }>;
    findProducts(input: any, language: LanguagesEnum): Promise<IPagination<Product | IProductTranslated>>;
    findAllProducts(langCode?: LanguagesEnum, relations?: string[], findInput?: IProductFindInput, options?: {
        page: number;
        limit: number;
    }): Promise<IPagination<Product | IProductTranslated>>;
    findByIdTranslated(langCode: string, id: string, relations?: string[]): Promise<Product | IProductTranslated>;
    findById(id: string, options: any): Promise<Product>;
    saveProduct(productRequest: IProductCreateInput): Promise<Product>;
    addGalleryImages(productId: string, images: IImageAsset[]): Promise<Product>;
    setAsFeatured(productId: string, image: IImageAsset): Promise<Product>;
    deleteGalleryImage(productId: string, imageId: string): Promise<Product>;
    deleteFeaturedImage(productId: string): Promise<Product>;
    saveProductTranslation(productTranslation: ProductTranslation): Promise<ProductTranslation>;
    mapTranslatedProducts(items: IProductTranslatable[], languageCode: LanguagesEnum): Promise<any[]>;
}
