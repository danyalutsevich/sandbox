import { CrudController } from '../core/crud';
import { ProductVariantSetting } from './product-setting.entity';
import { ProductVariantSettingService } from './product-setting.service';
export declare class ProductVariantSettingController extends CrudController<ProductVariantSetting> {
    private readonly productVariantSettingService;
    constructor(productVariantSettingService: ProductVariantSettingService);
}
