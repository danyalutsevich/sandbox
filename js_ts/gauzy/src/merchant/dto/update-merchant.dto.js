"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateMerchantDTO = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const dto_1 = require("./../../warehouse/dto");
const dto_2 = require("./../../contact/dto");
const merchant_dto_1 = require("./merchant.dto");
/**
 * Update merchant request DTO validation
 */
class UpdateMerchantDTO extends (0, mapped_types_1.IntersectionType)(merchant_dto_1.MerchantDTO, dto_2.RelationalContactDTO, dto_1.RelationalWarehouseDTO) {
}
exports.UpdateMerchantDTO = UpdateMerchantDTO;
//# sourceMappingURL=update-merchant.dto.js.map