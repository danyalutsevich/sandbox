import { ICommand } from '@nestjs/cqrs';
export declare class ProductVariantDeleteCommand implements ICommand {
    readonly productVariantId: string;
    static readonly type = "[ProductVariant] Delete";
    constructor(productVariantId: string);
}
