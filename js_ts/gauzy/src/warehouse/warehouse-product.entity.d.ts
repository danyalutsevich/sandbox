import { IProductTranslatable, IWarehouse, IWarehouseProduct, IWarehouseProductVariant } from '../../plugins/contracts/dist/index';
import { TenantOrganizationBaseEntity } from '../core/entities/internal';
export declare class WarehouseProduct extends TenantOrganizationBaseEntity implements IWarehouseProduct {
    quantity: number;
    /**
     * Warehouse
     */
    warehouse: IWarehouse;
    warehouseId: string;
    /**
     * Product
     */
    product: IProductTranslatable;
    productId: string;
    variants: IWarehouseProductVariant[];
}
