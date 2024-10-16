"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductTypeCreateCommand = void 0;
class ProductTypeCreateCommand {
    input;
    language;
    static type = '[Product Type] Create';
    constructor(input, language) {
        this.input = input;
        this.language = language;
    }
}
exports.ProductTypeCreateCommand = ProductTypeCreateCommand;
//# sourceMappingURL=product-type.create.command.js.map