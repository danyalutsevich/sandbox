import { IProductOptionTranslatable, IProductOptionTranslation } from '../../plugins/contracts/dist/index';
import { TenantOrganizationBaseEntity } from '../core/entities/internal';
import { ProductOptionGroup } from './product-option-group.entity';
export declare class ProductOption extends TenantOrganizationBaseEntity implements IProductOptionTranslatable {
    name: string;
    code: string;
    /**
     * ProductOptionGroup
     */
    group?: ProductOptionGroup;
    groupId?: string;
    translations: IProductOptionTranslation[];
}
