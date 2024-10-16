import { IProductOptionGroupTranslation } from '../../plugins/contracts/dist/index';
import { TenantOrganizationBaseEntity } from '../core/entities/internal';
import { ProductOptionGroup } from './product-option-group.entity';
export declare class ProductOptionGroupTranslation extends TenantOrganizationBaseEntity implements IProductOptionGroupTranslation {
    name: string;
    languageCode: string;
    /**
     * ProductOptionGroup
     */
    reference: ProductOptionGroup;
    referenceId: string;
}
