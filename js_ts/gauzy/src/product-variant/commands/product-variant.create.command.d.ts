import { ICommand } from '@nestjs/cqrs';
import { IVariantCreateInput } from '../../../plugins/contracts';
export declare class ProductVariantCreateCommand implements ICommand {
    readonly productInput: IVariantCreateInput;
    static readonly type = "[ProductVariant] Register";
    constructor(productInput: IVariantCreateInput);
}
