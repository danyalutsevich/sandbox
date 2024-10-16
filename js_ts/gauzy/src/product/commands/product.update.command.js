"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductUpdateCommand = void 0;
class ProductUpdateCommand {
    id;
    productUpdateRequest;
    static type = '[Product] Update';
    constructor(id, productUpdateRequest) {
        this.id = id;
        this.productUpdateRequest = productUpdateRequest;
    }
}
exports.ProductUpdateCommand = ProductUpdateCommand;
//# sourceMappingURL=product.update.command.js.map