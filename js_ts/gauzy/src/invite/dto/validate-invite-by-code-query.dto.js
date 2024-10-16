"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateInviteByCodeQueryDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const dto_1 = require("./../../user/dto");
/**
 * Validate invite by code DTO validation
 */
class ValidateInviteByCodeQueryDTO extends (0, swagger_1.IntersectionType)(dto_1.UserEmailDTO, dto_1.UserCodeDTO) {
}
exports.ValidateInviteByCodeQueryDTO = ValidateInviteByCodeQueryDTO;
//# sourceMappingURL=validate-invite-by-code-query.dto.js.map