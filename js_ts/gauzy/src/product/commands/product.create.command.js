"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductCreateCommand = void 0;
class ProductCreateCommand {
    productInput;
    static type = '[Product] Register';
    constructor(productInput) {
        this.productInput = productInput;
    }
}
exports.ProductCreateCommand = ProductCreateCommand;
//# sourceMappingURL=product.create.command.js.map