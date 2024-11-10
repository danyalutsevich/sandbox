import { IPagination, IWarehouseProduct, IWarehouseProductCreateInput, IWarehouseProductVariant } from '../../plugins/contracts/dist/index';
import { TenantAwareCrudService } from './../core/crud';
import { WarehouseProduct } from './../core/entities/internal';
import { TypeOrmWarehouseProductVariantRepository } from './repository/type-orm-warehouse-product-variant.repository';
import { MikroOrmWarehouseProductRepository } from './repository/mikro-orm-warehouse-product.repository ';
import { TypeOrmWarehouseRepository } from './repository/type-orm-warehouse.repository';
import { MikroOrmWarehouseRepository } from './repository/mikro-orm-warehouse.repository';
import { MikroOrmWarehouseProductVariantRepository } from './repository/mikro-orm-warehouse-product-variant.repository';
import { TypeOrmWarehouseProductRepository } from './repository/type-orm-warehouse-product.repository ';
import { TypeOrmProductRepository } from './../product/repository/type-orm-product.repository';
import { MikroOrmProductRepository } from './../product/repository/mikro-orm-product.repository';
export declare class WarehouseProductService extends TenantAwareCrudService<WarehouseProduct> {
    private typeOrmWarehouseRepository;
    private typeOrmWarehouseProductVariantRepository;
    private typeOrmProductRepository;
    constructor(typeOrmWarehouseProductRepository: TypeOrmWarehouseProductRepository, mikroOrmWarehouseProductRepository: MikroOrmWarehouseProductRepository, typeOrmWarehouseRepository: TypeOrmWarehouseRepository, mikroOrmWarehouseRepository: MikroOrmWarehouseRepository, typeOrmWarehouseProductVariantRepository: TypeOrmWarehouseProductVariantRepository, mikroOrmWarehouseProductVariantRepository: MikroOrmWarehouseProductVariantRepository, typeOrmProductRepository: TypeOrmProductRepository, mikroOrmProductRepository: MikroOrmProductRepository);
    /**
     *
     * @param warehouseId
     * @returns
     */
    getAllWarehouseProducts(warehouseId: string): Promise<IWarehouseProduct[]>;
    createWarehouseProductBulk(warehouseProductCreateInput: IWarehouseProductCreateInput[], warehouseId: string): Promise<IPagination<IWarehouseProduct[]>>;
    updateWarehouseProductQuantity(warehouseProductId: String, quantity: number): Promise<IWarehouseProduct>;
    updateWarehouseProductVariantQuantity(warehouseProductVariantId: string, quantity: number): Promise<IWarehouseProductVariant>;
}
