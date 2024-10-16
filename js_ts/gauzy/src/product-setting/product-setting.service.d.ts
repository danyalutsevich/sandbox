import { TenantAwareCrudService } from '../core/crud';
import { ProductVariantSetting } from './product-setting.entity';
import { TypeOrmProductVariantSettingRepository } from './repository/type-orm-product-setting.repository';
import { MikroOrmProductVariantSettingRepository } from './repository/mikro-orm-product-setting.repository';
export declare class ProductVariantSettingService extends TenantAwareCrudService<ProductVariantSetting> {
    constructor(typeOrmProductVariantSettingRepository: TypeOrmProductVariantSettingRepository, mikroOrmProductVariantSettingRepository: MikroOrmProductVariantSettingRepository);
    /**
     *
     * @returns
     */
    createDefaultVariantSettings(): Promise<ProductVariantSetting>;
    /**
     *
     * @param productVariantPrices
     * @returns
     */
    deleteMany(productVariantPrices: ProductVariantSetting[]): Promise<ProductVariantSetting[]>;
}
