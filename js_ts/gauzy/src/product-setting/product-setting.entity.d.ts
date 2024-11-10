import { IProductVariantSetting } from '../../plugins/contracts/dist/index';
import { ProductVariant, TenantOrganizationBaseEntity } from '../core/entities/internal';
export declare class ProductVariantSetting extends TenantOrganizationBaseEntity implements IProductVariantSetting {
    isSubscription: boolean;
    isPurchaseAutomatically: boolean;
    canBeSold: boolean;
    canBePurchased: boolean;
    canBeCharged: boolean;
    canBeRented: boolean;
    isEquipment: boolean;
    trackInventory: boolean;
    /**
     * ProductVariant
     */
    productVariant: ProductVariant;
}
