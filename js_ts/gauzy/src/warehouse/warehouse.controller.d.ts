import { FindOptionsWhere, UpdateResult } from 'typeorm';
import { IPagination, IWarehouseProduct, IWarehouseProductCreateInput, IWarehouseProductVariant, IWarehouse } from '../../plugins/contracts';
import { WarehouseService } from './warehouse.service';
import { Warehouse } from './warehouse.entity';
import { WarehouseProductService } from './warehouse-product-service';
import { RelationsQueryDTO } from './../shared/dto';
import { CrudController, PaginationParams } from './../core/crud';
import { CreateWarehouseDTO, UpdateWarehouseDTO } from './dto';
export declare class WarehouseController extends CrudController<Warehouse> {
    private readonly warehouseService;
    private readonly warehouseProductsService;
    constructor(warehouseService: WarehouseService, warehouseProductsService: WarehouseProductService);
    /**
     * GET all warehouse products
     *
     * @param warehouseId
     * @returns
     */
    findAllWarehouseProducts(warehouseId: IWarehouse['id']): Promise<IWarehouseProduct[]>;
    /**
     * CREATE warehouse products
     *
     * @param entity
     * @param warehouseId
     * @returns
     */
    addWarehouseProducts(entity: IWarehouseProductCreateInput[], warehouseId: IWarehouse['id']): Promise<IPagination<IWarehouseProduct[]>>;
    /**
     * UPDATE warehouse product quantity
     *
     * @param warehouseProductId
     * @param value
     * @returns
     */
    updateWarehouseProductQuantity(warehouseProductId: IWarehouseProduct['id'], value: {
        count: number;
    }): Promise<IWarehouseProduct>;
    /**
     * UPDATE warehouse product variant quantity
     *
     * @param warehouseProductVariantId
     * @param value
     * @returns
     */
    updateWarehouseProductVariantQuantity(warehouseProductVariantId: IWarehouseProductVariant['id'], value: {
        count: number;
    }): Promise<IWarehouseProductVariant>;
    /**
     * GET warehouse count
     *
     * @param options
     * @returns
     */
    getCount(options: FindOptionsWhere<Warehouse>): Promise<number>;
    /**
     * GET warehouses by pagination
     *
     * @param params
     * @returns
     */
    pagination(params: PaginationParams<Warehouse>): Promise<IPagination<IWarehouse>>;
    /**
     * GET warehouses
     *
     * @param params
     * @returns
     */
    findAll(params: PaginationParams<Warehouse>): Promise<IPagination<IWarehouse>>;
    /**
     * GET warehouse with relations by id
     *
     * @param id
     * @returns
     */
    findById(id: IWarehouse['id'], query: RelationsQueryDTO): Promise<IWarehouse>;
    /**
     * CREATE new warehouse store
     *
     * @param entity
     * @returns
     */
    create(entity: CreateWarehouseDTO): Promise<IWarehouse>;
    /**
     * UPDATE warehouse by id
     *
     * @param id
     * @param entity
     * @returns
     */
    update(id: IWarehouse['id'], entity: UpdateWarehouseDTO): Promise<IWarehouse | UpdateResult>;
}
