import { ICommand } from '@nestjs/cqrs';
export declare class ProductDeleteCommand implements ICommand {
    readonly productId: string;
    static readonly type = "[Product] Delete";
    constructor(productId: string);
}
