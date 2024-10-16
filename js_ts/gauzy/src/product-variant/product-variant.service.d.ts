import { IPagination, IProductVariant } from '../../plugins/contracts/dist/index';
import { TenantAwareCrudService } from './../core/crud';
import { ProductVariant } from './product-variant.entity';
import { MikroOrmProductVariantRepository } from './repository/mikro-orm-product-variant.repository';
import { TypeOrmProductVariantRepository } from './repository/type-orm-product-variant.repository';
export declare class ProductVariantService extends TenantAwareCrudService<ProductVariant> {
    constructor(typeOrmProductVariantRepository: TypeOrmProductVariantRepository, mikroOrmProductVariantRepository: MikroOrmProductVariantRepository);
    findAllProductVariants(): Promise<IPagination<IProductVariant>>;
    findAllVariantsByProductId(productId: string): Promise<IPagination<IProductVariant>>;
    findOne(id: string): Promise<ProductVariant>;
    createBulk(productVariants: ProductVariant[]): Promise<ProductVariant[]>;
    createVariant(productVariant: ProductVariant): Promise<ProductVariant>;
    updateVariant(productVariant: ProductVariant): Promise<ProductVariant>;
    deleteMany(productVariants: ProductVariant[]): Promise<ProductVariant[]>;
    deleteFeaturedImage(id: string): Promise<IProductVariant>;
}
