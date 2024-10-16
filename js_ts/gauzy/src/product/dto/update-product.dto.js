"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateProductDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_product_dto_1 = require("./create-product.dto");
class UpdateProductDTO extends (0, swagger_1.IntersectionType)(create_product_dto_1.CreateProductDTO, (0, swagger_1.PartialType)((0, swagger_1.PickType)(create_product_dto_1.CreateProductDTO, ['type', 'category']))) {
}
exports.UpdateProductDTO = UpdateProductDTO;
//# sourceMappingURL=update-product.dto.js.map