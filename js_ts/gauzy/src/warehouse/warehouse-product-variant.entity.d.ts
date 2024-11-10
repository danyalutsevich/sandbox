import { IProductVariant, IWarehouseProduct, IWarehouseProductVariant } from '../../plugins/contracts/dist/index';
import { TenantOrganizationBaseEntity } from '../core/entities/internal';
export declare class WarehouseProductVariant extends TenantOrganizationBaseEntity implements IWarehouseProductVariant {
    quantity: number;
    /**
     * ProductVariant
     */
    variant: IProductVariant;
    variantId: string;
    /**
     * WarehouseProduct
     */
    warehouseProduct: IWarehouseProduct;
    warehouseProductId: string;
}
