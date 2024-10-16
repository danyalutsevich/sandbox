"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductCategoryCreateCommand = void 0;
class ProductCategoryCreateCommand {
    input;
    language;
    static type = '[Product Category] Create';
    constructor(input, language) {
        this.input = input;
        this.language = language;
    }
}
exports.ProductCategoryCreateCommand = ProductCategoryCreateCommand;
//# sourceMappingURL=product-category.create.command.js.map