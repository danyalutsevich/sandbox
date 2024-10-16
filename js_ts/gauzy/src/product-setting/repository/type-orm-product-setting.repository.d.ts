import { Repository } from 'typeorm';
import { ProductVariantSetting } from '../product-setting.entity';
export declare class TypeOrmProductVariantSettingRepository extends Repository<ProductVariantSetting> {
    readonly repository: Repository<ProductVariantSetting>;
    constructor(repository: Repository<ProductVariantSetting>);
}
