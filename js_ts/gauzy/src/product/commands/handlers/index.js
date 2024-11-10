"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandHandlers = void 0;
const product_create_handler_1 = require("./product.create.handler");
const product_update_handler_1 = require("./product.update.handler");
const product_delete_handler_1 = require("./product.delete.handler");
exports.CommandHandlers = [
    product_create_handler_1.ProductCreateHandler,
    product_update_handler_1.ProductUpdateHandler,
    product_delete_handler_1.ProductDeleteHandler
];
//# sourceMappingURL=index.js.map