import { CommandBus } from '@nestjs/cqrs';
import { DeleteResult } from 'typeorm';
import { CrudController } from './../core/crud';
import { ProductVariant } from './product-variant.entity';
import { ProductVariantService } from './product-variant.service';
import { IPagination, IProductVariant, IVariantCreateInput } from '../../plugins/contracts/dist/index';
export declare class ProductVariantController extends CrudController<ProductVariant> {
    private readonly productVariantService;
    private readonly commandBus;
    constructor(productVariantService: ProductVariantService, commandBus: CommandBus);
    findAllVariantsByProduct(productId: string): Promise<IPagination<IProductVariant>>;
    createProductVariants(entity: IVariantCreateInput): Promise<IProductVariant[]>;
    findAll(): Promise<IPagination<IProductVariant>>;
    findById(id: string): Promise<IProductVariant>;
    update(id: string, productVariant: ProductVariant): Promise<IProductVariant>;
    delete(id: string): Promise<DeleteResult>;
    deleteFeaturedImage(variantId: string): Promise<IProductVariant>;
}
