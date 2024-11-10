"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandHandlers = void 0;
const product_variant_create_handler_1 = require("./product-variant.create.handler");
const product_variant_delete_handler_1 = require("./product-variant.delete.handler");
exports.CommandHandlers = [
    product_variant_create_handler_1.ProductVariantCreateHandler,
    product_variant_delete_handler_1.ProductVariantDeleteHandler
];
//# sourceMappingURL=index.js.map