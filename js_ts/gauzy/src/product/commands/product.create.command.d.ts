import { ICommand } from '@nestjs/cqrs';
import { IProductCreateInput } from '../../../plugins/contracts';
export declare class ProductCreateCommand implements ICommand {
    readonly productInput: IProductCreateInput;
    static readonly type = "[Product] Register";
    constructor(productInput: IProductCreateInput);
}
