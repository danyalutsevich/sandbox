import { CrudController } from './../core/crud';
import { ProductOption } from './product-option.entity';
import { ProductOptionService } from './product-option.service';
export declare class ProductOptionController extends CrudController<ProductOption> {
    private readonly productOptionService;
    constructor(productOptionService: ProductOptionService);
}
