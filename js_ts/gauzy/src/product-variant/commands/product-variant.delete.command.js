"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductVariantDeleteCommand = void 0;
class ProductVariantDeleteCommand {
    productVariantId;
    static type = '[ProductVariant] Delete';
    constructor(productVariantId) {
        this.productVariantId = productVariantId;
    }
}
exports.ProductVariantDeleteCommand = ProductVariantDeleteCommand;
//# sourceMappingURL=product-variant.delete.command.js.map