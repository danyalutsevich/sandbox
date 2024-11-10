"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductDeleteCommand = void 0;
class ProductDeleteCommand {
    productId;
    static type = '[Product] Delete';
    constructor(productId) {
        this.productId = productId;
    }
}
exports.ProductDeleteCommand = ProductDeleteCommand;
//# sourceMappingURL=product.delete.command.js.map