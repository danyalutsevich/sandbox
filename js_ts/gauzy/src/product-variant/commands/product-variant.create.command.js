"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductVariantCreateCommand = void 0;
class ProductVariantCreateCommand {
    productInput;
    static type = '[ProductVariant] Register';
    constructor(productInput) {
        this.productInput = productInput;
    }
}
exports.ProductVariantCreateCommand = ProductVariantCreateCommand;
//# sourceMappingURL=product-variant.create.command.js.map