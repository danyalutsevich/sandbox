"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateMerchantDTO = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const dto_1 = require("./../../warehouse/dto");
const dto_2 = require("./../../contact/dto");
const merchant_dto_1 = require("./merchant.dto");
/**
 * Create merchant request DTO validation
 */
class CreateMerchantDTO extends (0, mapped_types_1.IntersectionType)(merchant_dto_1.MerchantDTO, dto_2.RelationalContactDTO, dto_1.RelationalWarehouseDTO) {
}
exports.CreateMerchantDTO = CreateMerchantDTO;
//# sourceMappingURL=create-merchant.dto.js.map